const path = require('path');

const pathToRootFolder = require('app-root-path').path;
const pathToParentFolder = path.parse(process.mainModule.filename).dir;

const env = process.env.LAYOUT_LINTER_ENV;

if (env && env === 'test') {
  const pathToTestDummyApp = `${pathToRootFolder}/tests/dummy-app`;

  module.exports = {
    parent: pathToTestDummyApp,
    root: pathToTestDummyApp
  };
} else {
  // check if layout-linter is being called from within an installed npm module (inside a /node_modules)
  let regex = new RegExp(/(?:.*\/)?node_modules\/(?!node_modules(?![^\/\n]))[^/\n]*(?=$|\/)/);
  let nodeModulesDirMatch = pathToParentFolder.match(regex);
  let pathToNodeModule = nodeModulesDirMatch && nodeModulesDirMatch[0] || null;

  module.exports = {
    parent: pathToParentFolder,
    root: pathToNodeModule !== null ? pathToNodeModule : pathToRootFolder
  };
}
