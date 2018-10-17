const path = require('path');
const fse = require('fs-extra');
const lintLayout = require('./../index');
const pathToIndex = './index.html';

if (fse.existsSync(pathToIndex)) {
  fse.unlinkSync(pathToIndex);
}

let result = lintLayout({
  source: './source.html',
  layoutrc: './demo/.layoutrc'
});

console.log('\n\n\n');
console.log('========= LAYOUT-LINTER | DEMO (start) =========');
console.log('\n\n');
console.log('LAYOUT-LINTER | errors found = ', result.errors);
console.log('\n\n');
console.log('LAYOUT-LINTER | log (see below)');
console.log('\n\n');
console.log(result.log);
console.log('\n\n');
console.log('=========  LAYOUT-LINTER | DEMO (end)  =========');
console.log('\n\n\n');

fse.writeFileSync(pathToIndex, result.html);
