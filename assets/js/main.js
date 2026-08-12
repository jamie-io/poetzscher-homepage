/* Christopher Pötzsch – Objektservice & Gebäudetechnik
   Kleines Skript ohne Abhängigkeiten: Navigation, Sticky-Header,
   Zähler, Einblend-Effekt, Formularversand per E-Mail. */
(function () {
  'use strict';

  /* --- Mobile Navigation -------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* --- Header-Schatten beim Scrollen -------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Einblenden + Zähler ------------------------------------------------ */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    if (reduced) { el.textContent = String(target); return; }

    var start = performance.now();
    var duration = 1400;
    (function frame(now) {
      var p = Math.min((now - start) / duration, 1);
      // sanftes Auslaufen
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        if (entry.target.hasAttribute('data-count')) countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, [data-count]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* --- Kontaktformular ----------------------------------------------------
     Ohne Server-Backend: Die Anfrage wird im E-Mail-Programm des Besuchers
     vorausgefüllt. Sobald ein Hoster mit PHP oder ein Formulardienst
     feststeht, hier stattdessen das action-Attribut des Formulars setzen
     und diesen Block entfernen.
     -------------------------------------------------------------------- */
  var form = document.querySelector('[data-mailto-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Honeypot: von Bots ausgefüllt, von Menschen nie.
      if (form.querySelector('[name="website"]').value !== '') {
        e.preventDefault();
        return;
      }
      e.preventDefault();

      var get = function (name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
      };

      var lines = [
        'Name: ' + get('name'),
        'E-Mail: ' + get('email'),
        'Telefon: ' + (get('phone') || '-'),
        'Objekt / Ort: ' + (get('location') || '-'),
        'Leistung: ' + get('service'),
        '',
        'Nachricht:',
        get('message'),
        '',
        '-- gesendet über die Website --'
      ];

      var subject = 'Anfrage über die Website: ' + (get('service') || 'Allgemein');
      window.location.href = 'mailto:' + form.dataset.mailtoForm +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      var note = form.querySelector('.form__status');
      if (note) {
        note.textContent = 'Ihr E-Mail-Programm wurde geöffnet. Bitte die Nachricht dort noch abschicken.';
      }
    });
  }

  /* --- Jahreszahl im Fußbereich ------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
