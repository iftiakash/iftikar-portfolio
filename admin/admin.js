/* =========================================================
   IFTIKAR PORTFOLIO — ADMIN PANEL LOGIC
   ========================================================= */

(function () {
  'use strict';

  // ---------- AUTH GUARD ----------
  if (!window.IftikarCMS.isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }

  var CMS = window.IftikarCMS;
  // Working copy — edits happen here, only written to storage on Save.
  var data = JSON.parse(JSON.stringify(CMS.data));

  function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 9); }

  function showToast(message) {
    var toast = document.getElementById('adminToast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
  }

  function persist() {
    CMS.save(data);
  }

  /* ---------------------------------------------------------
     SIDEBAR NAVIGATION
  --------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.admin-nav__link');
  var panels = document.querySelectorAll('.admin-panel');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var target = link.getAttribute('data-panel');
      navLinks.forEach(function (l) { l.classList.remove('is-active'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });
      link.classList.add('is-active');
      document.querySelector('.admin-panel[data-panel="' + target + '"]').classList.add('is-active');
    });
  });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    CMS.logout();
    window.location.href = 'login.html';
  });

  /* ---------------------------------------------------------
     HOME PAGE PANEL
  --------------------------------------------------------- */
  function fillHomeForm() {
    document.getElementById('home-eyebrow').value = data.home.eyebrow || '';
    document.getElementById('home-headline').value = data.home.headline || '';
    document.getElementById('home-sub').value = data.home.sub || '';
    document.getElementById('home-availability').value = data.home.availability || '';
    document.getElementById('home-fc1-label').value = data.home.floatingCard1Label || '';
    document.getElementById('home-fc1-value').value = data.home.floatingCard1Value || '';
    document.getElementById('home-fc2-label').value = data.home.floatingCard2Label || '';
    document.getElementById('home-fc2-value').value = data.home.floatingCard2Value || '';
    document.getElementById('home-about-preview').value = data.home.aboutPreviewText || '';
    renderStatsFields();
  }

  function renderStatsFields() {
    var wrap = document.getElementById('statsFields');
    wrap.innerHTML = data.home.stats.map(function (s, i) {
      return '' +
        '<div class="admin-grid-2" style="margin-bottom:14px;">' +
          '<div class="admin-field"><label>Stat ' + (i + 1) + ' — number</label><input type="number" data-stat="' + i + '" data-field="value" value="' + s.value + '"></div>' +
          '<div class="admin-field"><label>Stat ' + (i + 1) + ' — label</label><input type="text" data-stat="' + i + '" data-field="label" value="' + s.label.replace(/"/g, '&quot;') + '"></div>' +
        '</div>';
    }).join('');

    wrap.querySelectorAll('input').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var i = parseInt(inp.getAttribute('data-stat'), 10);
        var field = inp.getAttribute('data-field');
        data.home.stats[i][field] = field === 'value' ? parseInt(inp.value, 10) || 0 : inp.value;
      });
    });
  }

  function readHomeForm() {
    data.home.eyebrow = document.getElementById('home-eyebrow').value;
    data.home.headline = document.getElementById('home-headline').value;
    data.home.sub = document.getElementById('home-sub').value;
    data.home.availability = document.getElementById('home-availability').value;
    data.home.floatingCard1Label = document.getElementById('home-fc1-label').value;
    data.home.floatingCard1Value = document.getElementById('home-fc1-value').value;
    data.home.floatingCard2Label = document.getElementById('home-fc2-label').value;
    data.home.floatingCard2Value = document.getElementById('home-fc2-value').value;
    data.home.aboutPreviewText = document.getElementById('home-about-preview').value;
  }

  /* ---------------------------------------------------------
     ABOUT PAGE PANEL
  --------------------------------------------------------- */
  function fillAboutForm() {
    document.getElementById('about-hero-lead').value = data.about.heroLead || '';
    document.getElementById('about-story').value = data.about.story || '';
  }

  function readAboutForm() {
    data.about.heroLead = document.getElementById('about-hero-lead').value;
    data.about.story = document.getElementById('about-story').value;
  }

  /* ---------------------------------------------------------
     SERVICES PANEL (CRUD + price)
  --------------------------------------------------------- */
  var ICON_OPTIONS = ['java', 'api', 'database', 'frontend', 'default'];

  function renderServices() {
    var wrap = document.getElementById('servicesList');
    wrap.innerHTML = data.services.map(function (s, i) {
      return '' +
        '<div class="admin-item" data-index="' + i + '">' +
          '<div class="admin-item__head">' +
            '<span class="admin-item__label">SERVICE ' + (i + 1) + '</span>' +
            '<button class="btn-admin btn-admin--danger btn-admin--sm" data-remove-service="' + i + '">Remove</button>' +
          '</div>' +
          '<div class="admin-grid-2">' +
            '<div class="admin-field"><label>Title</label><input type="text" data-svc="' + i + '" data-field="title" value="' + esc(s.title) + '"></div>' +
            '<div class="admin-field"><label>Price</label><input type="text" data-svc="' + i + '" data-field="price" value="' + esc(s.price) + '" placeholder="e.g. From $500"></div>' +
          '</div>' +
          '<div class="admin-field"><label>Description</label><textarea rows="2" data-svc="' + i + '" data-field="description">' + esc(s.description) + '</textarea></div>' +
          '<div class="admin-field"><label>Features (one per line)</label><textarea rows="4" data-svc="' + i + '" data-field="features">' + esc((s.features || []).join('\n')) + '</textarea></div>' +
          '<div class="admin-field"><label>Icon</label>' +
            '<select data-svc="' + i + '" data-field="icon">' +
              ICON_OPTIONS.map(function (opt) { return '<option value="' + opt + '"' + (s.icon === opt ? ' selected' : '') + '>' + opt + '</option>'; }).join('') +
            '</select>' +
          '</div>' +
        '</div>';
    }).join('') || '<p class="admin-panel__desc">No services yet. Click "+ Add Service" to create one.</p>';

    wrap.querySelectorAll('[data-svc]').forEach(function (el) {
      el.addEventListener('input', function () {
        var i = parseInt(el.getAttribute('data-svc'), 10);
        var field = el.getAttribute('data-field');
        if (field === 'features') {
          data.services[i][field] = el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
        } else {
          data.services[i][field] = el.value;
        }
      });
    });

    wrap.querySelectorAll('[data-remove-service]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-remove-service'), 10);
        if (confirm('Remove this service?')) {
          data.services.splice(i, 1);
          renderServices();
        }
      });
    });
  }

  document.getElementById('addServiceBtn').addEventListener('click', function () {
    data.services.push({ id: uid('svc'), title: 'New Service', price: '', description: '', features: [], icon: 'default' });
    renderServices();
  });

  /* ---------------------------------------------------------
     PORTFOLIO PANEL (CRUD + image upload)
  --------------------------------------------------------- */
  function renderPortfolio() {
    var wrap = document.getElementById('portfolioList');
    wrap.innerHTML = data.portfolioProjects.map(function (p, i) {
      return '' +
        '<div class="admin-item" data-index="' + i + '">' +
          '<div class="admin-item__head">' +
            '<span class="admin-item__label">PROJECT ' + (i + 1) + '</span>' +
            '<button class="btn-admin btn-admin--danger btn-admin--sm" data-remove-project="' + i + '">Remove</button>' +
          '</div>' +
          '<img class="admin-thumb" src="' + esc(p.image) + '" alt="">' +
          '<div class="admin-field"><label>Replace thumbnail</label><input type="file" accept="image/*" data-proj-img="' + i + '"></div>' +
          '<div class="admin-grid-2">' +
            '<div class="admin-field"><label>Title</label><input type="text" data-proj="' + i + '" data-field="title" value="' + esc(p.title) + '"></div>' +
            '<div class="admin-field"><label>Technology tags</label><input type="text" data-proj="' + i + '" data-field="tags" value="' + esc(p.tags) + '"></div>' +
          '</div>' +
          '<div class="admin-field"><label>Short description (shown on card)</label><textarea rows="2" data-proj="' + i + '" data-field="description">' + esc(p.description) + '</textarea></div>' +
          '<div class="admin-field"><label>Overview</label><textarea rows="2" data-proj="' + i + '" data-field="overview">' + esc(p.overview) + '</textarea></div>' +
          '<div class="admin-field"><label>Problem</label><textarea rows="2" data-proj="' + i + '" data-field="problem">' + esc(p.problem) + '</textarea></div>' +
          '<div class="admin-field"><label>Solution</label><textarea rows="2" data-proj="' + i + '" data-field="solution">' + esc(p.solution) + '</textarea></div>' +
          '<div class="admin-field"><label>Main features (one per line)</label><textarea rows="4" data-proj="' + i + '" data-field="features">' + esc((p.features || []).join('\n')) + '</textarea></div>' +
          '<div class="admin-field"><label>Development approach</label><textarea rows="2" data-proj="' + i + '" data-field="approach">' + esc(p.approach) + '</textarea></div>' +
          '<div class="admin-grid-2">' +
            '<div class="admin-field"><label>GitHub URL (optional)</label><input type="text" data-proj="' + i + '" data-field="github" value="' + esc(p.github) + '"></div>' +
            '<div class="admin-field"><label>Live Demo URL (optional)</label><input type="text" data-proj="' + i + '" data-field="demo" value="' + esc(p.demo) + '"></div>' +
          '</div>' +
        '</div>';
    }).join('') || '<p class="admin-panel__desc">No projects yet. Click "+ Add Project" to create one.</p>';

    wrap.querySelectorAll('[data-proj]').forEach(function (el) {
      el.addEventListener('input', function () {
        var i = parseInt(el.getAttribute('data-proj'), 10);
        var field = el.getAttribute('data-field');
        if (field === 'features') {
          data.portfolioProjects[i][field] = el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
        } else {
          data.portfolioProjects[i][field] = el.value;
        }
      });
    });

    wrap.querySelectorAll('[data-proj-img]').forEach(function (input) {
      input.addEventListener('change', function () {
        var i = parseInt(input.getAttribute('data-proj-img'), 10);
        var file = input.files[0];
        if (!file) return;
        fileToDataURL(file, function (dataUrl) {
          data.portfolioProjects[i].image = dataUrl;
          renderPortfolio();
        });
      });
    });

    wrap.querySelectorAll('[data-remove-project]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-remove-project'), 10);
        if (confirm('Remove this project?')) {
          data.portfolioProjects.splice(i, 1);
          renderPortfolio();
        }
      });
    });
  }

  document.getElementById('addProjectBtn').addEventListener('click', function () {
    var n = data.portfolioProjects.length + 1;
    data.portfolioProjects.push({
      id: uid('proj'), number: String(n).padStart(2, '0'), title: 'New Project', tags: '',
      image: 'assets/project-01.svg', description: '', overview: '', problem: '', solution: '',
      features: [], approach: '', github: '#', demo: '#'
    });
    renderPortfolio();
  });

  /* ---------------------------------------------------------
     AWARDS PANEL (CRUD)
  --------------------------------------------------------- */
  function renderAwards() {
    var wrap = document.getElementById('awardsList');
    wrap.innerHTML = data.awards.map(function (a, i) {
      return '' +
        '<div class="admin-item" data-index="' + i + '">' +
          '<div class="admin-item__head">' +
            '<span class="admin-item__label">AWARD ' + (i + 1) + '</span>' +
            '<button class="btn-admin btn-admin--danger btn-admin--sm" data-remove-award="' + i + '">Remove</button>' +
          '</div>' +
          '<div class="admin-grid-2">' +
            '<div class="admin-field"><label>Title</label><input type="text" data-award="' + i + '" data-field="title" value="' + esc(a.title) + '"></div>' +
            '<div class="admin-field"><label>Issuer</label><input type="text" data-award="' + i + '" data-field="issuer" value="' + esc(a.issuer) + '"></div>' +
          '</div>' +
          '<div class="admin-field"><label>Year</label><input type="text" data-award="' + i + '" data-field="year" value="' + esc(a.year) + '"></div>' +
          '<div class="admin-field"><label>Description</label><textarea rows="2" data-award="' + i + '" data-field="description">' + esc(a.description) + '</textarea></div>' +
        '</div>';
    }).join('') || '<p class="admin-panel__desc">No awards yet. Click "+ Add Award" to create one.</p>';

    wrap.querySelectorAll('[data-award]').forEach(function (el) {
      el.addEventListener('input', function () {
        var i = parseInt(el.getAttribute('data-award'), 10);
        var field = el.getAttribute('data-field');
        data.awards[i][field] = el.value;
      });
    });

    wrap.querySelectorAll('[data-remove-award]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = parseInt(btn.getAttribute('data-remove-award'), 10);
        if (confirm('Remove this award?')) {
          data.awards.splice(i, 1);
          renderAwards();
        }
      });
    });
  }

  document.getElementById('addAwardBtn').addEventListener('click', function () {
    data.awards.push({ id: uid('award'), title: 'New Award', issuer: '', year: String(new Date().getFullYear()), description: '' });
    renderAwards();
  });

  /* ---------------------------------------------------------
     CONTACT PANEL
  --------------------------------------------------------- */
  function fillContactForm() {
    document.getElementById('contact-email').value = data.contact.email || '';
    document.getElementById('contact-whatsapp').value = data.contact.whatsapp || '';
    document.getElementById('contact-github').value = data.contact.github || '';
    document.getElementById('contact-linkedin').value = data.contact.linkedin || '';
    document.getElementById('contact-instagram').value = data.contact.instagram || '';
    document.getElementById('contact-youtube').value = data.contact.youtube || '';
    document.getElementById('contact-facebook').value = data.contact.facebook || '';
  }

  function readContactForm() {
    data.contact.email = document.getElementById('contact-email').value;
    data.contact.whatsapp = document.getElementById('contact-whatsapp').value;
    data.contact.github = document.getElementById('contact-github').value;
    data.contact.linkedin = document.getElementById('contact-linkedin').value;
    data.contact.instagram = document.getElementById('contact-instagram').value;
    data.contact.youtube = document.getElementById('contact-youtube').value;
    data.contact.facebook = document.getElementById('contact-facebook').value;
  }

  /* ---------------------------------------------------------
     IMAGES PANEL
  --------------------------------------------------------- */
  function fillImagesPanel() {
    document.getElementById('profilePhotoPreview').src = data.profile.photo;
  }

  document.getElementById('profilePhotoInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    fileToDataURL(file, function (dataUrl) {
      data.profile.photo = dataUrl;
      document.getElementById('profilePhotoPreview').src = dataUrl;
    });
  });

  function fileToDataURL(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) { callback(e.target.result); };
    reader.readAsDataURL(file);
  }

  /* ---------------------------------------------------------
     THEME PANEL
  --------------------------------------------------------- */
  function renderThemeGrid() {
    var grid = document.getElementById('themeGrid');
    var keys = Object.keys(CMS.THEMES);
    grid.innerHTML = keys.map(function (key) {
      var theme = CMS.THEMES[key];
      var active = data.theme === key;
      return '' +
        '<button class="theme-swatch' + (active ? ' is-active' : '') + '" data-theme="' + key + '">' +
          '<div class="theme-swatch__preview">' +
            '<span class="theme-swatch__dot" style="background:' + theme.vars['--bg'] + '"></span>' +
            '<span class="theme-swatch__dot" style="background:' + theme.vars['--orange'] + '"></span>' +
            '<span class="theme-swatch__dot" style="background:' + theme.vars['--blue'] + '"></span>' +
          '</div>' +
          '<span class="theme-swatch__name">' + theme.name + '</span>' +
        '</button>';
    }).join('');

    grid.querySelectorAll('[data-theme]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-theme');
        data.theme = key;
        CMS.applyTheme(key); // instant preview in the admin panel itself
        persist(); // theme changes go live immediately, site-wide, in this browser
        renderThemeGrid();
        showToast(CMS.THEMES[key].name + ' theme is now live.');
      });
    });
  }

  /* ---------------------------------------------------------
     ACCOUNT & SECURITY
  --------------------------------------------------------- */
  document.getElementById('saveAccountBtn').addEventListener('click', function () {
    var errorBox = document.getElementById('accError');
    var successBox = document.getElementById('accSuccess');
    errorBox.classList.remove('is-visible');
    successBox.classList.remove('is-visible');

    var current = document.getElementById('acc-current').value;
    var newUser = document.getElementById('acc-username').value.trim();
    var newPass = document.getElementById('acc-password').value;
    var creds = CMS.getCreds();

    if (current !== creds.password) {
      errorBox.textContent = 'Current password is incorrect.';
      errorBox.classList.add('is-visible');
      return;
    }
    if (!newUser || !newPass || newPass.length < 6) {
      errorBox.textContent = 'Please provide a username and a password of at least 6 characters.';
      errorBox.classList.add('is-visible');
      return;
    }

    CMS.setCreds(newUser, newPass);
    successBox.textContent = 'Login updated. Use your new username and password next time you log in.';
    successBox.classList.add('is-visible');
    document.getElementById('acc-current').value = '';
    document.getElementById('acc-username').value = '';
    document.getElementById('acc-password').value = '';
  });

  /* ---------------------------------------------------------
     BACKUP / EXPORT / IMPORT / RESET
  --------------------------------------------------------- */
  document.getElementById('exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'site-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  document.getElementById('importInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (evt) {
      try {
        var parsed = JSON.parse(evt.target.result);
        data = parsed;
        persist();
        showToast('Content imported successfully.');
        renderAll();
      } catch (err) {
        alert('That file could not be read. Please choose a valid exported site-data.json file.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('This will erase every edit made in this browser and restore the original defaults. Continue?')) {
      data = CMS.getDefaultData();
      persist();
      renderAll();
      showToast('Reset to defaults.');
    }
  });

  /* ---------------------------------------------------------
     SAVE BUTTONS
  --------------------------------------------------------- */
  document.querySelectorAll('[data-save]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.getAttribute('data-save');
      if (section === 'home') readHomeForm();
      if (section === 'about') readAboutForm();
      if (section === 'contact') readContactForm();
      // services / portfolio / awards / images are already kept in sync live via input listeners
      persist();
      showToast('Saved — live on this browser now.');
    });
  });

  function esc(str) {
    if (str == null) return '';
    var div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML.replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------
     INITIAL RENDER
  --------------------------------------------------------- */
  function renderAll() {
    fillHomeForm();
    fillAboutForm();
    renderServices();
    renderPortfolio();
    renderAwards();
    fillContactForm();
    fillImagesPanel();
    renderThemeGrid();
  }

  renderAll();

})();
