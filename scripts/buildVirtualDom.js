const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function(html) {
  return require('jquery')(new JSDOM(html).window);
};
