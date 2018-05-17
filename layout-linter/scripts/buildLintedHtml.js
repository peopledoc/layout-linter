const getSourceHtml = require('./getSourceHtml.js');
const getRules = require('./getRules.js');
const getTooltips = require('./getTooltips.js');
const buildVirtualDom = require('./buildVirtualDom.js');
const errorMessagesFor = require('./errorMessagesFor.js');
const appendTooltipTo = require('./appendTooltipTo.js');

module.exports = function(options) {
  const sourceHTML = getSourceHtml(options.source);
  const rules = getRules(options.layoutrc);
  const tooltips = getTooltips(options.layoutrc);

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
};