(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  var state = {
    answers: { q1: null, q2: null, q3: null, q4: null, q5: null },
    email: null,
    result: null
  };

  // ── Answer label maps ──────────────────────────────────────────────────────
  var ANSWER_LABELS = {
    q1: {
      'under1m':   'Under $1M',
      '1m-5m':     '$1M – $5M',
      '5m-25m':    '$5M – $25M',
      '25m-100m':  '$25M – $100M',
      'over100m':  'Over $100M'
    },
    q2: {
      'paid-social':  'Paid social (Meta, TikTok)',
      'paid-search':  'Paid search (Google Shopping, PMax)',
      'paid-both':    'Both paid social and paid search',
      'organic':      'Mostly organic / email / direct'
    },
    q3: {
      'q3-ads':       'My ads are working but my landing pages aren\'t converting',
      'q3-offer':     'My products are good but people aren\'t choosing us over competitors',
      'q3-discovery': 'Shoppers land on my site and can\'t find what they need',
      'q3-data':      'I know nothing about who my visitors actually are',
      'q3-testing':   'My conversion rate is fine but RPV isn\'t growing'
    },
    q4: {
      'active':       'We run tests regularly and have solid infrastructure',
      'occasional':   'We run tests occasionally but not systematically',
      'not-moving':   'We have a testing program but it\'s not moving the needle',
      'none':         'We don\'t run A/B tests'
    },
    q5: {
      'shopify':     'Shopify or Shopify Plus',
      'bigcommerce': 'BigCommerce',
      'sfcc':        'Salesforce Commerce Cloud',
      'custom':      'Custom / headless',
      'other':       'Other'
    }
  };

  var RESULT_LABELS = {
    'result-A': 'Ad-to-Page Content Personalization',
    'result-B': 'Offer Creation',
    'result-C': 'Product Discovery',
    'result-D': 'Zero-Party Data 90-Day Program',
    'result-E': 'Data-Driven Experimentation',
    'result-F': 'Not yet qualified (under $1M)',
    'result-G': 'Mixed signals — needs scoping call'
  };

  function formatAnswers(answers) {
    var questions = [
      { key: 'q1', label: 'Annual online revenue' },
      { key: 'q2', label: 'Primary traffic source' },
      { key: 'q3', label: 'Biggest challenge' },
      { key: 'q4', label: 'Experimentation maturity' },
      { key: 'q5', label: 'Platform' }
    ];
    return questions.map(function (q) {
      var val = answers[q.key];
      var readable = (ANSWER_LABELS[q.key] && ANSWER_LABELS[q.key][val]) || val || 'n/a';
      return q.label + ': ' + readable;
    }).join('\n');
  }

  // ── Screen navigation ──────────────────────────────────────────────────────
  function showScreen(id) {
    var current = document.querySelector('.quiz-screen.active');
    if (current) current.classList.remove('active');

    var next = document.getElementById(id);
    if (next) {
      next.classList.add('active');
      var wrap = document.getElementById('quizWrap');
      if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ── Wire a question screen ─────────────────────────────────────────────────
  function wireQuestion(screenId, stateKey, nextBtnId, nextScreenId) {
    var screen = document.getElementById(screenId);
    if (!screen) return;

    var nextBtn = document.getElementById(nextBtnId);
    var options = screen.querySelectorAll('.quiz-option');

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        state.answers[stateKey] = opt.dataset.value;
        if (nextBtn) nextBtn.disabled = false;
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (state.answers[stateKey]) showScreen(nextScreenId);
      });
    }
  }

  // ── Result logic ───────────────────────────────────────────────────────────
  function determineResult(a) {
    // Hard gate: under $1M
    if (a.q1 === 'under1m') return 'result-F';

    // Q3 is the primary driver
    var q3Map = {
      'q3-ads':       'result-A',
      'q3-offer':     'result-B',
      'q3-discovery': 'result-C',
      'q3-data':      'result-D',
      'q3-testing':   'result-E'
    };
    var primary = q3Map[a.q3] || 'result-G';

    // Q4: no tests at all nudges toward Experimentation as foundation
    if (a.q4 === 'none' && primary === 'result-E') return 'result-E';
    if (a.q4 === 'none' && primary === 'result-C') return 'result-E';

    // Q2 acts as tiebreaker when Q3 gave ambiguous result
    if (primary === 'result-G' || primary === 'result-E') {
      if (a.q2 === 'paid-social' || a.q2 === 'paid-both') return 'result-A';
      if (a.q2 === 'paid-search') return 'result-C';
      if (a.q2 === 'organic') {
        return (a.q4 === 'none' || a.q4 === 'occasional') ? 'result-D' : 'result-B';
      }
    }

    // Conflict check: Q3 strong signal vs Q2 — surface G if contradictory
    var strongQ3 = ['q3-ads', 'q3-offer', 'q3-discovery', 'q3-data'].indexOf(a.q3) !== -1;
    if (strongQ3) {
      if (a.q2 === 'paid-social'  && primary !== 'result-A') return 'result-G';
      if (a.q2 === 'paid-search'  && primary !== 'result-C') return 'result-G';
    }

    return primary;
  }

  // ── Show result ────────────────────────────────────────────────────────────
  function showResult(resultId) {
    // Non-Shopify flag
    var nonShopify = (state.answers.q5 !== 'shopify');
    document.querySelectorAll('.quiz-non-shopify-flag').forEach(function (el) {
      el.style.display = nonShopify ? 'block' : 'none';
    });

    showScreen(resultId);

    // Show contact block for all results except F
    if (resultId !== 'result-F') {
      var block = document.getElementById('quiz-contact');
      if (block) block.style.display = 'block';
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {

    // Start button
    var btnStart = document.getElementById('btnStart');
    if (btnStart) {
      btnStart.addEventListener('click', function () { showScreen('screen-q1'); });
    }

    // Wire all question screens
    wireQuestion('screen-q1', 'q1', 'q1-next', 'screen-q2');
    wireQuestion('screen-q2', 'q2', 'q2-next', 'screen-q3');
    wireQuestion('screen-q3', 'q3', 'q3-next', 'screen-q4');
    wireQuestion('screen-q4', 'q4', 'q4-next', 'screen-q5');
    wireQuestion('screen-q5', 'q5', 'q5-next', 'screen-email');

    // Back buttons via event delegation
    var wrap = document.getElementById('quizWrap');
    if (wrap) {
      wrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.quiz-btn-back');
        if (btn && btn.dataset.target) showScreen(btn.dataset.target);
      });
    }

    // Email gate
    var emailForm = document.getElementById('emailForm');
    if (emailForm) {
      emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = document.getElementById('quizEmail');
        var errorEl = document.getElementById('emailError');
        var email = input.value.trim();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errorEl.textContent = 'Please enter a valid email address.';
          input.focus();
          return;
        }

        errorEl.textContent = '';
        state.email = email;

        // Subscribe to Buttondown
        fetch('https://buttondown.com/api/emails/embed-subscribe/aronstein', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'email=' + encodeURIComponent(email)
        }).catch(function () {});

        // Notify data@mobile1st.com via Web3Forms
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: 'c3968343-152a-4c9e-be4c-9562f72b7d69',
            subject: 'Quiz email captured',
            email: email,
            quiz_answers: formatAnswers(state.answers)
          })
        }).catch(function () {});

        // Pre-fill contact form email
        var contactEmail = document.getElementById('contactEmail');
        if (contactEmail) contactEmail.value = email;

        state.result = determineResult(state.answers);
        showResult(state.result);
      });
    }

    // Contact form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // TODO: replace with your Buttondown API key (Settings → API keys in Buttondown)
        var BUTTONDOWN_API_KEY = 'ed1f79ab-26b4-41b7-9529-11cbad0c212f';
        var nameVal    = (document.getElementById('contactName')    || {}).value || '';
        var emailVal   = (document.getElementById('contactEmail')   || {}).value || '';
        var messageVal = (document.getElementById('contactMessage') || {}).value || '';
        var quizResult = state.result || 'unknown';

        // 1. Add subscriber to Buttondown with full context
        if (emailVal) {
          fetch('https://api.buttondown.email/v1/subscribers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + BUTTONDOWN_API_KEY
            },
            body: JSON.stringify({
              email: emailVal,
              notes: 'Name: ' + nameVal + '\nQuiz result: ' + quizResult + '\nMessage: ' + messageVal,
              tags: ['quiz-lead', quizResult]
            })
          }).catch(function () {});
        }

        // 2. Send email notification to data@mobile1st.com via Web3Forms
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: 'c3968343-152a-4c9e-be4c-9562f72b7d69',
            subject: 'Quiz lead: ' + (RESULT_LABELS[quizResult] || quizResult),
            name: nameVal,
            email: emailVal,
            message: messageVal,
            quiz_result: RESULT_LABELS[quizResult] || quizResult,
            quiz_answers: formatAnswers(state.answers)
          })
        }).catch(function () {});

        var successEl = document.getElementById('contactSuccess');
        if (successEl) successEl.style.display = 'block';
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
      });
    }

  });

})();
