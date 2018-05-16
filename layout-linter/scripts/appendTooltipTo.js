module.exports = function($el, errors, tooltipId) {
  let existingTooltipId = $el.attr('layout-linter-tooltip');

  if (existingTooltipId) {
    $tooltip = $(`#${existingTooltipId}`);
  } else {
    $el
      .addClass('layout-linter-linted')
      .attr('layout-linter-tooltip', tooltipId);
    let $body = $el.closest('body');
    $body.append(`<div id="${tooltipId}" class="layout-linter-tooltip"><h3>I'm a tooltip for "${$el.text()}"</h3><ul></ul></div>`);
    $tooltip = $body.find(`#${tooltipId}`);
  }

  errors.forEach((error)=> {
    $tooltip.find('ul').append(`<li>${error}</li>`);
  });
};
