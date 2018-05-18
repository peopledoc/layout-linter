const buildVirtualDom = require('./buildVirtualDom.js');

module.exports = function(html, css, js, returnSnippet) {
  const $ = buildVirtualDom(html);
  const styleTag = `<style>${css}</style>`;
  const scriptTag = `<script>${js}</script>`;
  if (returnSnippet) {
    return `${styleTag}${$('body').html()}${scriptTag}`;
  }
  $('head').append(styleTag);
  $('body').append(scriptTag);
  return `<!DOCTYPE html><html>${$('html').html()}</html>`;
};
