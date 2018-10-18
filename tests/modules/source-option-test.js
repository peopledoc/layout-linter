/* eslint-env mocha */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const pathToParentFolder = require('../../scripts/dir').parent;
const createScenario = require('../helpers/createScenario');
const $ = require('../helpers/$');
const lintLayout = require('../../index');

describe('testing source option', function() {
  it('can be passed a valid HTML string as `source`', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <div id="some-original-element"></div>
            <div class="test"></div>
          </body>
        </html>
      `
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'it works');
  });

  it('can be passed a relative path to an .html file as `source`', function() {
    let relativePathToHtmlFile = '/source.html';
    let absolutePathToHtmlFile = path.join(pathToParentFolder, relativePathToHtmlFile);

    createScenario({
      relativePathToHtmlFile,
      htmlContent: `
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <div id="some-original-element"></div>
            <div class="test"></div>
          </body>
        </html>
      `,
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmlFile), `temporary ${absolutePathToHtmlFile} was generated for testing purposes`);

    const result = lintLayout({
      source: relativePathToHtmlFile
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'it works');
  });

  it('can be passed an absolute path to an .html file as `source`', function() {
    let relativePathToHtmlFile = '/source.html';
    let absolutePathToHtmlFile = path.join(pathToParentFolder, relativePathToHtmlFile);

    createScenario({
      relativePathToHtmlFile,
      htmlContent: `
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <div id="some-original-element"></div>
            <div class="test"></div>
          </body>
        </html>
      `,
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    assert.ok(fs.existsSync(absolutePathToHtmlFile), `temporary ${absolutePathToHtmlFile} was generated for testing purposes`);

    const result = lintLayout({
      source: absolutePathToHtmlFile
    });

    const $html = $(result.html);

    assert.equal($html.find('.test[layout-linter-tooltip-id]').length > 0, true, 'it works');
  });
});
