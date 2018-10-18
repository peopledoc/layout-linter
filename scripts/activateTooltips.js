/* eslint-env browser */
(function() {

  // defined in layout-linter/defaults/style.css
  var tooltipMaxWidth = 240;
  var tooltipMaxHeight = 100;
  var tooltipMinimumTopOffset = 10;

  var tooltipClassName = 'layout-linter-tooltip';
  var tooltipTargetAttrName = 'layout-linter-tooltip-id';
  var tooltips = document.querySelectorAll('.'+tooltipClassName);

  function closeTooltips() {
    document.querySelectorAll('.'+tooltipClassName+'.open').forEach(function(openTooltip) {
      openTooltip.classList.remove('open');
      openTooltip.style['margin-top'] = 0;
      openTooltip.style['margin-left'] = 0;
    });
  }

  function getPosition(element) {
    var box = element.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }

  function adjustOpenTooltip(tooltip) {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    tooltip.style['margin-top'] = 0;
    tooltip.style['margin-left'] = 0;

    var tooltipCurrentPosition = getPosition(tooltip);
    var hiddenVertically = tooltipCurrentPosition.top + tooltipMaxHeight - windowHeight;
    var hiddenHoriontally = tooltipCurrentPosition.left + tooltipMaxWidth - windowWidth;

    if (hiddenVertically > 0) {
      tooltip.style['margin-top'] = (- hiddenVertically - tooltipMinimumTopOffset) + 'px';
    }

    if (hiddenHoriontally > 0) {
      tooltip.style['margin-left'] = (- hiddenHoriontally - tooltipMinimumTopOffset) + 'px';
    }
  }

  function positionTooltips() {
    tooltips.forEach(function(tooltip) {
      var tooltipTarget = document.querySelector('['+tooltipTargetAttrName+'="'+tooltip.id+'"]');
      var position  = getPosition(tooltipTarget);

      /*
        tooltip is placed -{tooltipMinimumTopOffset}px above the element
        but if this happens to be outside the window, place it exactly over the element
      */
      if (position.top < tooltipMinimumTopOffset) {
        position.top = tooltipMinimumTopOffset;
      }

      tooltip.style.top = position.top + 'px';
      tooltip.style.left = position.left + 'px';

      if (tooltip.classList.contains('open')) {
        adjustOpenTooltip(tooltip);
      }
    });
  }

  document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var thisIsAClosedTooltip = target.classList.contains(tooltipClassName) && !target.classList.contains('open');

    closeTooltips();

    if (thisIsAClosedTooltip) {
      target.classList.add('open');
      adjustOpenTooltip(target);
    }
  }, false);

  window.addEventListener('resize', function() {
    positionTooltips();
  });

  positionTooltips();

})();
