const getCss = require('./scripts/getCss.js');
const getBrowserJs = require('./scripts/getBrowserJs.js');
const buildLintedDocument = require('./scripts/buildLintedDocument.js');
const lintedHtmlWithCssJs = require('./scripts/lintedHtmlWithCssJs.js');

module.exports = function(options) {
  const lintedDocument = buildLintedDocument(options);
  const linterCss = getCss(options.css);
  const linterJs = getBrowserJs();
  return lintedHtmlWithCssJs(lintedDocument, linterCss, linterJs, options.snippet);
};
