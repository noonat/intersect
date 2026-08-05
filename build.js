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

  const source = prettier.format(blocks.join(""), { parser: "typescript" });
  await writeFile("src/intersect.ts", source);
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
  const html = prettier.format(data, { parser: "html" });
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
