(function() {

  var tooltipClassName = 'layout-linter-tooltip';
  var tooltipTargetAttrName = 'layout-linter-tooltip-id';

  function positionTooltips() {
    document.querySelectorAll('.'+tooltipClassName).forEach(function(tooltip) {
      var el = document.querySelector('['+tooltipTargetAttrName+'="'+tooltip.id+'"]');
      tooltip.style.top = el.offsetTop + 'px';
      tooltip.style.left = el.offsetLeft + 'px';
    });
  };

  window.addEventListener('resize', function() {
    positionTooltips();
  });

  positionTooltips();

})();
