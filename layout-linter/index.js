const defaultPathToRulesFile = '.layoutrc';
const defaultTooltips = require('./tooltips.json');
const buildErrorMessageFor = require('./scripts/buildErrorMessageFor.js');
const appendTooltipTo = require('./scripts/appendTooltipTo.js');

const fse = require('fs-extra');
const glob = require('glob');
const html = require('html');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = function(source, rulesFile) {
  /*
    "source" can either be an .html file or the HTML string itself
  */
  let sourceHTML = fse.existsSync(source) ? fse.readFileSync(source).toString('utf-8') : source;

  const { window } = new JSDOM(sourceHTML);
  const $ = require('jquery')(window);

  /*
    if the rules file (json) is not passed to the function
    it will look for it globally using its default name (.layoutrc)
  */
  rulesFile = rulesFile || glob.sync(defaultPathToRulesFile)[0];

  const rulesJSON = fse.readFileSync(rulesFile).toString('utf-8');
  const rulesObject = JSON.parse(rulesJSON);
  const rules = rulesObject.rules;

  /*
    use custom tooltip messages or default ones
  */
  const tooltips = Object.assign(defaultTooltips, rulesObject.tooltips);

  rules.forEach((rule, ruleIndex)=> {
    $(rule.selector).each((elIndex, el)=> {
      let errors = [];

      if (rule.is) {
        if (!$(el).is(rule.is)) {
          errors.push(buildErrorMessageFor(rule.is, tooltips['is']));
        }
      }

      if (rule.parent) {
        if (!$(el).parent(rule.parent).length) {
          errors.push(buildErrorMessageFor(rule.parent, tooltips['parent']));
        }
      }

      if (rule.direct) {
        rule.direct.forEach((childSelector)=> {
          if (!$(el).find(`>${childSelector}`).length) {
            errors.push(buildErrorMessageFor(childSelector, tooltips['direct']));
          }
        });
      }

      if (rule.contains) {
        rule.contains.forEach((childSelector)=> {
          if (!$(el).find(`${childSelector}`).length) {
            errors.push(buildErrorMessageFor(childSelector, tooltips['contains']));
          }
        });
      }

      if (rule.attr) {
        rule.attr.forEach((attrSelector)=> {
          if (!$(el).is(`[${attrSelector}]`)) {
            errors.push(buildErrorMessageFor(attrSelector, tooltips['attr']));
          }
        });
      }

      if (rule.not) {
        if (rule.not.is) {
          if ($(el).is(rule.not.is)) {
            errors.push(buildErrorMessageFor(rule.not.is, tooltips.not.is));
          }
        }

        if (rule.not.parent) {
          if ($(el).parent(rule.not.parent).length) {
            errors.push(buildErrorMessageFor(rule.not.parent, tooltips.not.parent));
          }
        }

        if (rule.not.direct) {
          rule.not.direct.forEach((childSelector)=> {
            if ($(el).find(`>${childSelector}`).length) {
              errors.push(buildErrorMessageFor(childSelector, tooltips.not.direct));
            }
          });
        }

        if (rule.not.contains) {
          rule.not.contains.forEach((childSelector)=> {
            if ($(el).find(`${childSelector}`).length) {
              errors.push(buildErrorMessageFor(childSelector, tooltips.not.contains));
            }
          });
        }

        if (rule.not.attr) {
          rule.not.attr.forEach((attrSelector)=> {
            if ($(el).is(`[${attrSelector}]`)) {
              errors.push(buildErrorMessageFor(attrSelector, tooltips.not.attr));
            }
          });
        }
      }

      if (errors.length) {
        let tooltipId = `layout-linter-tooltip-${ruleIndex}-${elIndex}`;
        appendTooltipTo($(el), errors, tooltipId);
      }
    });
  });

  const lintedSourceHTML = `<html>${$('html').html()}</html>`;

  return lintedSourceHTML;
};