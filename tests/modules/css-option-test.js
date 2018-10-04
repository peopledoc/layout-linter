const fs = require('fs');
const path = require('path');
const assert = require('assert');
const pathToRootFolder = require('app-root-path').path;

const createScenario = require('../helpers/createScenario');
const pathToParentFolder = require('../../scripts/dir').parent;
const $ = require('../helpers/$');
const lintLayout = require('../../index');

const defaultCss = fs.readFileSync(path.join(pathToRootFolder, '/defaults/style.css')).toString('utf-8');
const defaultCssWithoutSpaces = defaultCss.replace(/\s/g, '');

describe('testing css option', function() {
  it('will use default css', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({ source: '<div class="test"></div>' });
    const $html = $(result.html);

    let usedCssWithoutSpaces = $html.find('head style')[0].innerHTML.replace(/\s/g, '');

    assert.equal($html.find('head style').length, 1, 'only one <style> tag in linted document');
    assert.ok(usedCssWithoutSpaces.length > 0, '<style> tag contains CSS');
    assert.equal(usedCssWithoutSpaces, defaultCssWithoutSpaces, '<style> tag contains default CSS');
  });

  it('can use custom css file instead of default one, by passing relative path to that file', function() {
    let relativePathToCss = '/some/custom.css';
    let absolutePathToCss = path.join(pathToParentFolder, relativePathToCss);
    let cssContent = '.meh { height: 12px; }';

    createScenario({
      relativePathToCss,
      cssContent,
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToCss), `temporary ${relativePathToCss} was generated for testing purposes`);

    const result = lintLayout({
      source: '<div class="test"></div>',
      css: relativePathToCss
    });
    const $html = $(result.html);

    assert.equal($html.find('head style').length, 1, 'only one <style> tag in linted document');
    assert.equal($html.find('head style')[0].innerHTML, cssContent, '<style> tag contains custom CSS');
  });

  it('can use custom css file instead of default one, by passing absolute path to that file', function() {
    let relativePathToCss = '/some/custom.css';
    let absolutePathToCss = path.join(pathToParentFolder, relativePathToCss);
    let cssContent = '.meh { height: 12px; }';

    createScenario({
      relativePathToCss,
      cssContent,
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToCss), `temporary ${relativePathToCss} was generated for testing purposes`);

    const result = lintLayout({
      source: '<div class="test"></div>',
      css: absolutePathToCss
    });
    const $html = $(result.html);

    assert.equal($html.find('head style').length, 1, 'only one <style> tag in linted document');
    assert.equal($html.find('head style')[0].innerHTML, cssContent, '<style> tag contains custom CSS');
  });
});
