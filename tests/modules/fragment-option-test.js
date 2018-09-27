const assert = require('assert');

const createScenario = require('../helpers/createScenario');
const $ = require('../helpers/$');
const lintLayout = require('../../index');

describe('testing fragment option', function() {
  it('will return whole linted HTML document when passed whole HTML document', function() {
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

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });

  it('will return whole linted HTML document when passed an HTML fragment', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <div id="some-original-element"></div>
        <div class="test"></div>
      `
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });

  it('will return the linted fragment when passed a fragment, if `fragment` option is set to `true`', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <div id="some-original-element"></div>
        <div class="test"></div>
      `,
      fragment: true
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^ <style> .+ <\/style>
        <div id="some-original-element"></div>
        <div class="test" .+
        <script> .+ <\/script>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns linted HTML fragment as string');
  });

  it('will return whole linted HTML document, even if `fragment` option is set to `true`, if the "fragment" starts with <!doctype', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <!doctype html>
        <html>
          <div id="some-original-element"></div>
          <div class="test"></div>
        </html>
      `,
      fragment: true
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });

  it('will return whole linted HTML document, even if `fragment` option is set to `true`, if the "fragment" starts with <html', function() {
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
          <div id="some-original-element"></div>
          <div class="test"></div>
        </html>
      `,
      fragment: true
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });

  it('will return whole linted HTML document, even if `fragment` option is set to `true`, if the "fragment" starts with <head', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <head></head>
        <div id="some-original-element"></div>
        <div class="test"></div>
      `,
      fragment: true
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });

  it('will return whole linted HTML document, even if `fragment` option is set to `true`, if the "fragment" starts with <body', function() {
    createScenario({
      relativePathToRulesFile: '/.layoutrc',
      rules: [{
        selector: '.test',
        is: 'p'
      }]
    });

    const result = lintLayout({
      source: `
        <body>
          <div id="some-original-element"></div>
          <div class="test"></div>
        </body>
      `,
      fragment: true
    });

    let resultWithoutSpaces = result.html.replace(/\s/g, '');

    let expectedHTMLRegexPattern = `
      ^
      <!DOCTYPE html>
      <html>
        <head>
          <style> .+ <\/style>
        </head>
        <body>
          <div id="some-original-element"></div>
          <div class="test" .+
          <script> .+ <\/script>
        <\/body>
      <\/html>
    `;
    let expectedHTMLWithoutSpacesRegexPattern = expectedHTMLRegexPattern.replace(/\s/g, '');
    let expectedHTMLWithoutSpacesRegexp = new RegExp(expectedHTMLWithoutSpacesRegexPattern);

    assert.ok(expectedHTMLWithoutSpacesRegexp.test(resultWithoutSpaces), 'returns whole linted document as string');
  });
});
