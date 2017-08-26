const {execFile} = require('child_process');
const {readFile, rename, writeFile} = require('fs');
const md = require('markdown-it')();

execFile('docco', [
  '--css', 'template/docco.css',
  '--template', 'template/docco.jst',
  'intersect.js.md',
], (err, stdout, stderr) => {
  if (err) {
    throw err;
  }
  rename('docs/intersect.js.html', 'index.html', (err) => {
    if (err) {
      throw err;
    }
  })
});

readFile('intersect.js.md', (err, data) => {
  if (err) {
    throw err;
  }

  let blocks = ["'use strict';\n\n"];
  md.renderer.rules = {
    code_block(tokens, index) {
      // We can't express empty lines for readability in Markdown, since most
      // of the code is in separate code blocks. Try to make the result more
      // readable by adding a blank line after blocks ending in a closing brace.
      if (blocks.length > 0 && blocks[blocks.length - 1].match(/}\s+$/)) {
        blocks.push('\n');
      }
      blocks.push(tokens[index].content);
    }
  };
  md.render(data.toString('UTF-8'));
  writeFile('intersect.js', blocks.join(''), (err) => {
    if (err) {
      throw err;
    }

    execFile('babel', [
      '--out-dir', 'lib',
      '--source-maps', 'true',
      'intersect.js',
    ], (err) => {
      if (err) {
        throw err;
      }
    });

    execFile('webpack', (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
