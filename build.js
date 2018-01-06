const {execFile} = require('child_process');
const {readFile, rename, writeFile} = require('fs');
const md = require('markdown-it')();

execFile('docco', [
  '--css', 'template/docco.css',
  '--template', 'template/docco.jst',
  'src/intersect.ts.md',
], (err, stdout, stderr) => {
  if (err) {
    console.log('ERROR: docco failed');
    console.log('docco stdout:', stdout);
    console.log('docco stderr:', stderr);
    throw err;
  }
  rename('docs/src/intersect.ts.html', 'index.html', (err) => {
    if (err) {
      throw err;
    }
  })
});

readFile('src/intersect.ts.md', (err, data) => {
  if (err) {
    throw err;
  }

  let blocks = ['"use strict";\n\n'];
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
  writeFile('src/intersect.ts', blocks.join(''), (err) => {
    if (err) {
      throw err;
    }

    execFile('tsc', (err, stdout, stderr) => {
      if (err) {
        console.log('ERROR: tsc failed');
        console.log('tsc stdout:', stdout);
        console.log('tsc stderr:', stderr);
        throw err;
      }
    });

    execFile('webpack', (err, stdout, stderr) => {
      if (err) {
        console.log('ERROR: webpack failed');
        console.log('webpack stdout', stdout);
        console.log('webpack stderr', stderr);
        throw err;
      }
    });
  });
});
