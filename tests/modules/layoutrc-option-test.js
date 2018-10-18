/* eslint-env mocha */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const pathToParentFolder = require('../../scripts/dir').parent;
const createScenario = require('../helpers/createScenario');
const $ = require('../helpers/$');
const lintLayout = require('../../index');

describe('testing layoutrc option', function() {
  it('will look for .layoutrc in root app folder, if layoutrc location is not defined', function() {
    let relativePathToLayoutrc = '/.layoutrc';
    let absolutePathToLayoutrc = path.join(pathToParentFolder, relativePathToLayoutrc);

    createScenario({
      relativePathToRulesFile: relativePathToLayoutrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToLayoutrc), `temporary ${absolutePathToLayoutrc}  was generated for testing purposes`);

    const result = lintLayout({ source: '<div class="test"></div>' });
    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('will not look for .layoutrc in the root app\'s direct subfolders, if layoutrc location is not defined', function() {
    let relativePathToLayoutrc = '/level-1/.layoutrc';
    let absolutePathToLayoutrc = path.join(pathToParentFolder, relativePathToLayoutrc);

    createScenario({
      relativePathToRulesFile: relativePathToLayoutrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToLayoutrc), `temporary ${absolutePathToLayoutrc}  was generated for testing purposes`);
    assert.throws(()=> {
      lintLayout({ source: '<div class="test"></div>' });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in a direct subfolder');
  });

  it('will not look for .layoutrc in root app\'s indirect subfolders, if layoutrc location is not defined', function() {
    let relativePathToLayoutrc = '/level-1/level-2/.layoutrc';
    let absolutePathToLayoutrc = path.join(pathToParentFolder, relativePathToLayoutrc);

    createScenario({
      relativePathToRulesFile: relativePathToLayoutrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToLayoutrc), `temporary ${absolutePathToLayoutrc} was generated for testing purposes`);
    assert.throws(()=> {
      lintLayout({ source: '<div class="test"></div>' });
    }, /^Error: layout-linter | getLayoutrc | could not locate \.layoutrc file$/, 'HTML was not linted because .layoutrc was placed in an indirect subfolder');
  });

  it('can look for .layoutrc in a custom location, defined by the user via a relative path', function() {
    let relativePathToLayoutrc = '/node_modules/.layoutrc';
    let absolutePathToLayoutrc = path.join(pathToParentFolder, relativePathToLayoutrc);

    createScenario({
      relativePathToRulesFile: relativePathToLayoutrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToLayoutrc), `temporary ${absolutePathToLayoutrc} was generated for testing purposes`);

    const result = lintLayout({
      source: '<div class="test"></div>',
      layoutrc: relativePathToLayoutrc
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('can look for .layoutrc in a custom location, defined by the user via an absolute path', function() {
    let relativePathToLayoutrc = '/node_modules/.layoutrc';
    let absolutePathToLayoutrc = path.join(pathToParentFolder, relativePathToLayoutrc);

    createScenario({
      relativePathToRulesFile: relativePathToLayoutrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToLayoutrc), `temporary ${absolutePathToLayoutrc} was generated for testing purposes`);

    const result = lintLayout({
      source: '<div class="test"></div>',
      layoutrc: absolutePathToLayoutrc
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('can look for a custom filename, defined by the user via a relative path, instead of the default ".layoutrc"', function() {
    let relativePathToCustomRulesFile = '/level-1/level-2/rules.config';
    let absolutePathToCustomRulesFile = path.join(pathToParentFolder, relativePathToCustomRulesFile);

    createScenario({
      relativePathToRulesFile: relativePathToCustomRulesFile,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToCustomRulesFile), `temporary ${absolutePathToCustomRulesFile} was generated for testing purposes`);

    const result = lintLayout({
      layoutrc: relativePathToCustomRulesFile,
      source: '<div class="test"></div>'
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });

  it('can look for a custom filename, defined by the user via an absolute path, instead of the default ".layoutrc"', function() {
    let relativePathToCustomRulesFile = '/level-1/level-2/rules.config';
    let absolutePathToCustomRulesFile = path.join(pathToParentFolder, relativePathToCustomRulesFile);

    createScenario({
      relativePathToRulesFile: relativePathToCustomRulesFile,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToCustomRulesFile), `temporary ${absolutePathToCustomRulesFile} was generated for testing purposes`);

    const result = lintLayout({
      layoutrc: absolutePathToCustomRulesFile,
      source: '<div class="test"></div>'
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'linted HTML based on .layoutrc rule');
  });
});
