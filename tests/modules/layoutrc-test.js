const path = require('path');
const createScenario = require('../helpers/createScenario');

const $ = require('../helpers/$');
const lintLayout = require('../../index');
const assert = require('assert');

describe('testing path to layoutrc options', function() {

  it('if layoutrc location is not defined | it will look for .layoutrc in root app folder', function() {
    createScenario({
      pathToLayoutrc: '/',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const lintedHTML = lintLayout({ source: '<div class="test"></div>' });
    const $html = $(lintedHTML);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('if layoutrc location is not defined | it will not look for .layoutrc in root app subfolders', function() {
    createScenario({
      pathToLayoutrc: '/level-1/level-2',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.throws(()=> {
      lintLayout({ source: '<div class="test"></div>' });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in a subfolder');
  });

  it('if layoutrc location is not defined | it will not look for .layoutrc in app/node_modules folder', function() {
    createScenario({
      pathToLayoutrc: '/node_modules',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.throws(()=> {
      lintLayout({
        source: '<div class="test"></div>',
        layoutrc: './node_modules/.layoutrc'
      });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in /node_modules');
  });

  it('if layoutrc location is not defined | it will not look for .layoutrc in app/**/node_modules folder', function() {
    createScenario({
      pathToLayoutrc: '/level-1/level-2/node_modules',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });
    assert.throws(()=> {
      lintLayout({
        source: '<div class="test"></div>',
        layoutrc: './level-1/level-2/node_modules/.layoutrc'
      });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in /**/node_modules');
  });

  it('a custom filename containing the rules can be used instead', function() {
    const pathToLayoutrc = '/level-1/level-2';
    const customLayoutrcName = 'rules.config';

    createScenario({
      pathToLayoutrc,
      customLayoutrcName,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const lintedHTML = lintLayout({
      layoutrc: `${pathToLayoutrc}/${customLayoutrcName}`,
      source: '<div class="test"></div>'
    });

    const $html = $(lintedHTML);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

});
