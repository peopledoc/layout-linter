const debug = require('./scripts/debug');

const path = require('path');
const getRules = require('./scripts/getRules.js');
const getTooltips = require('./scripts/getTooltips.js');
const getCss = require('./scripts/getCss.js');
const getBrowserJs = require('./scripts/getBrowserJs.js');
const buildLintedDocument = require('./scripts/buildLintedDocument.js');
const lintedHtmlWithCssJs = require('./scripts/lintedHtmlWithCssJs.js');

module.exports = function(options) {
  const rules = getRules(options.layoutrc);
  const tooltips = getTooltips(options.layoutrc);

  const pathToHtmlOrHtmlString = options.source;
  const lintedDocument = buildLintedDocument(pathToHtmlOrHtmlString, rules, tooltips);

  const linterCss = getCss(options.css);
  const linterJs = getBrowserJs();
  return lintedHtmlWithCssJs(lintedDocument, linterCss, linterJs, options.snippet);
};
