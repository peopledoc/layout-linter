if (process.env.LAYOUT_LINTER_DEBUG === 'true') {
  module.exports = function() {
    console.log(...arguments);
  };
} else {
  module.exports = function() {};
}
