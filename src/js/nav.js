(function () {
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Booking modal
(function () {
  var modal = document.getElementById('booking-modal');
  if (!modal) return;

  function openModal(e) {
    e.preventDefault();
    var iframe = modal.querySelector('iframe[data-src]');
    if (iframe) { iframe.src = iframe.getAttribute('data-src'); iframe.removeAttribute('data-src'); }
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-booking-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });

  modal.querySelector('.booking-modal-close').addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();

// Podcast guest modal
(function () {
  var modal = document.getElementById('podcast-modal');
  if (!modal) return;

  function openModal(e) {
    e.preventDefault();
    var iframe = modal.querySelector('iframe[data-src]');
    if (iframe) { iframe.src = iframe.getAttribute('data-src'); iframe.removeAttribute('data-src'); }
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-podcast-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', openModal);
  });

  modal.querySelector('.booking-modal-close').addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();

// Inline subscribe forms
(function () {
  document.querySelectorAll('[data-subscribe-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';
      if (!email) return;

      fetch('https://buttondown.com/api/emails/embed-subscribe/aronstein', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'email=' + encodeURIComponent(email)
      }).catch(function () {}).finally(function () {
        form.style.display = 'none';
        var success = form.nextElementSibling;
        if (success && success.classList.contains('subscribe-success')) {
          success.style.display = 'block';
        }
      });
    });
  });
})();
