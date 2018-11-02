/* eslint-env mocha */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const pathToRootFolder = require('app-root-path').path;

const createScenario = require('../helpers/createScenario');
const pathToParentFolder = require('../../scripts/dir').parent;
const $ = require('../helpers/$');
const lintLayout = require('../../index');

const pathToLintedHTMLfile = path.join(pathToParentFolder, 'linted.html');

const DATA_FOR_BROWSER =  {
  TOOLTIP_ID_ATTR: 'layout-linter-tooltip-id',
  TOOLTIP_MIN_TOP: 10,
  WITH_MIN_TOP_ID: 'with-min-top',
  WITHOUT_MIN_TOP_ID: 'without-min-top'
};

describe('testing tooltips Js', function() {
  it('shows, hides and positions tooltips correctly', async ()=> {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <div class="test" id="${DATA_FOR_BROWSER.WITHOUT_MIN_TOP_ID}" style="float:left;"></div>
        <div class="test" id="${DATA_FOR_BROWSER.WITH_MIN_TOP_ID}" style="float:left; margin-top: ${DATA_FOR_BROWSER.TOOLTIP_MIN_TOP + 1}px;"></div>
      `
    });

    fs.writeFileSync(pathToLintedHTMLfile, result.html);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:${pathToLintedHTMLfile}`);
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });

    /*
      in case in-browser logging is required when debugging a test,
      this will pass what is logged in the browser console
      onto the terminal console
    */
    page.on('console', (msg)=> {
      for (let i = 0; i < msg.args().length; ++i) {
        console.log(`${i}: ${msg.args()[i]}`);
      }
    });

    return page.evaluate((DATA_FOR_BROWSER)=> {
      /*
        this function will be executed inside the browser window context
        therefore, it has no direct access to any external variables declared in this file,
        any such variables must be passed to this function as parameters as a result
        this is what `DATA_FOR_BROWSER` is for
      */

      let $targetWithMinTop = window.$(`#${DATA_FOR_BROWSER.WITH_MIN_TOP_ID}`);
      let $targetWithoutMinTop = window.$(`#${DATA_FOR_BROWSER.WITHOUT_MIN_TOP_ID}`);
      let $tooltipForTargetWithMinTop = window.$(`#${$targetWithMinTop.attr(DATA_FOR_BROWSER.TOOLTIP_ID_ATTR)}`);
      let $tooltipForTargetWithoutMinTop = window.$(`#${$targetWithoutMinTop.attr(DATA_FOR_BROWSER.TOOLTIP_ID_ATTR)}`);

      let assertions = {};

      assertions.noTooltipOpenInitially = !$tooltipForTargetWithMinTop.hasClass('open') && !$tooltipForTargetWithoutMinTop.hasClass('open');

      $tooltipForTargetWithMinTop.click();

      assertions.onlyTooltipForTargetWithMinTopIsOpenAfterClick = $tooltipForTargetWithMinTop.hasClass('open') && !$tooltipForTargetWithoutMinTop.hasClass('open');
      assertions.leftOfTooltipForTargetWithMinTopIsCorrect = $targetWithMinTop.offset().left === $tooltipForTargetWithMinTop.offset().left;

      assertions.topOfTooltipForTargetWithMinTopIsCorrect = $targetWithMinTop.offset().top >= DATA_FOR_BROWSER.TOOLTIP_MIN_TOP &&
                                                            $tooltipForTargetWithMinTop.offset().top === $targetWithMinTop.offset().top;
      $tooltipForTargetWithoutMinTop.click();

      assertions.onlyTooltipForTargetWithoutMinTopIsOpenAfterClick = $tooltipForTargetWithoutMinTop.hasClass('open') && !$tooltipForTargetWithMinTop.hasClass('open');
      assertions.leftOfTooltipForTargetWithoutMinTopIsCorrect = $targetWithoutMinTop.offset().left === $tooltipForTargetWithoutMinTop.offset().left;
      assertions.topOfTooltipForTargetWithoutMinTopIsMinimum = $targetWithoutMinTop.offset().top < DATA_FOR_BROWSER.TOOLTIP_MIN_TOP &&
                                                               $tooltipForTargetWithoutMinTop.offset().top === DATA_FOR_BROWSER.TOOLTIP_MIN_TOP;

      $tooltipForTargetWithoutMinTop.click();

      assertions.noTooltipOpenAfterClick = !$tooltipForTargetWithMinTop.hasClass('open') && !$tooltipForTargetWithoutMinTop.hasClass('open');

      return assertions;
    }, DATA_FOR_BROWSER)
      .then((assertions)=> {
        /*
          no mocha assertions can be run inside the above browser window context
          all assertion-related data must be passed from the browser window context
          back to the mocha context, in here, via the `assertions` parameter
        */
        assert.ok(assertions.noTooltipOpenInitially, 'no tooltip open initially');
        assert.ok(assertions.onlyTooltipForTargetWithMinTopIsOpenAfterClick, 'only tooltip for target with min top is open after it was clicked');
        assert.ok(assertions.leftOfTooltipForTargetWithMinTopIsCorrect, 'left offset of tooltip for target with min top is correct');
        assert.ok(assertions.topOfTooltipForTargetWithMinTopIsCorrect, 'top offset of tooltip for target with min top is correct');
        assert.ok(assertions.onlyTooltipForTargetWithoutMinTopIsOpenAfterClick, 'only tooltip for target without min top is open after it was clicked');
        assert.ok(assertions.leftOfTooltipForTargetWithoutMinTopIsCorrect, 'left offset of tooltip for target without min top is correct');
        assert.ok(assertions.topOfTooltipForTargetWithoutMinTopIsMinimum, 'top offset of tooltip for target without min top is minimum');
        assert.ok(assertions.noTooltipOpenAfterClick, 'no tooltip open after click');
        browser.close();
      });
  });
});
