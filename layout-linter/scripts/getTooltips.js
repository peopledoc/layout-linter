/*
  use custom tooltip messages or default ones
*/

const defaultTooltips = require('../defaults/tooltips.json');
const defaultPathToLayoutrc = '.layoutrc';

const fse = require('fs-extra');
const glob = require('glob');

module.exports = function(pathToLayoutrc) {
  pathToLayoutrc = pathToLayoutrc || glob.sync(defaultPathToLayoutrc)[0];
  const layoutRcJson = fse.readFileSync(pathToLayoutrc).toString('utf-8');
  const { tooltips } = JSON.parse(layoutRcJson);
  return Object.assign(defaultTooltips, tooltips);
};