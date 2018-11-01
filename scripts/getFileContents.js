const path = require('path');
const fse = require('fs-extra');
const pathToParentFolder = require('./dir').parent;

module.exports = function(pathToFile) {
  // if the file is not found
  if (!fse.existsSync(pathToFile)) {
    // maybe the path is relative, so try it as an absolute one instead
    pathToFile = path.join(pathToParentFolder, pathToFile);
  }
  // if the file is still not found
  if (!fse.existsSync(pathToFile)) {
    throw new Error(`html-linter | getFileContents | could not locate file: ${pathToFile}`);
  } else { // else return its contents
    return fse.readFileSync(pathToFile).toString('utf-8');
  }
};
