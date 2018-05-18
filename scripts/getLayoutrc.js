/*
  - optional parameter passed is the absolute (or relative) path to a file containing the rules (json)
  - if omitted, it will look for .layoutrc file (json) inside the app directory and alf its subdirectories
  - converts the json structure found inside the file into a js object and returns it
*/

const glob = require('glob');
const path = require('path');
const getRootAppFileContents = require('./getRootAppFileContents');

const rootAppDir = path.parse(process.mainModule.filename).dir;
const globFindPattern = `${rootAppDir}/**/.layoutrc`;
const globIgnorePattern = '/**/node_modules/**/.layoutrc';

module.exports = function(pathToLayoutrc) {
  if (!pathToLayoutrc) {
    pathToLayoutrc = glob.sync(globFindPattern, { ignore: globIgnorePattern })[0];
    if (!pathToLayoutrc) {
      throw new Error('layout-linter: .layoutrc file not found');
    }
  }
  let layoutrc = getRootAppFileContents(pathToLayoutrc);
  return JSON.parse(layoutrc);
};
