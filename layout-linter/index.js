const defaultPathToRulesFile = '.layoutrc';

const defaultCSS = './default.css';

const activateTooltips = './scripts/activateTooltips.js'

const defaultTooltips = require('./tooltips.json');
const errorMessagesFor = require('./scripts/errorMessagesFor.js');
const appendTooltipTo = require('./scripts/appendTooltipTo.js');

const fse = require('fs-extra');
const glob = require('glob');
const html = require('html');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function(options) {
  /*
    "source" can either be an .html file or the HTML string itself
  */
  const { source } = options;
  const sourceHTML = fse.existsSync(source) ? fse.readFileSync(source).toString('utf-8') : source;
  const { window } = new JSDOM(sourceHTML);
  const $ = require('jquery')(window);


  /*
    if the rules file (json) is not passed to the function
    it will look for it globally using its default name (.layoutrc)
  */
  const rulesFile = options.rulesFile || glob.sync(defaultPathToRulesFile)[0];
  const rulesJSON = fse.readFileSync(rulesFile).toString('utf-8');
  const rulesObject = JSON.parse(rulesJSON);
  const { rules } = rulesObject;

  /*
    use custom tooltip messages or default ones
  */
  const tooltips = Object.assign(defaultTooltips, rulesObject.tooltips);

  rules.forEach((rule, ruleIndex)=> {
    $(rule.selector).each((elIndex, el)=> {
      let errors = errorMessagesFor($(el), rule, tooltips);
      if (errors.length) {
        let tooltipId = `layout-linter-tooltip-${ruleIndex}-${elIndex}`;
        appendTooltipTo($(el), errors, tooltipId);
      }
    });
  });

  /* append layout-linter CSS */
  const cssFile = options.cssFile || `${__dirname}/${defaultCSS}`;
  const css =  fse.readFileSync(cssFile).toString('utf-8');
  $('head').append(`<style>${css}</style>`);

  /* append layout-linter JS */
  const activateTooltipsJs = fse.readFileSync(`${__dirname}/${activateTooltips}`).toString('utf-8');
  $('body').append(`<script>${activateTooltipsJs}</script>`);
  const lintedSourceHTML = `<html>${$('html').html()}</html>`;

  return lintedSourceHTML;
};