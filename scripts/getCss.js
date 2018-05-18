const defaultCSS = '../defaults/style.css';
const getRootAppFileContents = require('./getRootAppFileContents');
const fse = require('fs-extra');

module.exports = function(css) {
  if (css === false) {
    return '';
  } else if (!css) {
    return fse.readFileSync(`${__dirname}/${defaultCSS}`).toString('utf-8');
  }
  return getRootAppFileContents(css);
};