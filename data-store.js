/* =========================================================
   IFTIKAR PORTFOLIO — DATA STORE
   Single source of truth for all admin-editable content.
   Loaded BEFORE styles render so the saved theme applies
   instantly with no flash. Loaded on every public page
   AND inside the Admin Panel.

   Persistence model (important, and explained to the site
   owner in plain language elsewhere):
   - All saved edits live in this browser's localStorage
     under the key "iftikarSiteData".
   - Any page open in THIS browser reflects changes the
     instant they're saved in the Admin Panel — no reload,
     no server needed.
   - Because this is a static site with no backend/database,
     localStorage is per-browser. To make edits visible to
     every visitor on the internet, use "Export Content" in
     the Admin Panel after saving, then re-upload the
     downloaded data.json file to your hosting so it becomes
     the new default for all visitors.
   ========================================================= */

(function (global) {
  'use strict';

  var STORAGE_KEY = 'iftikarSiteData';
  var AUTH_KEY = 'iftikarAdminAuth';
  var CREDS_KEY = 'iftikarAdminCreds';

  /* ---------------------------------------------------------
     DEFAULT CONTENT
  --------------------------------------------------------- */
  var DEFAULT_DATA = {
    theme: 'charcoal-orange',

    profile: {
      photo: 'photo/profile.jpg'
    },

    home: {
      eyebrow: "Backend Developer · 4+ Years Experience",
      headline: "Building web experiences that work beautifully.",
      sub: "I am a Computer Science and Engineering graduate. I build reliable web applications and APIs with Java, TypeScript, and databases.",
      availability: "Open to Master's study in Europe",
      floatingCard1Label: "Primary Stack",
      floatingCard1Value: "Java + Spring Boot",
      floatingCard2Label: "Degree",
      floatingCard2Value: "B.Sc. in CSE",
      stats: [
        { value: 4, suffix: '+', label: 'Years Experience' },
        { value: 3, suffix: '+', label: 'Projects Built' },
        { value: 1, suffix: '', label: "Bachelor's Degree in CSE" },
        { value: 10, suffix: '+', label: 'Technologies Used' }
      ],
      aboutPreviewText: "I am Iftikar, a backend developer from Bangladesh. Since December 2024 I work at Dhaka Post, where I build NestJS and TypeScript microservices with PostgreSQL, Redis, and Docker. I also build Java applications. I want to study for a Master's degree in Computer Science and bring my skills back to my country."
    },

    about: {
      heroLead: "I am Iftikar, a backend developer with a Bachelor's degree in Computer Science and Engineering. I build reliable web applications and APIs, and I want to keep growing through a Master's degree.",
      story: "I started programming because I wanted to understand how software works behind the screen. Over time this became my career. I have worked as a developer for almost four years, mostly with Java.\n\nSince December 2024 I work as a Backend Developer at Dhaka Post, part of the US-Bangla Group. There I build microservices with NestJS and TypeScript. I work with PostgreSQL, Redis caching, Docker, and JWT with role-based access control.\n\nOutside work I built my own projects: idalbd.com, a learning platform, a university management assistant app, and a web-based POS system. Building them taught me how to take an idea and turn it into a working product.\n\nMy goal is to work in the tech industry as a Java developer and to use what I learn to contribute to my home country. A Master's degree in Computer Science is my next step."
    },

    services: [
      {
        id: 'svc-1',
        title: 'Java Backend Development',
        description: 'Web applications built with Java and Spring Boot, with a focus on clean and maintainable code.',
        features: ['Java application development', 'Spring Boot', 'Spring MVC', 'Business logic', 'Layered architecture'],
        icon: 'java'
      },
      {
        id: 'svc-2',
        title: 'Microservices & APIs',
        description: 'REST APIs and microservices with NestJS and TypeScript, secured with JWT and role-based access control.',
        features: ['NestJS and TypeScript', 'RESTful API design', 'JWT authentication', 'Role-based access control', 'Validation and error handling'],
        icon: 'api'
      },
      {
        id: 'svc-3',
        title: 'Databases & Caching',
        description: 'Database design and caching to keep applications organized and fast.',
        features: ['PostgreSQL', 'MySQL', 'Redis caching', 'Database design', 'Query optimization'],
        icon: 'database'
      },
      {
        id: 'svc-4',
        title: 'Frontend Basics',
        description: 'Simple, responsive interfaces that connect to backend systems.',
        features: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'API integration'],
        icon: 'frontend'
      }
    ],

    portfolioProjects: [
      {
        id: 'proj-1',
        number: '01',
        title: 'idalbd.com',
        tags: 'Learning Platform · Web Application',
        image: 'photo/project1.jpg',
        description: 'A web-based learning platform.',
        overview: 'idalbd.com is a web-based learning platform that I built.',
        problem: 'Learners need one place to find and follow learning content online.',
        solution: 'I built a web platform that brings learning content together in one place.',
        features: ['Add your real features here'],
        approach: 'Add a short note on how you built it.',
        github: '#',
        demo: 'https://idalbd.com'
      },
      {
        id: 'proj-2',
        number: '02',
        title: 'University Management Assistant',
        tags: 'Application · Education',
        image: 'photo/project2.png',
        description: 'An app that helps manage university-related tasks and information.',
        overview: 'An application that helps manage university-related tasks and information.',
        problem: 'University information and tasks are often spread across many places.',
        solution: 'I built an assistant app that keeps this information in one place.',
        features: ['Add your real features here'],
        approach: 'Add a short note on how you built it.',
        github: '#',
        demo: '#'
      },
      {
        id: 'proj-3',
        number: '03',
        title: 'Web-Based POS System',
        tags: 'Point of Sale · Web Application',
        image: 'photo/project3.webp',
        description: 'A web-based point of sale system for handling sales.',
        overview: 'A web-based point of sale (POS) system for handling sales.',
        problem: 'Small shops need a simple way to record sales and manage products.',
        solution: 'I built a web POS system that records sales and manages products.',
        features: ['Add your real features here'],
        approach: 'Add a short note on how you built it.',
        github: '#',
        demo: '#'
      }
    ],

    awards: [],

    contact: {
      email: 'iftikarrahmancnpi@gmail.com',
      whatsapp: '8801795491465',
      whatsappLabel: 'Available on request',
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      instagram: 'https://instagram.com/',
      youtube: 'https://youtube.com/',
      facebook: 'https://facebook.com/'
    }
  };

  /* ---------------------------------------------------------
     THEME DEFINITIONS
     Each theme overrides the core CSS variables defined in
     styles.css :root. Surfaces are pre-tuned per theme so
     contrast stays premium rather than washed out.
  --------------------------------------------------------- */
  var THEMES = {
    'charcoal-orange': {
      name: 'Charcoal Orange',
      vars: {
        '--bg': '#0d0d0f', '--bg-elevated': '#131418', '--surface': '#17181d', '--surface-2': '#1c1e24',
        '--border': '#2a2c33', '--border-soft': '#232429',
        '--orange': '#ff7a29', '--orange-soft': 'rgba(255, 122, 41, 0.14)',
        '--blue': '#2fb8ff', '--blue-soft': 'rgba(47, 184, 255, 0.14)'
      }
    },
    'midnight-blue': {
      name: 'Midnight Blue',
      vars: {
        '--bg': '#070b16', '--bg-elevated': '#0d1322', '--surface': '#111a2e', '--surface-2': '#152038',
        '--border': '#233250', '--border-soft': '#1b2740',
        '--orange': '#3b82f6', '--orange-soft': 'rgba(59, 130, 246, 0.16)',
        '--blue': '#22d3ee', '--blue-soft': 'rgba(34, 211, 238, 0.16)'
      }
    },
    'slate-purple': {
      name: 'Slate Purple',
      vars: {
        '--bg': '#100e17', '--bg-elevated': '#161320', '--surface': '#1b1729', '--surface-2': '#211c32',
        '--border': '#33294a', '--border-soft': '#291f3c',
        '--orange': '#a78bfa', '--orange-soft': 'rgba(167, 139, 250, 0.16)',
        '--blue': '#38bdf8', '--blue-soft': 'rgba(56, 189, 248, 0.16)'
      }
    },
    'emerald-dark': {
      name: 'Emerald Dark',
      vars: {
        '--bg': '#0a120f', '--bg-elevated': '#0f1a15', '--surface': '#13201a', '--surface-2': '#182820',
        '--border': '#26402f', '--border-soft': '#1e3327',
        '--orange': '#34d399', '--orange-soft': 'rgba(52, 211, 153, 0.16)',
        '--blue': '#38bdf8', '--blue-soft': 'rgba(56, 189, 248, 0.16)'
      }
    }
  };

  /* ---------------------------------------------------------
     PERSISTENCE HELPERS
  --------------------------------------------------------- */
  function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function loadData() {
    var saved = null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch (e) { /* ignore corrupt storage */ }

    var data = deepClone(DEFAULT_DATA);
    if (saved && typeof saved === 'object') {
      Object.keys(saved).forEach(function (key) {
        data[key] = saved[key];
      });
    }
    return data;
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function applyTheme(themeKey) {
    var theme = THEMES[themeKey] || THEMES['charcoal-orange'];
    var root = document.documentElement;
    Object.keys(theme.vars).forEach(function (varName) {
      root.style.setProperty(varName, theme.vars[varName]);
    });
  }

  /* ---------------------------------------------------------
     AUTH HELPERS (client-side gate — see Admin Panel notes
     on the important limitations of this approach)
  --------------------------------------------------------- */
  function getCreds() {
    try {
      var raw = localStorage.getItem(CREDS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return { username: 'admin', password: 'Admin@123' };
  }

  function setCreds(username, password) {
    localStorage.setItem(CREDS_KEY, JSON.stringify({ username: username, password: password }));
  }

  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function login(username, password) {
    var creds = getCreds();
    if (username === creds.username && password === creds.password) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  /* ---------------------------------------------------------
     PUBLIC API
  --------------------------------------------------------- */
  var SiteData = loadData();

  global.IftikarCMS = {
    STORAGE_KEY: STORAGE_KEY,
    THEMES: THEMES,
    data: SiteData,
    getDefaultData: function () { return deepClone(DEFAULT_DATA); },
    save: function (data) { SiteData = data; saveData(data); global.IftikarCMS.data = data; },
    reload: function () { SiteData = loadData(); global.IftikarCMS.data = SiteData; return SiteData; },
    applyTheme: applyTheme,
    getCreds: getCreds,
    setCreds: setCreds,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout
  };

  // Apply the saved theme immediately, before first paint.
  applyTheme(SiteData.theme);

})(window);
