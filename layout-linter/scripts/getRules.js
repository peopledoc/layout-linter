/*
  if the rules file (json) is not passed to the function
  it will look for it globally using its default name (.layoutrc)
*/

const fse = require('fs-extra');
const glob = require('glob');

const defaultPathToLayoutrc = '.layoutrc';

module.exports = function(pathToLayoutrc) {
  pathToLayoutrc = pathToLayoutrc || glob.sync(defaultPathToLayoutrc)[0];
  const layoutRcJson = fse.readFileSync(pathToLayoutrc).toString('utf-8');
  return JSON.parse(layoutRcJson).rules;
};
