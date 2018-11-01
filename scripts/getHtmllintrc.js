/*
  - optional parameter passed is the absolute (or relative) path to a file containing the rules (json)
  - if omitted, it will look for .htmllintrc file (json) inside the app directory and all of its subdirectories
  - converts the json structure found inside the file into a js object and returns it
*/
const rootFolder = require('./dir').root;
const findPathTo = require('./findPathTo');
const getFileContents = require('./getFileContents');

module.exports = function(pathToHtmllintrc) {
  // if no explicit path to .htmllintrc is passed by the user
  if (!pathToHtmllintrc) {
    // look for .htmllintrc across all folders, recursively, ignoring /node_modules directories
    pathToHtmllintrc = findPathTo('.htmllintrc', {
      inside: rootFolder,
      ignore: ['*'] // only look into root folder ignoring all subfolders
    })[0]; // only use first occurence of .htmllintrc

    if (!pathToHtmllintrc) {
      throw new Error('html-linter | getHtmllintrc | could not locate .htmllintrc file');
    }
  }

  // return file contents
  return JSON.parse(getFileContents(pathToHtmllintrc));
};
