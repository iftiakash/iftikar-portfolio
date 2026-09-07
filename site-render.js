/* =========================================================
   IFTIKAR PORTFOLIO — SITE RENDERER
   Runs immediately (not deferred) once its <script> tag is
   reached near the end of <body>, so by the time script.js's
   DOMContentLoaded handlers run, all dynamic content already
   exists in the DOM.
   ========================================================= */

(function () {
  'use strict';

  var data = window.IftikarCMS.data;

  var ICONS = {
    java: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 3c-1 2-1 3.5 0 5.5S9 12 8 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 3c1 2 1 3.5 0 5.5S15 12 16 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 18c3 2 11 2 14 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6.5 21c2.5 1 8.5 1 11 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".6"/></svg>',
    api: '<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="5" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="5" r="2.4" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="19" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M7 6.3 10.3 17M17 6.3 13.7 17M7.4 5H16.6" stroke="currentColor" stroke-width="1.4"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="2.6" stroke="currentColor" stroke-width="1.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" stroke="currentColor" stroke-width="1.6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" stroke="currentColor" stroke-width="1.6"/></svg>',
    frontend: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="1.6" stroke="currentColor" stroke-width="1.6"/><path d="M8 21h8M12 16v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 9.5 9.5 12 7 14.5M13 14h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.6 5.8L21 9.8l-4.5 4.2L17.6 21 12 17.6 6.4 21l1.1-7-4.5-4.2 6.4-1z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
  };

  function esc(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function bindText() {
    document.querySelectorAll('[data-bind]').forEach(function (el) {
      var path = el.getAttribute('data-bind');
      var value = path.split('.').reduce(function (obj, key) { return obj && obj[key]; }, data);
      if (value !== undefined && value !== null) el.textContent = value;
    });
  }

  function bindImages() {
    document.querySelectorAll('[data-bind-src]').forEach(function (el) {
      var path = el.getAttribute('data-bind-src');
      var value = path.split('.').reduce(function (obj, key) { return obj && obj[key]; }, data);
      if (value) el.setAttribute('src', value);
    });
  }

  function bindLinks() {
    document.querySelectorAll('[data-bind-href]').forEach(function (el) {
      var path = el.getAttribute('data-bind-href');
      var value = path.split('.').reduce(function (obj, key) { return obj && obj[key]; }, data);
      if (value) el.setAttribute('href', path.indexOf('email') !== -1 ? 'mailto:' + value : value);
    });
  }

  /* ---------------------------------------------------------
     STATS (Home)
  --------------------------------------------------------- */
  function renderStats() {
    var nodes = document.querySelectorAll('[data-stat-index]');
    if (!nodes.length || !data.home || !data.home.stats) return;
    nodes.forEach(function (el) {
      var i = parseInt(el.getAttribute('data-stat-index'), 10);
      var stat = data.home.stats[i];
      if (!stat) return;
      var numberEl = el.querySelector('.stat__number');
      var labelEl = el.querySelector('.stat__label');
      if (numberEl) {
        numberEl.setAttribute('data-count-to', stat.value);
        numberEl.setAttribute('data-suffix', stat.suffix || '');
        numberEl.textContent = '0';
      }
      if (labelEl) labelEl.textContent = stat.label;
    });
  }

  /* ---------------------------------------------------------
     SERVICES — compact teaser (Home) + detail grid (Services)
  --------------------------------------------------------- */
  function renderServiceTeaser() {
    var grid = document.getElementById('servicesTeaserGrid');
    if (!grid || !data.services) return;
    grid.innerHTML = data.services.map(function (s) {
      return '' +
        '<article class="service-card" data-reveal>' +
          '<div class="service-card__icon" aria-hidden="true">' + (ICONS[s.icon] || ICONS.default) + '</div>' +
          '<h3 class="service-card__title">' + esc(s.title) + '</h3>' +
          '<p class="service-card__text">' + esc(s.description) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderServiceDetailGrid() {
    var grid = document.getElementById('serviceDetailGrid');
    if (!grid || !data.services) return;
    grid.innerHTML = data.services.map(function (s, i) {
      var num = String(i + 1).padStart(2, '0');
      return '' +
        '<article class="service-detail-card" data-reveal style="--i:' + i + '">' +
          '<div class="service-detail-card__top">' +
            '<span class="service-detail-card__number">' + num + '</span>' +
            '<div class="service-detail-card__icon" aria-hidden="true">' + (ICONS[s.icon] || ICONS.default) + '</div>' +
          '</div>' +
          '<h3 class="service-detail-card__title">' + esc(s.title) + '</h3>' +
          (s.price ? '<p class="service-detail-card__price">' + esc(s.price) + '</p>' : '') +
          '<p class="service-detail-card__text">' + esc(s.description) + '</p>' +
          '<ul class="service-detail-card__list">' + (s.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
          '<a href="contact.html" class="service-detail-card__cta">Explore Service <span class="arrow">↗</span></a>' +
        '</article>';
    }).join('');
  }

  /* ---------------------------------------------------------
     PORTFOLIO / FEATURED WORK (Home)
  --------------------------------------------------------- */
  function renderWorkGrid() {
    var grid = document.getElementById('workGrid');
    if (!grid || !data.portfolioProjects) return;
    grid.innerHTML = data.portfolioProjects.map(function (p, i) {
      return '' +
        '<article class="project-card" data-reveal data-project="' + i + '">' +
          '<div class="project-card__media">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' application mockup" loading="lazy">' +
            '<div class="project-card__overlay"><span>View Details <span class="arrow">↗</span></span></div>' +
          '</div>' +
          '<div class="project-card__body">' +
            '<span class="project-card__number">' + esc(p.number || String(i + 1).padStart(2, '0')) + '</span>' +
            '<h3 class="project-card__title">' + esc(p.title) + '</h3>' +
            '<p class="project-card__tags">' + esc(p.tags) + '</p>' +
            '<p class="project-card__text">' + esc(p.description) + '</p>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ---------------------------------------------------------
     ABOUT — story + awards
  --------------------------------------------------------- */
  function renderStory() {
    var container = document.getElementById('storyBlocks');
    if (!container || !data.about) return;
    var paragraphs = (data.about.story || '').split(/\n\s*\n/).filter(Boolean);
    container.innerHTML = paragraphs.map(function (p, i) {
      return '<div class="story__block" data-reveal style="--i:' + i + '"><p>' + esc(p) + '</p></div>';
    }).join('');
  }

  function renderAwards() {
    var container = document.getElementById('awardsGrid');
    if (!container) return;
    if (!data.awards || !data.awards.length) {
      container.innerHTML = '<p class="section-sub">Awards and achievements will appear here once added from the Admin Panel.</p>';
      return;
    }
    container.innerHTML = data.awards.map(function (a, i) {
      return '' +
        '<div class="award-card" data-reveal style="--i:' + i + '">' +
          '<span class="award-card__year">' + esc(a.year) + '</span>' +
          '<h3 class="award-card__title">' + esc(a.title) + '</h3>' +
          '<p class="award-card__issuer">' + esc(a.issuer) + '</p>' +
          (a.description ? '<p class="award-card__desc">' + esc(a.description) + '</p>' : '') +
        '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------
     CONTACT — info cards
  --------------------------------------------------------- */
  function renderContactInfo() {
    var container = document.getElementById('contactInfoList');
    if (!container || !data.contact) return;
    var c = data.contact;
    var whatsappHtml = c.whatsapp
      ? '<a class="contact-info-item" href="https://wa.me/' + esc(c.whatsapp.replace(/[^0-9]/g, '')) + '" target="_blank" rel="noopener">'
      : '<div class="contact-info-item">';
    var whatsappClose = c.whatsapp ? '</a>' : '</div>';

    container.innerHTML =
      '<div class="contact-info-item">' +
        '<div class="contact-info-item__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' +
        '<div><span class="contact-info-item__label">Email</span><p class="contact-info-item__value"><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></p></div>' +
      '</div>' +
      whatsappHtml +
        '<div class="contact-info-item__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 9.5c.3 2.3 2.7 4.7 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div>' +
        '<div><span class="contact-info-item__label">WhatsApp</span><p class="contact-info-item__value">' + esc(c.whatsapp || c.whatsappLabel || 'Available on request') + '</p></div>' +
      whatsappClose +
      '<a class="contact-info-item" href="' + esc(c.instagram) + '" target="_blank" rel="noopener">' +
        '<div class="contact-info-item__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="7" r="1" fill="currentColor"/></svg></div>' +
        '<div><span class="contact-info-item__label">Instagram</span><p class="contact-info-item__value">Visit Profile</p></div>' +
      '</a>' +
      '<a class="contact-info-item" href="' + esc(c.youtube) + '" target="_blank" rel="noopener">' +
        '<div class="contact-info-item__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor"/></svg></div>' +
        '<div><span class="contact-info-item__label">YouTube</span><p class="contact-info-item__value">Visit Channel</p></div>' +
      '</a>';
  }

  /* ---------------------------------------------------------
     FOOTER — social links + email (shared, every page)
  --------------------------------------------------------- */
  function renderFooterSocial() {
    var container = document.getElementById('footerSocial');
    if (!container || !data.contact) return;
    var c = data.contact;
    container.innerHTML =
      '<a href="' + esc(c.github) + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="' + esc(c.youtube) + '" target="_blank" rel="noopener">YouTube</a>' +
      '<a href="' + esc(c.facebook) + '" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>';
  }

  /* ---------------------------------------------------------
     RUN
  --------------------------------------------------------- */
  bindText();
  bindImages();
  bindLinks();
  renderStats();
  renderServiceTeaser();
  renderServiceDetailGrid();
  renderWorkGrid();
  renderStory();
  renderAwards();
  renderContactInfo();
  renderFooterSocial();

  // Expose the rendered project list for script.js's modal to consume.
  window.IftikarPortfolioProjects = data.portfolioProjects;

})();
