const fse = require('fs-extra');
const lintHtml = require('./../index');
const pathToIndex = './index.html';

if (fse.existsSync(pathToIndex)) {
  fse.unlinkSync(pathToIndex);
}

let result = lintHtml({
  source: './source.html',
  htmllintrc: './demo/.htmllintrc'
});

/* eslint-disable no-console */
console.log('\n\n\n');
console.log('========= html-linter | DEMO (start) =========');
console.log('\n\n');
console.log('html-linter | errors found = ', result.errors);
console.log('\n\n');
console.log('html-linter | log (see below)');
console.log('\n\n');
console.log(result.log);
console.log('\n\n');
console.log('=========  html-linter | DEMO (end)  =========');
console.log('\n\n\n');

fse.writeFileSync(pathToIndex, result.html);
