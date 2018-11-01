/*
  returns the "rules" key (array) found in the object returned by getHtmllintrc()
*/
const getHtmllintrc = require('./getHtmllintrc');

module.exports = function(pathToHtmllintrc) {
  let htmllintrc = getHtmllintrc(pathToHtmllintrc);
  if (!htmllintrc.rules) {
    throw new Error('html-linter: "rules" property not found in JSON');
  }
  return htmllintrc.rules;
};
