const getCss = require('./scripts/getCss.js');
const getBrowserJs = require('./scripts/getBrowserJs.js');
const buildLintedHtml = require('./scripts/buildLintedHtml.js');
const buildDocumentHtml = require('./scripts/buildDocumentHtml.js');

module.exports = function(options) {
  const lintedHtml = buildLintedHtml(options);
  const linterCss = getCss(options.cssFile);
  const linterJs = getBrowserJs();
  return buildDocumentHtml(lintedHtml, linterCss, linterJs);
};
