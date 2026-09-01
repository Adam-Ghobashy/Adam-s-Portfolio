/**
 * Adam Ghobashy Portfolio — script.js
 * Plain vanilla JS, no frameworks, no build step.
 */

(function () {
  'use strict';

  /* ============================================================
     SMOOTH SCROLL
     CSS scroll-behavior handles the animation; JS handles:
     - Closing the mobile menu on anchor click
     - Moving focus to the target section for a11y
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return; // skip placeholder hrefs
        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        closeMobileMenu();

        var prefersReduced =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        target.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start',
        });

        // Move focus for keyboard/screen reader users
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ============================================================
     MOBILE NAV — hamburger toggle
     ============================================================ */
  var hamburgerBtn = null;
  var mobileMenu = null;

  function initMobileNav() {
    hamburgerBtn = document.getElementById('hamburger-btn');
    mobileMenu = document.getElementById('mobile-menu');
    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', function () {
      mobileMenu.classList.contains('is-open')
        ? closeMobileMenu()
        : openMobileMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
        hamburgerBtn.focus();
      }
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    }
  }

  /* ============================================================
     CONTACT FORM — validation + success state
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    var successMsg = document.getElementById('contact-success');
    if (!form || !successMsg) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearFormErrors(form);

      var nameField    = document.getElementById('contact-name');
      var emailField   = document.getElementById('contact-email');
      var messageField = document.getElementById('contact-message');
      var isValid = true;

      if (!nameField.value.trim()) {
        showFieldError(nameField, 'Please enter your name.');
        isValid = false;
      }

      if (!emailField.value.trim()) {
        showFieldError(emailField, 'Please enter your email address.');
        isValid = false;
      } else if (!isValidEmail(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }

      if (!messageField.value.trim()) {
        showFieldError(messageField, 'Please write a message.');
        isValid = false;
      }

      if (!isValid) {
        // Focus the first errored field
        var firstError = form.querySelector('.is-error');
        if (firstError) firstError.focus();
        return;
      }

      // -------------------------------------------------------
      // TODO: connect to a form backend (e.g. Formspree/EmailJS)
      // or mailto: here. Example with Formspree:
      //
      //   fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST',
      //     headers: { 'Accept': 'application/json' },
      //     body: new FormData(form),
      //   })
      //   .then(function (res) {
      //     if (res.ok) { showSuccess(form, successMsg); }
      //     else { showFieldError(messageField, 'Something went wrong. Try again.'); }
      //   })
      //   .catch(function () {
      //     showFieldError(messageField, 'Network error. Please try again.');
      //   });
      //
      // For now, simulate a successful submission:
      // -------------------------------------------------------
      showSuccess(form, successMsg);
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showFieldError(field, message) {
    field.classList.add('is-error');
    field.setAttribute('aria-invalid', 'true');
    var errorEl = document.createElement('span');
    errorEl.classList.add('form-error-msg');
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;
    // Insert directly after the input
    field.insertAdjacentElement('afterend', errorEl);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.is-error').forEach(function (el) {
      el.classList.remove('is-error');
      el.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error-msg').forEach(function (el) {
      el.remove();
    });
  }

  function showSuccess(form, successMsg) {
    form.style.display = 'none';
    successMsg.classList.add('is-visible');
    // Move focus into the success banner for screen readers
    successMsg.setAttribute('tabindex', '-1');
    successMsg.focus({ preventScroll: true });
    form.reset();
  }

  /* ============================================================
     PROJECT IMAGES — graceful fallback on load error
     When an image fails to load:
       1. Mark its .project-card__thumb container with .img-error
       2. CSS hides the broken <img> (including its alt text chrome)
       3. CSS reveals the centered placeholder SVG instead
     Alt text remains in the DOM for screen readers regardless.
     ============================================================ */
  function initProjectImages() {
    document.querySelectorAll('.project-card__thumb img').forEach(function (img) {
      img.addEventListener('error', function () {
        var thumb = this.closest('.project-card__thumb');
        if (thumb) thumb.classList.add('img-error');
      });

      // Handle images that were already in error state before JS ran
      // (can happen if the script executes after the browser tried to load)
      if (img.complete && img.naturalWidth === 0) {
        var thumb = img.closest('.project-card__thumb');
        if (thumb) thumb.classList.add('img-error');
      }
    });
  }


  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScroll();
    initMobileNav();
    initContactForm();
    initProjectImages();
  });
})();
