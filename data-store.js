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
     DEFAULT CONTENT — mirrors what's already on the site
  --------------------------------------------------------- */
  var DEFAULT_DATA = {
    theme: 'charcoal-orange',

    profile: {
      photo: 'photo/profile.JPG'
    },

    home: {
      eyebrow: "Java Web Developer · 4+ Years Experience",
      headline: "Building web experiences that work beautifully.",
      sub: "I build reliable, scalable, and modern web applications using Java, Spring Boot, REST APIs, databases, and modern frontend technologies.",
      availability: "Available for freelance & full-stack projects",
      floatingCard1Label: "Primary Stack",
      floatingCard1Value: "Java + Spring Boot",
      floatingCard2Label: "Project Status",
      floatingCard2Value: "Clean. Scalable. Shipped.",
      stats: [
        { value: 4, suffix: '+', label: 'Years Experience' },
        { value: 50, suffix: '+', label: 'Projects Delivered' },
        { value: 30, suffix: '+', label: 'Happy Clients' },
        { value: 99, suffix: '%', label: 'Commitment to Quality' }
      ],
      aboutPreviewText: "I'm Iftikar, a Java Web Developer focused on building practical, scalable, and high-quality web applications. I combine backend engineering with modern frontend development to create products that are reliable behind the scenes and intuitive for the people using them."
    },

    about: {
      heroLead: "I'm Iftikar, a Java Web Developer focused on building reliable, scalable, and practical web applications. I enjoy transforming ideas and complex requirements into clean digital products that solve real problems.",
      story: "My journey into web development began with curiosity about how websites and software actually work behind the scenes. What started as an interest in programming gradually became a passion for building complete digital products.\n\nOver time, I developed my skills across Java, backend development, databases, APIs, and frontend technologies. I became especially interested in the challenge of taking an idea or business requirement and turning it into a structured, functional application.\n\nToday, I focus on building reliable web applications using Java and Spring Boot, designing REST APIs, working with databases, and creating responsive user interfaces. I enjoy solving problems, improving systems, and writing code that is clean enough to be maintained and scalable enough to grow.\n\nWhat makes me different is that I do not focus only on writing code. I try to understand the problem first, then build a practical solution around the real needs of users and businesses. My goal is to turn complex requirements into software that feels simple, useful, and reliable."
    },

    services: [
      {
        id: 'svc-1',
        title: 'Java Web Development',
        price: 'From $800',
        description: 'Custom web applications built with Java and Spring Boot, focusing on clean architecture, maintainability, performance, and long-term scalability.',
        features: ['Java application development', 'Spring Boot applications', 'Spring MVC', 'Business logic implementation', 'Scalable backend architecture'],
        icon: 'java'
      },
      {
        id: 'svc-2',
        title: 'REST API Development',
        price: 'From $600',
        description: 'Reliable and structured REST APIs that allow web applications, mobile applications, databases, and external services to communicate efficiently.',
        features: ['RESTful API architecture', 'CRUD operations', 'Authentication & authorization', 'API integration', 'JSON-based communication', 'Error handling & validation'],
        icon: 'api'
      },
      {
        id: 'svc-3',
        title: 'Database & Backend Integration',
        price: 'From $500',
        description: 'Structured backend systems connected with reliable database architecture for applications that need secure, organized, and efficient data management.',
        features: ['MySQL', 'Database design', 'CRUD operations', 'Data relationships', 'Query optimization', 'Backend/database integration'],
        icon: 'database'
      },
      {
        id: 'svc-4',
        title: 'Frontend Development',
        price: 'From $450',
        description: 'Responsive and modern web interfaces that connect seamlessly with backend systems and provide users with a clean, intuitive experience.',
        features: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive design', 'API integration'],
        icon: 'frontend'
      }
    ],

    portfolioProjects: [
      {
        id: 'proj-1',
        number: '01',
        title: 'Business Management Platform',
        tags: 'Java · Spring Boot · MySQL · JavaScript',
        image: 'assets/project-01.svg',
        description: 'A complete business management platform designed to manage customers, employees, products, inventory, orders, and operational workflows.',
        overview: 'A complete business management platform designed to manage customers, employees, products, inventory, orders, and operational workflows from a single dashboard.',
        problem: 'The business relied on disconnected spreadsheets and manual processes to track customers, stock, and orders, leading to errors and slow reporting.',
        solution: 'Built a centralized Java and Spring Boot application backed by MySQL, giving staff a single reliable source of truth with role-based access and real-time updates.',
        features: ['Customer and employee management modules', 'Live inventory and stock tracking', 'Order processing with status workflows', 'Role-based dashboards and permissions', 'Exportable reports for operations and finance'],
        approach: 'Developed using a layered Spring Boot architecture (controller, service, repository) with clean separation of concerns, unit-tested business logic, and an iterative delivery process based on stakeholder feedback.',
        github: '#',
        demo: '#'
      },
      {
        id: 'proj-2',
        number: '02',
        title: 'Scalable API Architecture',
        tags: 'Java · Spring Boot · REST API · MySQL',
        image: 'assets/project-02.svg',
        description: 'A structured REST API architecture designed for secure communication between frontend applications, databases, and external services.',
        overview: 'A structured REST API architecture designed for secure communication between frontend applications, databases, and external services.',
        problem: 'Multiple client applications needed consistent, secure access to shared business data without duplicating logic across each frontend.',
        solution: 'Designed a versioned REST API layer with centralized authentication, validation, and error handling, so every client consumes the same reliable contract.',
        features: ['Token-based authentication and authorization', 'Versioned, documented REST endpoints', 'Centralized request validation and error handling', 'Database access layer optimized for performance', 'Structured logging for monitoring and debugging'],
        approach: 'Applied clean architecture principles to keep business logic independent from delivery mechanisms, with automated tests covering core endpoints before integration.',
        github: '#',
        demo: '#'
      },
      {
        id: 'proj-3',
        number: '03',
        title: 'Modern Commerce Experience',
        tags: 'Java · Spring Boot · MySQL · JavaScript',
        image: 'assets/project-03.svg',
        description: 'A responsive commerce application combining product management, order processing, customer workflows, and database integration.',
        overview: 'A responsive commerce application combining product management, order processing, customer workflows, and database integration.',
        problem: 'The client needed an online storefront that felt fast and modern while staying easy to manage on the backend as the catalog grew.',
        solution: 'Delivered a Spring Boot backend with a MySQL data layer paired with a responsive JavaScript frontend, covering the full path from browsing to checkout.',
        features: ['Product catalog with search and filtering', 'Cart and checkout workflow', 'Order history and customer accounts', 'Admin-side product and inventory management', 'Responsive layout across devices'],
        approach: 'Built iteratively, starting from the data model outward, with performance testing on catalog queries and a mobile-first frontend pass.',
        github: '#',
        demo: '#'
      },
      {
        id: 'proj-4',
        number: '04',
        title: 'Developer Productivity Tool',
        tags: 'Java · Spring Boot · JavaScript · MySQL',
        image: 'assets/project-04.svg',
        description: 'A web-based productivity solution designed to simplify repetitive workflows and provide users with a clean and efficient experience.',
        overview: 'A web-based productivity solution designed to simplify repetitive workflows and provide users with a clean and efficient experience.',
        problem: 'Team members were losing time to repetitive manual task tracking spread across disconnected tools and spreadsheets.',
        solution: 'Built a lightweight task and workflow board backed by Java and MySQL, letting teams track progress in one place with minimal setup.',
        features: ['Drag-and-drop task boards', 'Sprint and progress tracking', 'Team assignment and activity history', 'Lightweight REST API for integrations', 'Clean, distraction-free interface'],
        approach: 'Prioritized a minimal, fast interface first, then layered backend features incrementally based on real usage patterns from early testers.',
        github: '#',
        demo: '#'
      }
    ],

    awards: [
      {
        id: 'award-1',
        title: 'Certified Java Developer',
        issuer: 'Oracle',
        year: '2023',
        description: 'Professional certification validating core Java and object-oriented programming expertise.'
      },
      {
        id: 'award-2',
        title: 'Top Rated Freelance Developer',
        issuer: 'Freelance Platform',
        year: '2024',
        description: 'Recognized for consistently delivering reliable Java and Spring Boot projects on time.'
      }
    ],

    contact: {
      email: 'iftikarrahmancnpi@gmail.com',
      whatsapp: '',
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
