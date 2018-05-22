/*
  - parameter passed must be an absolute (or relative) path to an .html file or the HTML string itself
  - function returns an HTML string
  - HTML string returned can be an HTML snippet (e.g. "<div>...</div>")
    or a complete HTML document string ("<html>....</html>")
*/

const path = require('path');
const fse = require('fs-extra');
const pathToParentFolder = require('./dir').parent;

module.exports = function(htmlStringOrPathToHtmlFile) {
  let possiblePathToHtmlFile = htmlStringOrPathToHtmlFile;

  // if string-parameter is not an absolute path to an existing file
  if (!fse.existsSync(possiblePathToHtmlFile)) {
    // check if string-parameter is a relative path to an existing file
    possiblePathToHtmlFile = path.join(pathToParentFolder, possiblePathToHtmlFile);
  }

  // if string-parameter is a path to an existing file, return its contents
  if (fse.existsSync(possiblePathToHtmlFile)) {
    return fse.readFileSync(possiblePathToHtmlFile).toString('utf-8');
  }

  // otherwise this is an HTML string so return that instead
  return htmlStringOrPathToHtmlFile;
};
