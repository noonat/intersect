const { execFile } = require("child_process");
const { readFile, unlink, writeFile } = require("fs").promises;
const { promisify } = require("util");
const esbuild = require("esbuild");
const md = require("markdown-it")();
const prettier = require("prettier");

const isProduction = process.env.NODE_ENV === "production";

const execFileAsync = promisify(execFile);

// Each of these tools reports its own errors on stdout or stderr, and none of
// that is much use if it is thrown away, so print it before giving up.
async function run(command, args = []) {
  try {
    return await execFileAsync(command, args);
  } catch (err) {
    console.log(`ERROR: ${command} failed`);
    console.log(`${command} stdout:`, err.stdout);
    console.log(`${command} stderr:`, err.stderr);
    throw err;
  }
}

// The literate source is the real source. Pull the code blocks back out of it
// to get something the compiler can read.
async function compileSource() {
  const data = await readFile("src/intersect.ts.md");

  const blocks = ['"use strict";\n\n'];
  md.renderer.rules = {
    code_block(tokens, index) {
      // We can't express empty lines for readability in Markdown, since most
      // of the code is in separate code blocks. Try to make the result more
      // readable by adding a blank line after blocks ending in a closing brace.
      if (blocks.length > 0 && blocks[blocks.length - 1].match(/}\s+$/)) {
        blocks.push("\n");
      }
      blocks.push(tokens[index].content);
    }
  };
  md.render(data.toString("UTF-8"));

  const source = await prettier.format(blocks.join(""), {
    parser: "typescript"
  });
  await writeFile("src/intersect.ts", source);
}

// The figures have to live in the page itself rather than in <img> tags.
// An <img>-embedded SVG is an isolated document: it cannot see the
// stylesheet's custom properties, so it could neither pick up the
// diagram palette nor follow the theme toggle.
//
// Each file is reduced to geometry here. Its own <defs> and <style> are
// dropped, along with the opaque background it used to carry, and its
// class names are mapped onto the semantic ones in template/docco.css.
// Markers and the hatch pattern are defined once in the template, which
// also stops nine copies of the same ids colliding in one document.
const FIGURE_CLASSES = {
  "static-text": "d-text",
  "static-edge": "d-edge",
  static: "d-world",
  segment: "d-query",
  hit: "d-correct",
  good: "d-clear",
  bad: "d-collide",
  quiet: "d-quiet"
};

async function inlineFigure(name) {
  const source = await readFile(`docs/svg/${name}.svg`, { encoding: "utf-8" });

  const size = source.match(/<svg[^>]*\swidth="(\d+)"[^>]*\sheight="(\d+)"/);
  if (!size) {
    throw new Error(`docs/svg/${name}.svg: no width/height on the root element`);
  }

  const body = source
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<defs>[\s\S]*?<\/defs>/g, "")
    .replace(/<rect[^>]*id="background"[^>]*\/>/g, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    // The palette lives in the stylesheet now, so any color baked into
    // an attribute would silently override it.
    .replace(/\s(?:fill|stroke)="#[0-9a-fA-F]{3,6}"/g, "")
    .replace(/class="([^"]+)"/g, (_, names) =>
      `class="${names
        .split(/\s+/)
        .map(n => FIGURE_CLASSES[n] || n)
        .join(" ")}"`
    )
    .trim();

  return (
    `<svg class="figure" viewBox="0 0 ${size[1]} ${size[2]}" ` +
    `role="img" aria-label="Diagram: ${name.replace(/-/g, " ")}">` +
    `${body}</svg>`
  );
}

async function inlineFigures(html) {
  const names = new Set();
  for (const match of html.matchAll(/src="\.\/docs\/svg\/([\w-]+)\.svg"/g)) {
    names.add(match[1]);
  }

  const figures = new Map();
  await Promise.all(
    [...names].map(async name => figures.set(name, await inlineFigure(name)))
  );

  let count = 0;
  const out = html.replace(
    /<img[^>]*src="\.\/docs\/svg\/([\w-]+)\.svg"[^>]*\/?>/g,
    (_, name) => {
      count += 1;
      return figures.get(name);
    }
  );

  if (count !== names.size) {
    throw new Error(`inlined ${count} figures for ${names.size} files`);
  }
  console.log(`inlined ${count} figures`);
  return out;
}

async function compileHTML() {
  await run("docco", [
    "--css",
    "template/docco.css",
    "--template",
    "template/docco.jst",
    "src/intersect.ts.md"
  ]);
  const data = await readFile("docs/src/intersect.ts.html", {
    encoding: "utf-8"
  });
  const html = await prettier.format(await inlineFigures(data), {
    parser: "html"
  });
  await writeFile("index.html", html, { encoding: "utf-8" });
  await unlink("docs/src/intersect.ts.html");
}

async function compileLibrary() {
  await run("tsc");
}

async function compileExamples() {
  // esbuild only strips the types off, so the examples are type checked
  // separately. Without this they aren't checked by anything at all.
  await run("tsc", ["--project", "tsconfig.examples.json"]);

  // Importing the stylesheet writes docs/bundle.css, which the docs template
  // links. Fonts larger than the inline limit are written next to it.
  await esbuild.build({
    assetNames: "[hash]",
    bundle: true,
    entryPoints: ["src/examples.ts"],
    loader: {
      ".eot": "file",
      ".svg": "file",
      ".ttf": "file",
      ".woff": "file",
      ".woff2": "file"
    },
    minify: isProduction,
    outfile: "docs/bundle.js",
    sourcemap: !isProduction,
    target: "es2015"
  });
}

async function main() {
  // Everything below reads src/intersect.ts, so it has to exist first.
  await compileSource();
  await Promise.all([compileHTML(), compileLibrary(), compileExamples()]);
}

main().catch(err => {
  console.log(err.message);
  process.exitCode = 1;
});
