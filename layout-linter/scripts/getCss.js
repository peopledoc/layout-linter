const defaultCSS = '../defaults/style.css';
const fse = require('fs-extra');

module.exports = function(cssFile) {
  cssFile = cssFile || `${__dirname}/${defaultCSS}`;
  return fse.readFileSync(cssFile).toString('utf-8');
  $('head').append(`<style>${css}</style>`);
};