/*
  - overwrites some/all of the default tooltip messages with custom ones (if custom ones present)
  - returns updated tooltip messages
*/

const defaultTooltips = require('../defaults/tooltips.json');
const getLayoutrc = require('./getLayoutrc');

module.exports = function(pathToLayoutrc) {
  let layoutrc = getLayoutrc(pathToLayoutrc);
  return Object.assign(defaultTooltips, layoutrc.tooltips);
};
