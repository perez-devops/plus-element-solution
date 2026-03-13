/* ═══════════════════════════════════════════════════════════════
   PLUS ELEMENT SOLUTIONS — main.js
   Shared across all pages
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
      mobileMenu.classList.toggle('open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ── Scroll reveal via Intersection Observer
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // ── Mark active nav link based on current path
  const currentUrl = window.location.href.split(/[?#]/)[0].toLowerCase();
  const normalize = url => url.replace(/\/index\.html$/, '/').replace(/\/$/, '');
  const normCurrent = normalize(currentUrl);

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    link.removeAttribute('aria-current');
    const linkUrl = link.href.split(/[?#]/)[0].toLowerCase();
    const normLink = normalize(linkUrl);

    if (normCurrent === normLink) {
      link.setAttribute('aria-current', 'page');
    } 
    // Section match (for About, Services, Ideas)
    // Exclude Home link or any link that resolves to the origin/root from section-matching subpages
    else if (link.textContent.trim().toLowerCase() !== 'home') {
      if (normCurrent.startsWith(normLink + '/')) {
        link.setAttribute('aria-current', 'page');
      }
    }
  });

})();
