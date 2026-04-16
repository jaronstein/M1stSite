(function () {
  'use strict';

  var POPUP_KEY = 'm1st_nl_popup_seen';

  document.addEventListener('DOMContentLoaded', function () {
    // --- Newsletter popup ---
    var overlay = document.getElementById('nl-popup-overlay');
    if (overlay && !localStorage.getItem(POPUP_KEY)) {
      var shown = false;

      function showPopup() {
        if (shown) return;
        shown = true;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closePopup() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        localStorage.setItem(POPUP_KEY, '1');
      }

      setTimeout(showPopup, 7000);

      document.getElementById('nl-popup-close').addEventListener('click', closePopup);
      document.getElementById('nl-popup-dismiss').addEventListener('click', closePopup);

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePopup();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePopup();
      });

      // Mark dismissed after successful form submit
      var form = overlay.querySelector('[data-subscribe-form]');
      if (form) {
        form.addEventListener('submit', function () {
          setTimeout(function () {
            localStorage.setItem(POPUP_KEY, '1');
          }, 2000);
        });
      }
    }

    // --- Inline CTA reveal ---
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
