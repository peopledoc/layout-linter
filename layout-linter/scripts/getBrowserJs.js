const fse = require('fs-extra');
const activateTooltips = 'activateTooltips.js'

module.exports = function() {
  return fse.readFileSync(`${__dirname}/${activateTooltips}`).toString('utf-8');
}