/* eslint-env mocha */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const pathToParentFolder = require('../../scripts/dir').parent;
const createScenario = require('../helpers/createScenario');
const $ = require('../helpers/$');
const lintHtml = require('../../index');

describe('testing htmllintrc option', function() {
  it('will look for .htmllintrc in root app folder, if htmllintrc location is not defined', function() {
    let relativePathToHtmllintrc = '/.htmllintrc';
    let absolutePathToHtmllintrc = path.join(pathToParentFolder, relativePathToHtmllintrc);

    createScenario({
      relativePathToRulesFile: relativePathToHtmllintrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmllintrc), `temporary ${absolutePathToHtmllintrc}  was generated for testing purposes`);

    const result = lintHtml({ source: '<div class="test"></div>' });
    const $html = $(result.html);

    assert.equal($html.find('.test[html-linter-tooltip-id]').length > 0, true, 'linted HTML based on .htmllintrc rule');
  });

  it('will not look for .htmllintrc in the root app\'s direct subfolders, if htmllintrc location is not defined', function() {
    let relativePathToHtmllintrc = '/level-1/.htmllintrc';
    let absolutePathToHtmllintrc = path.join(pathToParentFolder, relativePathToHtmllintrc);

    createScenario({
      relativePathToRulesFile: relativePathToHtmllintrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmllintrc), `temporary ${absolutePathToHtmllintrc}  was generated for testing purposes`);
    assert.throws(()=> {
      lintHtml({ source: '<div class="test"></div>' });
    }, /^Error: html-linter | getHtmllintrc | could not locate \.htmllintrc file$/, 'HTML was not linted because .htmllintrc was placed in a direct subfolder');
  });

  it('will not look for .htmllintrc in root app\'s indirect subfolders, if htmllintrc location is not defined', function() {
    let relativePathToHtmllintrc = '/level-1/level-2/.htmllintrc';
    let absolutePathToHtmllintrc = path.join(pathToParentFolder, relativePathToHtmllintrc);

    createScenario({
      relativePathToRulesFile: relativePathToHtmllintrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmllintrc), `temporary ${absolutePathToHtmllintrc} was generated for testing purposes`);
    assert.throws(()=> {
      lintHtml({ source: '<div class="test"></div>' });
    }, /^Error: html-linter | getHtmllintrc | could not locate \.htmllintrc file$/, 'HTML was not linted because .htmllintrc was placed in an indirect subfolder');
  });

  it('can look for .htmllintrc in a custom location, defined by the user via a relative path', function() {
    let relativePathToHtmllintrc = '/node_modules/.htmllintrc';
    let absolutePathToHtmllintrc = path.join(pathToParentFolder, relativePathToHtmllintrc);

    createScenario({
      relativePathToRulesFile: relativePathToHtmllintrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmllintrc), `temporary ${absolutePathToHtmllintrc} was generated for testing purposes`);

    const result = lintHtml({
      source: '<div class="test"></div>',
      htmllintrc: relativePathToHtmllintrc
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[html-linter-tooltip-id]').length > 0, true, 'linted HTML based on .htmllintrc rule');
  });

  it('can look for .htmllintrc in a custom location, defined by the user via an absolute path', function() {
    let relativePathToHtmllintrc = '/node_modules/.htmllintrc';
    let absolutePathToHtmllintrc = path.join(pathToParentFolder, relativePathToHtmllintrc);

    createScenario({
      relativePathToRulesFile: relativePathToHtmllintrc,
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmllintrc), `temporary ${absolutePathToHtmllintrc} was generated for testing purposes`);

    const result = lintHtml({
      source: '<div class="test"></div>',
      htmllintrc: absolutePathToHtmllintrc
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[html-linter-tooltip-id]').length > 0, true, 'linted HTML based on .htmllintrc rule');
  });

  it('can look for a custom filename, defined by the user via a relative path, instead of the default ".htmllintrc"', function() {
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

    const result = lintHtml({
      htmllintrc: relativePathToCustomRulesFile,
      source: '<div class="test"></div>'
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[html-linter-tooltip-id]').length > 0, true, 'linted HTML based on .htmllintrc rule');
  });

  it('can look for a custom filename, defined by the user via an absolute path, instead of the default ".htmllintrc"', function() {
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

    const result = lintHtml({
      htmllintrc: absolutePathToCustomRulesFile,
      source: '<div class="test"></div>'
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[html-linter-tooltip-id]').length > 0, true, 'linted HTML based on .htmllintrc rule');
  });
});
