(function() {
  function positionTooltips() {
    document.querySelectorAll('.layout-linter-tooltip').forEach(function(tooltip) {
      var el = document.querySelector('[layout-linter-tooltip-id="'+tooltip.id+'"]');
      tooltip.style.top = el.offsetTop;
      tooltip.style.left = el.offsetLeft;
    });
  };

  window.addEventListener('resize', function() {
    positionTooltips();
  });

  positionTooltips();
})();
