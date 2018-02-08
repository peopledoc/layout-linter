const fse = require('fs-extra');
const lintLayout = require('../layout-linter');

let source = './source.html'; // also valid: source = fse.readFileSync('./source.html').toString('utf-8');

let lintedHTML = lintLayout(source);

fse.writeFileSync('./index.html', lintedHTML);

