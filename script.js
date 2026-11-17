/* ============================================================
   MARGOT ELISE ROBBIE — shared behaviour
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');

  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Active nav state ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  /* ---------- Copy management email ---------- */
  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    var reset = function () {
      copyBtn.textContent = 'Copy email address';
      copyBtn.classList.remove('done');
    };
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.dataset.email;
      var done = function () {
        copyBtn.textContent = 'Copied ✓';
        copyBtn.classList.add('done');
        setTimeout(reset, 2200);
      };
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------- Enquiry form → management email ---------- */
  var form = document.getElementById('enquiryForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = (d.get('name') || '').toString().trim();
      var mail = (d.get('email') || '').toString().trim();
      var msg  = (d.get('message') || '').toString().trim();

      if (!name || !mail || !msg) {
        status.textContent = 'Please complete your name, email and enquiry before sending.';
        return;
      }

      var subject = 'Meet & Greet Enquiry — ' + name + ' — ' + d.get('type');
      var body = [
        'Name: '           + name,
        'Organisation: '   + (d.get('organisation') || '—'),
        'Email: '          + mail,
        'Preferred date: ' + (d.get('date') || 'Flexible'),
        'Engagement: '     + d.get('type'),
        '',
        'Enquiry:',
        msg,
        '',
        '— Sent via the Margot Elise Robbie private enquiry page.'
      ].join('\n');

      window.location.href = 'mailto:hollywoodmeetgreet@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body='    + encodeURIComponent(body);

      status.textContent = 'Opening your email client — please send the message to complete your enquiry.';
    });
  }

  /* ---------- Year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
