const getSourceHtml = require('./getSourceHtml.js');
const buildVirtualDom = require('./buildVirtualDom.js');
const errorMessagesFor = require('./errorMessagesFor.js');
const appendTooltipTo = require('./appendTooltipTo.js');

module.exports = function(pathToHtmlOrHtmlString, rules, tooltips) {
  const sourceHTML = getSourceHtml(pathToHtmlOrHtmlString);
  const $ = buildVirtualDom(sourceHTML);

  rules.forEach((rule, ruleIndex)=> {
    $(rule.selector).each((elIndex, el)=> {
      let errors = errorMessagesFor($(el), rule, tooltips);
      if (errors.length) {
        let tooltipId = `layout-linter-tooltip-${ruleIndex}-${elIndex}`;
        appendTooltipTo($(el), errors, tooltipId);
      }
    });
  });

  return `<html>${$('html').html()}</html>`;
};
