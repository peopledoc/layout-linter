const path = require('path');
const createScenario = require('../helpers/createScenario');

const $ = require('../helpers/$');
const lintLayout = require('../../index');
const assert = require('assert');

describe('testing path to layoutrc options', function() {

  it('if layoutrc location is not defined, it will look for .layoutrc in root app folder', function() {
    createScenario({
      pathToLayoutrc: '/',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({ source: '<div class="test"></div>' });
    const $html = $(result.html);

    // TODO assert .layoutrc is where it's supposed to be

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('if layoutrc location is not defined, it will not look for .layoutrc in the root app\'s direct subfolders', function() {
    createScenario({
      pathToLayoutrc: '/level-1',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    // TODO assert .layoutrc is where it's supposed to be

    assert.throws(()=> {
      lintLayout({ source: '<div class="test"></div>' });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in a subfolder');
  });

  it('if layoutrc location is not defined, it will not look for .layoutrc in root app\'s indirect subfolders', function() {
    createScenario({
      pathToLayoutrc: '/level-1/level-2',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    // TODO assert .layoutrc is where it's supposed to be

    assert.throws(()=> {
      lintLayout({ source: '<div class="test"></div>' });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in a subfolder');
  });

  it('if layoutrc location is defined | it will  look for .layoutrc in that location', function() {
    createScenario({
      pathToLayoutrc: '/node_modules',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    // TODO assert .layoutrc is where it's supposed to be

    const result = lintLayout({
      source: '<div class="test"></div>',
      layoutrc: './node_modules/.layoutrc'
    });
    const $html = $(result.html);
    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
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

    // TODO assert .layoutrc is where it's supposed to be

    const result = lintLayout({
      layoutrc: `${pathToLayoutrc}/${customLayoutrcName}`,
      source: '<div class="test"></div>'
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

});
