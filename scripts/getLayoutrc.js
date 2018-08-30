/*
  - optional parameter passed is the absolute (or relative) path to a file containing the rules (json)
  - if omitted, it will look for .layoutrc file (json) inside the app directory and all of its subdirectories
  - converts the json structure found inside the file into a js object and returns it
*/
const rootFolder = require('./dir').root;
const findPathTo = require('./findPathTo');
const getFileContents = require('./getFileContents');

module.exports = function(pathToLayoutrc) {
  // if no explicit path to .layoutrc is passed by the user
  if (!pathToLayoutrc) {
    // look for .layoutrc across all folders, recursively, ignoring /node_modules directories
    pathToLayoutrc = findPathTo('.layoutrc', {
      inside: rootFolder,
      ignore: ['*'] // only look into root folder ignoring all subfolders
    })[0]; // only use first occurence of .layoutrc

    if (!pathToLayoutrc) {
      throw new Error('layout-linter | getLayoutrc | could not locate .layoutrc file');
    }
  }

  // return file contents
  return JSON.parse(getFileContents(pathToLayoutrc));
};
