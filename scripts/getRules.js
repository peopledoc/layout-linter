/*
  returns the "rules" key (array) found in the object returned by getLayoutrc()
*/
const getLayoutrc = require('./getLayoutrc');

module.exports = function(pathToLayoutrc) {
  let layoutrc = getLayoutrc(pathToLayoutrc);
  if (!layoutrc.rules) {
    throw new Error('layout-linter: "rules" property not found in JSON');
  }
  return layoutrc.rules;
};
