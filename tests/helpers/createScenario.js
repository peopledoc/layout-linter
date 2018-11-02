const fse = require('fs-extra');
const path = require('path');
const pathToParentFolder = require('../../scripts/dir').parent;

module.exports = function(options) {
  fse.ensureDirSync(pathToParentFolder);
  fse.emptyDirSync(pathToParentFolder);

  if (options.relativePathToRulesFile && options.rules) {
    // create .layoutrc
    let pathToRulesFile = path.join(pathToParentFolder, options.relativePathToRulesFile);
    let pathToRulesFileFolder = pathToRulesFile.split('/');
    pathToRulesFileFolder.pop();
    pathToRulesFileFolder = pathToRulesFileFolder.join('/');
    fse.ensureDirSync(pathToRulesFileFolder);
    fse.writeFileSync(pathToRulesFile, `{ "rules": ${JSON.stringify(options.rules)} }`);

    // create .css
    if (options.relativePathToCss && options.cssContent) {
      let pathToCssFile = path.join(pathToParentFolder, options.relativePathToCss);
      let pathToCssFileFolder = pathToCssFile.split('/');
      pathToCssFileFolder.pop();
      pathToCssFileFolder = pathToCssFileFolder.join('/');
      fse.ensureDirSync(pathToCssFileFolder);
      fse.writeFileSync(pathToCssFile, options.cssContent);
    }

    // create .html
    if (options.relativePathToHtmlFile && options.htmlContent) {
      let pathToHtmlFile = path.join(pathToParentFolder, options.relativePathToHtmlFile);
      let pathToHtmlFileFolder = pathToHtmlFile.split('/');
      pathToHtmlFileFolder.pop();
      pathToHtmlFileFolder = pathToHtmlFileFolder.join('/');
      fse.ensureDirSync(pathToHtmlFileFolder);
      fse.writeFileSync(pathToHtmlFile, options.htmlContent);
    }
  } else {
    throw new Error('layout-linter | createScenario helper : `options.relativePathToRulesFile` or `options.rules` not found');
  }
};
