const fse = require('fs-extra');
const path = require('path');
const pathToParentFolder = require('../../scripts/dir').parent;

module.exports = function(options) {
  fse.ensureDirSync(pathToParentFolder);
  fse.emptyDirSync(pathToParentFolder);

  if (options.rules) {
    if (!options.pathToLayoutrc) {
      throw new Error('layout-linter | createScenario helper : `options.pathToLayoutrc` not passed');
    }

    let layoutrcFilename = options.customLayoutrcName || '.layoutrc';
    let pathToLayoutrc = pathToParentFolder;

    if (options.pathToLayoutrc !== '/') {
      pathToLayoutrc += options.pathToLayoutrc;
    }

    fse.ensureDirSync(pathToLayoutrc);
    fse.writeFileSync(`${pathToLayoutrc}/${layoutrcFilename}`, `{ "rules": ${JSON.stringify(options.rules)} }`);
  }
};
