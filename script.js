/* =========================================================
   IFTIKAR PORTFOLIO — SCRIPT
   Vanilla JS, no dependencies.
   Sections: Nav · Scroll Reveal · Counters · Project Modal ·
   Testimonial Slider · Contact Form Validation
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     NAVIGATION — scrolled state + mobile menu
  --------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navBurger.classList.toggle('is-open', isOpen);
    navBurger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navBurger.classList.remove('is-open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL — Intersection Observer
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------
     STAT COUNTERS — animate on scroll into view
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-count-to]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------------------------------------------------
     SKILL BARS — animate fill on scroll into view (About page)
  --------------------------------------------------------- */
  const skillBars = document.querySelectorAll('[data-skill]');

  if ('IntersectionObserver' in window && skillBars.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-skill');
          entry.target.style.width = target + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillBars.forEach(el => skillObserver.observe(el));
  } else {
    skillBars.forEach(el => { el.style.width = el.getAttribute('data-skill') + '%'; });
  }

  /* ---------------------------------------------------------
     PROJECT DATA — powers the details modal.
     Sourced live from the CMS (data-store.js + site-render.js)
     so Admin Panel edits appear here automatically. Falls back
     to this static copy only if the CMS scripts aren't loaded.
  --------------------------------------------------------- */
  const projectData = (window.IftikarPortfolioProjects && window.IftikarPortfolioProjects.length)
    ? window.IftikarPortfolioProjects.map(p => ({
        number: p.number, title: p.title, image: p.image, tech: p.tags,
        overview: p.overview, problem: p.problem, solution: p.solution,
        features: p.features, approach: p.approach, github: p.github, demo: p.demo
      }))
    : [
    {
      number: '01',
      title: 'Business Management Platform',
      image: 'assets/project-01.svg',
      tech: 'Java · Spring Boot · MySQL · JavaScript',
      overview: 'A complete business management platform designed to manage customers, employees, products, inventory, orders, and operational workflows from a single dashboard.',
      problem: 'The business relied on disconnected spreadsheets and manual processes to track customers, stock, and orders, leading to errors and slow reporting.',
      solution: 'Built a centralized Java and Spring Boot application backed by MySQL, giving staff a single reliable source of truth with role-based access and real-time updates.',
      features: [
        'Customer and employee management modules',
        'Live inventory and stock tracking',
        'Order processing with status workflows',
        'Role-based dashboards and permissions',
        'Exportable reports for operations and finance'
      ],
      approach: 'Developed using a layered Spring Boot architecture (controller, service, repository) with clean separation of concerns, unit-tested business logic, and an iterative delivery process based on stakeholder feedback.',
      github: '#',
      demo: '#'
    },
    {
      number: '02',
      title: 'Scalable API Architecture',
      image: 'assets/project-02.svg',
      tech: 'Java · Spring Boot · REST API · MySQL',
      overview: 'A structured REST API architecture designed for secure communication between frontend applications, databases, and external services.',
      problem: 'Multiple client applications needed consistent, secure access to shared business data without duplicating logic across each frontend.',
      solution: 'Designed a versioned REST API layer with centralized authentication, validation, and error handling, so every client consumes the same reliable contract.',
      features: [
        'Token-based authentication and authorization',
        'Versioned, documented REST endpoints',
        'Centralized request validation and error handling',
        'Database access layer optimized for performance',
        'Structured logging for monitoring and debugging'
      ],
      approach: 'Applied clean architecture principles to keep business logic independent from delivery mechanisms, with automated tests covering core endpoints before integration.',
      github: '#',
      demo: '#'
    },
    {
      number: '03',
      title: 'Modern Commerce Experience',
      image: 'assets/project-03.svg',
      tech: 'Java · Spring Boot · MySQL · JavaScript',
      overview: 'A responsive commerce application combining product management, order processing, customer workflows, and database integration.',
      problem: 'The client needed an online storefront that felt fast and modern while staying easy to manage on the backend as the catalog grew.',
      solution: 'Delivered a Spring Boot backend with a MySQL data layer paired with a responsive JavaScript frontend, covering the full path from browsing to checkout.',
      features: [
        'Product catalog with search and filtering',
        'Cart and checkout workflow',
        'Order history and customer accounts',
        'Admin-side product and inventory management',
        'Responsive layout across devices'
      ],
      approach: 'Built iteratively, starting from the data model outward, with performance testing on catalog queries and a mobile-first frontend pass.',
      github: '#',
      demo: '#'
    },
    {
      number: '04',
      title: 'Developer Productivity Tool',
      image: 'assets/project-04.svg',
      tech: 'Java · Spring Boot · JavaScript · MySQL',
      overview: 'A web-based productivity solution designed to simplify repetitive workflows and provide users with a clean and efficient experience.',
      problem: 'Team members were losing time to repetitive manual task tracking spread across disconnected tools and spreadsheets.',
      solution: 'Built a lightweight task and workflow board backed by Java and MySQL, letting teams track progress in one place with minimal setup.',
      features: [
        'Drag-and-drop task boards',
        'Sprint and progress tracking',
        'Team assignment and activity history',
        'Lightweight REST API for integrations',
        'Clean, distraction-free interface'
      ],
      approach: 'Prioritized a minimal, fast interface first, then layered backend features incrementally based on real usage patterns from early testers.',
      github: '#',
      demo: '#'
    }
  ];

  /* ---------------------------------------------------------
     PROJECT MODAL
  --------------------------------------------------------- */
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalNumber = document.getElementById('modalNumber');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalTech = document.getElementById('modalTech');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalApproach = document.getElementById('modalApproach');
  const modalGithub = document.getElementById('modalGithub');
  const modalDemo = document.getElementById('modalDemo');

  let lastFocusedEl = null;

  const openModal = (index) => {
    const p = projectData[index];
    if (!p) return;

    modalImage.src = p.image;
    modalImage.alt = p.title + ' — full project preview';
    modalNumber.textContent = 'Project ' + p.number;
    modalTitle.textContent = p.title;
    modalOverview.textContent = p.overview;
    modalProblem.textContent = p.problem;
    modalSolution.textContent = p.solution;
    modalTech.textContent = p.tech;
    modalApproach.textContent = p.approach;
    modalFeatures.innerHTML = '';
    p.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      modalFeatures.appendChild(li);
    });
    modalGithub.href = p.github;
    modalDemo.href = p.demo;

    lastFocusedEl = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-project'), 10);
      openModal(index);
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(card.getAttribute('data-project'), 10);
        openModal(index);
      }
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------------------------------------------------
     TESTIMONIAL SLIDER — autoplay + manual controls
  --------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const slides = track ? Array.from(track.children) : [];
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  let current = 0;
  let autoplayTimer = null;

  const renderDots = () => {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === current) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  };

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    track.style.transition = 'transform .6s cubic-bezier(.22,.68,0,1)';
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('is-active', i === current));
    restartAutoplay();
  };

  const restartAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goTo(current + 1), 5000);
  };

  if (slides.length) {
    renderDots();
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    restartAutoplay();

    // basic touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) diff < 0 ? goTo(current + 1) : goTo(current - 1);
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     CONTACT FORM — frontend validation
  --------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  const validators = {
    'cf-name': (v) => v.trim().length >= 2 || 'Please enter your name.',
    'cf-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    'cf-type': (v) => v.trim().length > 0 || 'Please select a project type.',
    'cf-budget': (v) => v.trim().length > 0 || 'Please select a budget range.',
    'cf-message': (v) => v.trim().length >= 10 || 'Please add a few details about your project (10+ characters).'
  };

  const setFieldError = (field, message) => {
    const row = field.closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${field.id}"]`);
    if (message) {
      row.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      row.classList.remove('has-error');
      errorEl.textContent = '';
    }
  };

  const validateField = (field) => {
    const rule = validators[field.id];
    if (!rule) return true;
    const result = rule(field.value);
    if (result === true) {
      setFieldError(field, '');
      return true;
    }
    setFieldError(field, result);
    return false;
  };

  if (form) {
    Object.keys(validators).forEach(id => {
      const field = document.getElementById(id);
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-row').classList.contains('has-error')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      Object.keys(validators).forEach(id => {
        const field = document.getElementById(id);
        if (field && !validateField(field)) isValid = false;
      });

      if (isValid) {
        const submitBtn = form.querySelector('.form-submit');
        submitBtn.classList.add('is-loading');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
          submitBtn.classList.remove('is-loading');
          submitBtn.textContent = originalText;
          successMsg.classList.add('is-visible');
          form.reset();
          setTimeout(() => successMsg.classList.remove('is-visible'), 6000);
        }, 700);
      } else {
        successMsg.classList.remove('is-visible');
        const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) firstError.focus();
      }
    });
  }

});
