const assert = require('assert');

const createScenario = require('../helpers/createScenario');
const jQuery = require('../helpers/$');
const lintLayout = require('../../index');

const FIRST_TOOLTIP_ID = 'layout-linter-tooltip-0-0';

describe('testing linting rules', function() {
  it('will add a tooltip to the problematic element for each rule that wasn\'t obeyed', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'section',
        parent: '.parent-b',
        direct: ['.direct-1', '.direct-2'],
        contains: ['.contains-1', '.contains-2'],
        attr: ['attr-a', 'attr-b="something"'],
        not: {
          is: 'div',
          parent: '.parent-a',
          direct: ['.direct-3', '.direct-4'],
          contains: ['.contains-3', '.contains-4'],
          attr: ['attr-c', 'attr-d="something"']
        }
      }]
    });

    const result = lintLayout({
      source: `
        <html>
          <body>
            <div class="parent-a">
              <div class="test" attr-b="something else" attr-c attr-d="something else">
                <div>
                  <div class="direct-1"></div>
                  <div class="direct-2"></div>
                </div>
                <div class="direct-3"></div>
                <div class="direct-4"></div>
                <div class="contains-3">
                  <div class="contains-4"></div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });

    let $ = jQuery(result.html);
    const $linted = $(`.test[layout-linter-tooltip-id="${FIRST_TOOLTIP_ID}"]`);
    const hasTooltipWith = function(msg) {
      let found = true;
      $(`#${FIRST_TOOLTIP_ID} li`).each((index, el)=> {
        found = el.innerHTML === msg;
        return !found;
      });
      return found;
    };

    assert.equal($linted.length, 1, 'element was linted');
    assert.ok(hasTooltipWith('tag must be a &lt;section&gt;'), '"is" rule works');
    assert.ok(hasTooltipWith('parent must be .parent-b'), '"parent" rule works');
    assert.ok(hasTooltipWith('element must contain this direct child: .direct-1'), '"direct" rule works');
    assert.ok(hasTooltipWith('element must contain this direct child: .direct-2'), '"direct" rule works');
    assert.ok(hasTooltipWith('element must contain this child: .contains-1'), '"contains" rule works');
    assert.ok(hasTooltipWith('element must contain this child: .contains-2'), '"contains" rule works');
    assert.ok(hasTooltipWith('element must have this attribute: attr-a'), '"attr" rule works');
    assert.ok(hasTooltipWith('element must have this attribute: attr-b="something"'), '"attr" rule works');
    assert.ok(hasTooltipWith('tag must not be a &lt;div&gt;'), '"not is" rule works');
    assert.ok(hasTooltipWith('parent must not be .parent-a'), '"not parent" rule works');
    assert.ok(hasTooltipWith('element must not contain this direct child: .direct-3'), '"not direct" rule works');
    assert.ok(hasTooltipWith('element must not contain this direct child: .direct-4'), '"not direct" rule works');
    assert.ok(hasTooltipWith('element must not contain this child: .contains-3'), '"not contains" rule works');
    assert.ok(hasTooltipWith('element must not contain this child: .contains-4'), '"not contains" rule works');
    assert.ok(hasTooltipWith('element must not have this attribute: attr-c'), '"not attr" rule works');
  });

  it('will not add a tooltip to the problematic element for a rule that was obeyed', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'section',
        parent: '.parent-b',
        direct: ['.direct-1', '.direct-2'],
        contains: ['.contains-1', '.contains-2'],
        attr: ['attr-a', 'attr-b="something"'],
        not: {
          is: 'div',
          parent: '.parent-a',
          direct: ['.direct-3', '.direct-4'],
          contains: ['.contains-3', '.contains-4'],
          attr: ['attr-c', 'attr-d="something"']
        }
      }]
    });

    const result = lintLayout({
      source: `
        <html>
          <body>
            <div class="parent-b">
              <section class="test" attr-a attr-b="something">
                <div class="direct-1"></div>
                <div class="direct-2"></div>
                <div class="contains-1">
                  <div class="contains-2"></div>
                </div>
              </section>
            </div>
          </body>
        </html>
      `
    });

    let $ = jQuery(result.html);
    const $linted = $(`.test[layout-linter-tooltip-id="${FIRST_TOOLTIP_ID}"]`);
    assert.equal($linted.length, 0, 'no errors were found');
  });
});
