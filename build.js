const { execFile } = require("child_process");
const { readFile, rename, unlink, writeFile } = require("fs").promises;
const md = require("markdown-it")();
const prettier = require("prettier");

async function compileHTML() {
  execFile(
    "docco",
    [
      "--css",
      "template/docco.css",
      "--template",
      "template/docco.jst",
      "src/intersect.ts.md"
    ],
    async (err, stdout, stderr) => {
      if (err) {
        console.log("ERROR: docco failed");
        console.log("docco stdout:", stdout);
        console.log("docco stderr:", stderr);
        throw err;
      }
      const data = await readFile("docs/src/intersect.ts.html", {
        encoding: "utf-8"
      });
      const html = prettier.format(data, { parser: "html" });
      await writeFile("index.html", html, { encoding: "utf-8" });
      await unlink("docs/src/intersect.ts.html");
    }
  );
}

async function compileScript() {
  const data = await readFile("src/intersect.ts.md");

  let blocks = ['"use strict";\n\n'];
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

  execFile("tsc", (err, stdout, stderr) => {
    if (err) {
      console.log("ERROR: tsc failed");
      console.log("tsc stdout:", stdout);
      console.log("tsc stderr:", stderr);
      throw err;
    }
  });

  execFile("webpack", (err, stdout, stderr) => {
    if (err) {
      console.log("ERROR: webpack failed");
      console.log("webpack stdout", stdout);
      console.log("webpack stderr", stderr);
      throw err;
    }
  });
}

Promise.all([compileHTML(), compileScript()]).catch(err => {
  throw err;
});
