const path = require('path');
const getRules = require('./scripts/getRules.js');
const getTooltips = require('./scripts/getTooltips.js');
const getCss = require('./scripts/getCss.js');
const getBrowserJs = require('./scripts/getBrowserJs.js');
const getSourceHtml = require('./scripts/getSourceHtml.js');
const buildVirtualDom = require('./scripts/buildVirtualDom.js');
const errorMessagesFor = require('./scripts/errorMessagesFor.js');
const appendTooltipTo = require('./scripts/appendTooltipTo.js');

module.exports = function(options) {
  const rules = getRules(options.layoutrc);
  const tooltips = getTooltips(options.layoutrc);
  const sourceHTML = getSourceHtml(options.source);
  const sourceHTMLfirst9chars = sourceHTML.replace(/\s/g, '').substring(0, 9).toLowerCase();
  const styleTag = `<style>${getCss(options.css)}</style>`;
  const scriptTag = `<script>${getBrowserJs()}</script>`;
  const $ = buildVirtualDom(sourceHTML);

  let totalNumberOfErrors = 0;
  let log = [];
  let html;

  rules.forEach((rule, ruleIndex)=> {
    $(rule.selector).each((elIndex, el)=> {
      let errors = errorMessagesFor($(el), rule, tooltips);
      if (errors.length) {
        totalNumberOfErrors += errors.length;
        let $parent = $(el).clone().wrap('<p/>').parent();
        $parent.children().eq(0).html('');
        log.push({
          element: $parent.html(),
          errors
        });
        let tooltipId = `layout-linter-tooltip-${ruleIndex}-${elIndex}`;
        appendTooltipTo($(el), errors, tooltipId);
      }
    });
  });

  // return a fragment if the `fragment` option is set to true and
  // only if the fragment passed is truly a fragment
  if (options.fragment && !/^<(!doctype|html|head|body)/.test(sourceHTMLfirst9chars)) {
    html = `${styleTag}${$('body').html()}${scriptTag}`;
  } else {
    $('head').append(styleTag);
    $('body').append(scriptTag);
    html = `<!DOCTYPE html><html>${$('html').html()}</html>`;
  }

  return {
    html,
    log,
    errors: totalNumberOfErrors
  };
};
