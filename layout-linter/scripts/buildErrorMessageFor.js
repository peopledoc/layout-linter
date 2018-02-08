module.exports = function(selectorString, message) {
  return message.replace(/{{placeholder}}/, selectorString);
};