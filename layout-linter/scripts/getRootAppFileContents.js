const path = require('path');
const fse = require('fs-extra');

module.exports = function(possiblePathToFile) {
  if (!path.isAbsolute(possiblePathToFile)) {
    const rootAppDir = path.parse(process.mainModule.filename).dir;
    possiblePathToFile = path.join(rootAppDir, possiblePathToFile);
  }
  if (fse.pathExistsSync(possiblePathToFile)) {
    return fse.readFileSync(possiblePathToFile).toString('utf-8');
  }
  return false;
};
