const path = require('path');

const pathToRootFolder = require('app-root-path').path;
const pathToParentFolder = path.parse(process.mainModule.filename).dir;

const env = process.env.HTML_LINTER_ENV;

if (env && env === 'test') {
  const pathToTestDummyApp = `${pathToRootFolder}/tests/dummy-app`;
  module.exports = {
    parent: pathToTestDummyApp,
    root: pathToTestDummyApp
  };
} else {
  module.exports = {
    parent: pathToParentFolder,
    root: pathToRootFolder
  };
}
