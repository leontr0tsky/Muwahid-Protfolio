/* ============================================================
   MUWAHID — PORTFOLIO
   script.js
============================================================ */

'use strict';


/* ============================================================
   FOOTER YEAR
============================================================ */

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}


/* ============================================================
   NAV — SCROLL STATE
   Adds `.scrolled` class to the header when the user
   has scrolled past 20px, enabling the frosted background.
============================================================ */

const navHeader = document.getElementById('nav-header');

function onScroll() {
  if (!navHeader) return;
  if (window.scrollY > 20) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // Run once on load in case page is already scrolled


/* ============================================================
   MOBILE MENU
============================================================ */

const hamburger  = document.getElementById('nav-hamburger');
const navLinks   = document.getElementById('nav-links');
let menuOpen     = false;

function openMenu() {
  menuOpen = true;
  navLinks.classList.add('mobile-open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  navLinks.classList.remove('mobile-open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuOpen) closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close if click lands outside the menu
  document.addEventListener('click', function (e) {
    if (menuOpen && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}


/* ============================================================
   SCROLL REVEAL
   IntersectionObserver triggers the `.visible` class on
   elements with the `.reveal` class as they enter the viewport.
============================================================ */

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0 && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once revealed — no repeated animation
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

} else {
  // Fallback: just show everything if IO isn't supported
  revealElements.forEach(function (el) {
    el.classList.add('visible');
  });
}


/* ============================================================
   STAGGERED REVEAL FOR GRIDS
   Cards in a grid reveal one-by-one with a slight delay
   so they don't all pop in at exactly the same moment.
============================================================ */

function applyStaggerDelay(selector, delayStep) {
  const items = document.querySelectorAll(selector);
  items.forEach(function (item, index) {
    item.style.transitionDelay = (index * (delayStep || 60)) + 'ms';
  });
}

applyStaggerDelay('.interest-card', 55);
applyStaggerDelay('.project-card', 80);
applyStaggerDelay('.focus-item',   40);


/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT
   Highlights the nav link corresponding to the section
   currently in view using IntersectionObserver.
============================================================ */

if ('IntersectionObserver' in window) {
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(function (anchor) {
            anchor.style.color = '';
            if (anchor.getAttribute('href') === '#' + id) {
              anchor.style.color = 'var(--text)';
            }
          });
        }
      });
    },
    {
      rootMargin: '-50% 0px -50% 0px',
      threshold:  0
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}
