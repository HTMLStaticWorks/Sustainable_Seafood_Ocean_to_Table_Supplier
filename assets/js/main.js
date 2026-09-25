/**
 * TIDE & TRACE - Premium Sustainable Seafood
 * Vanilla JS Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     THEME (Light/Dark)
     ========================================================================== */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  /* ==========================================================================
     RTL TOGGLE
     ========================================================================== */
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  
  function setRTL(isRTL) {
    if (isRTL) {
      document.documentElement.dir = 'rtl';
      localStorage.setItem('rtl', 'true');
    } else {
      document.documentElement.dir = 'ltr';
      localStorage.setItem('rtl', 'false');
    }
  }

  const savedRTL = localStorage.getItem('rtl') === 'true';
  setRTL(savedRTL);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCurrentlyRTL = document.documentElement.dir === 'rtl';
      setRTL(!isCurrentlyRTL);
    });
  });

  /* ==========================================================================
     NAVIGATION & SIDEBAR
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  // Scrolled state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function toggleSidebar() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
  }

  const sidebarClose = document.querySelector('.sidebar-close');
  if (sidebarClose) {
    sidebarClose.addEventListener('click', toggleSidebar);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (sidebar && sidebar.classList.contains('active')) toggleSidebar();
      closeAllModals();
    }
  });

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     TIMELINE (TRACEABILITY) ANIMATION
     ========================================================================== */
  const timelines = document.querySelectorAll('.timeline');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.5 });
  
  timelines.forEach(tl => timelineObserver.observe(tl));

  /* ==========================================================================
     MODALS
     ========================================================================== */
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close], .modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    // Don't reset body overflow if sidebar is still open
    if (!sidebar || !sidebar.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      if (closeBtn.hasAttribute('data-modal-close') || e.target.classList.contains('modal-overlay')) {
        closeAllModals();
      }
    });
  });

  /* ==========================================================================
     PRODUCT FILTERS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Initialize active filter on load
  const initialActiveFilter = document.querySelector('[data-filter].active');
  if (initialActiveFilter) {
    initialActiveFilter.click();
  }

  /* ==========================================================================
     SPECIES EXPLORER (HOME)
     ========================================================================== */
  const speciesBtns = document.querySelectorAll('.species-btn');
  const speciesImage = document.getElementById('species-explorer-img');
  const speciesTitle = document.getElementById('species-explorer-title');
  const speciesDesc = document.getElementById('species-explorer-desc');
  const speciesSource = document.getElementById('species-explorer-source');
  
  if (speciesBtns.length > 0 && speciesImage) {
    speciesBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speciesBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        speciesImage.style.opacity = 0;
        
        setTimeout(() => {
          speciesImage.src = btn.getAttribute('data-img');
          speciesTitle.textContent = btn.getAttribute('data-title');
          speciesDesc.textContent = btn.getAttribute('data-desc');
          speciesSource.textContent = btn.getAttribute('data-source');
          speciesImage.style.opacity = 1;
        }, 300);
      });
    });
  }

  /* ==========================================================================
     TABS (AUTH)
     ========================================================================== */
  const tabBtns = document.querySelectorAll('[data-tab-target]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active', 'border-accent-main'));
      btn.classList.add('active', 'border-accent-main');

      const target = document.querySelector(btn.getAttribute('data-tab-target'));
      tabPanes.forEach(pane => pane.classList.add('hidden'));
      target.classList.remove('hidden');
    });
  });

  /* ==========================================================================
     FORM VALIDATION & SUBMISSION DEMO
     ========================================================================== */
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'PROCESSING...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = form.hasAttribute('data-auth') ? 'DEMO ACCOUNT CREATED' : 'ENQUIRY RECEIVED';
        submitBtn.classList.add('btn-success');
        submitBtn.style.backgroundColor = 'var(--c-sea-teal)';
        
        if (form.hasAttribute('data-auth')) {
          alert('This frontend demo does not create a real account.');
        }
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
          form.reset();
        }, 3000);
      }, 1500);
    });
  });
  /* ==========================================================================
     ACTIVE NAV LINKS
     ========================================================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  /* ==========================================================================
     BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
