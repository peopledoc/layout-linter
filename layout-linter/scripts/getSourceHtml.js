/*
  - parameter passed must be an absolute (or relative) path to an .html file or the HTML string itself
  - function returns an HTML string
  - HTML string returned can be an HTML snippet (e.g. "<div>...</div>")
    or a complete HTML document string ("<html>....</html>")
*/

const getRootAppFileContents = require('./getRootAppFileContents');

module.exports = function(htmlStringOrPathToHtmlFile) {
  let htmlString = getRootAppFileContents(htmlStringOrPathToHtmlFile);
  return htmlString || htmlStringOrPathToHtmlFile;
};
