/*
  "source" can either be an .html file or the HTML string itself
*/

const fse = require('fs-extra');

module.exports = function(htmlStringOrPathToHtmlFile) {
  let isPathToFile = fse.existsSync(htmlStringOrPathToHtmlFile);
  if (isPathToFile) {
    return fse.readFileSync(htmlStringOrPathToHtmlFile).toString('utf-8');
  }
  return htmlStringOrPathToHtmlFile;
};
