module.exports = function($el, errors, tooltipId) {
  let $body = $el.closest('body');
  let existingTooltipId = $el.attr('html-linter-tooltip-id');

  let $tooltip;

  if (existingTooltipId) {
    $tooltip = $body.find(`#${existingTooltipId}`);
  } else {
    $el.attr('html-linter-tooltip-id', tooltipId);
    $body.append(`<div id="${tooltipId}" class="html-linter-tooltip"><ul></ul></div>`);
    $tooltip = $body.find(`#${tooltipId}`);
  }

  errors.forEach((error)=> {
    $tooltip.find('ul').append(`<li>${error}</li>`);
  });
};
