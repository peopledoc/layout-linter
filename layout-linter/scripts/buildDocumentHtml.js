const buildVirtualDom = require('./buildVirtualDom.js');

module.exports = function(html, css, js) {
  const $ = buildVirtualDom(html);
  $('head').append(`<style>${css}</style>`);
  $('body').append(`<script>${js}</script>`);
  return `<html>${$('html').html()}</html>`;
};