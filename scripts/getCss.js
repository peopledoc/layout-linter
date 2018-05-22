const pathToDefaultCssFile = '../defaults/style.css';
const getFileContents = require('./getFileContents');
const fse = require('fs-extra');

module.exports = function(cssOption) {
  if (cssOption === false) { // if cssOption is set to false by the user
    return ''; // then no CSS will be used
  } else if (!cssOption) { // if no cssOption is set by the user
    // then the default CSS file will be used
    return fse.readFileSync(`${__dirname}/${pathToDefaultCssFile}`).toString('utf-8');
  }
  // else cssOption is a path to a custom CSS file, so use that one instead
  return getFileContents(cssOption);
};