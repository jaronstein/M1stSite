(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var anchor = document.getElementById('inline-cta-anchor');
    var cta = document.querySelector('.inline-cta');

    if (anchor && cta) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cta.classList.add('inline-cta--visible');
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(anchor);
    }
  });

})();
