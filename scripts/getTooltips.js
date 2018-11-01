/*
  - overwrites some/all of the default tooltip messages with custom ones (if custom ones present)
  - returns updated tooltip messages
*/

const defaultTooltips = require('../defaults/tooltips.json');
const getHtmllintrc = require('./getHtmllintrc');

module.exports = function(pathToHtmllintrc) {
  let htmllintrc = getHtmllintrc(pathToHtmllintrc);
  return Object.assign(defaultTooltips, htmllintrc.tooltips);
};
