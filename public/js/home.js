/**
 * home.js — Clean Logic main page interactions
 * Vanilla JS, no dependencies
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. DOM helpers
     ========================================================================== */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ==========================================================================
     2. Page reveal on first load
     ========================================================================== */
  function initPageReveal() {
    var isBot = /bot|google|yandex|baidu|bing|msn|duckduckbot|teoma|slurp|crawler|spider|robot|crawling|facebook/i.test(navigator.userAgent);
    if (!isBot && typeof sessionStorage !== 'undefined' && document.visibilityState) {
      if (sessionStorage.getItem('visited') !== 'y') {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease-in-out';
        setTimeout(function () {
          document.body.style.opacity = '1';
          sessionStorage.setItem('visited', 'y');
        }, 50);
      }
    }
  }

  /* ==========================================================================
     3. Header scroll behaviour
     ========================================================================== */
  function initHeaderScroll() {
    var header = $('#site-header');
    if (!header) return;

    var onScroll = function () {
      if (window.scrollY > 10) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     4. Mobile menu
     ========================================================================== */
  function initMobileMenu() {
    var burger  = $('#burger-btn');
    var menu    = $('#mobile-menu');
    var close   = $('#menu-close');
    var backdrop = $('#menu-backdrop');
    if (!burger || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (close) close.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    $$('a', menu).forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ==========================================================================
     5. Smooth scroll for anchor links
     ========================================================================== */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      // Skip popup triggers and empty hashes
      if (!href || href === '#' || href.indexOf('#popup:') === 0 || href.indexOf('#zeropopup') === 0) return;

      var id = href.slice(1);
      var target = document.getElementById(id);
      if (!target) {
        // Try <a name="..."> anchors
        target = $('a[name="' + id + '"]') || $('[name="' + id + '"]');
      }
      if (!target) return;

      e.preventDefault();
      var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '80', 10);
      var top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     6. Room type switcher ("What we clean")
     ========================================================================== */
  function initRoomSwitcher() {
    var container = $('.what-we-clean');
    if (!container) return;

    // Room tabs (Kitchen / Room / Bathroom / Hall)
    $$('.what-we-clean__tab', container).forEach(function (tab) {
      tab.addEventListener('click', function () {
        var room = this.dataset.room;

        // Update room tab active state
        $$('.what-we-clean__tab', container).forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');

        // Show/hide slides
        $$('.what-we-clean__slide', container).forEach(function (slide) {
          if (slide.dataset.room === room) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });
      });
    });

    // Type tabs (Supportive / General) — one per slide
    $$('.what-we-clean__slide', container).forEach(function (slide) {
      $$('.what-we-clean__type-tab', slide).forEach(function (typeTab) {
        typeTab.addEventListener('click', function () {
          var type = this.dataset.type;

          $$('.what-we-clean__type-tab', slide).forEach(function (t) {
            t.classList.remove('is-active');
          });
          this.classList.add('is-active');

          $$('.what-we-clean__panel', slide).forEach(function (panel) {
            if (panel.id === type) {
              panel.classList.add('is-active');
            } else {
              panel.classList.remove('is-active');
            }
          });
        });
      });
    });
  }

  /* ==========================================================================
     7. FAQ accordion (one open at a time)
     ========================================================================== */
  function initFaq() {
    var items = $$('.faq__item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = $('.faq__trigger', item);
      var answer  = $('.faq__answer', item);
      if (!trigger || !answer) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(function (i) {
          i.classList.remove('is-open');
          var t = $('.faq__trigger', i);
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==========================================================================
     8. Popups (dialog API)
     ========================================================================== */
  function initPopups() {
    // Open
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.js-popup-trigger');
      if (!trigger) return;

      e.preventDefault();
      var popupId = trigger.dataset.popup;
      var popup   = document.getElementById(popupId);
      if (popup && typeof popup.showModal === 'function') {
        popup.showModal();
        document.body.style.overflow = 'hidden';
      }
    });

    // Handle legacy href="#zeropopup228" and "#popup:myform" links
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href="#zeropopup228"]');
      if (link) {
        e.preventDefault();
        var popup = document.getElementById('services-popup');
        if (popup && typeof popup.showModal === 'function') {
          popup.showModal();
          document.body.style.overflow = 'hidden';
        }
        return;
      }

      var myformLink = e.target.closest('a[href="#popup:myform"]');
      if (myformLink) {
        e.preventDefault();
        var incPopup = document.getElementById('incident-popup');
        if (incPopup && typeof incPopup.showModal === 'function') {
          incPopup.showModal();
          document.body.style.overflow = 'hidden';
        }
      }
    });

    // Close via × button
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-popup-close');
      if (!btn) return;
      var dialog = btn.closest('dialog');
      if (dialog) {
        dialog.close();
        document.body.style.overflow = '';
      }
    });

    // Close on backdrop click
    document.addEventListener('click', function (e) {
      if (e.target.tagName === 'DIALOG') {
        e.target.close();
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     9. Work gallery (masonry + lightbox)
     ========================================================================== */
  function initWorkGallery() {
    var gallery = $('[data-gallery]');
    var lightbox = $('[data-gallery-lightbox]');
    if (!gallery || !lightbox) return;

    var section = gallery.closest('.work-gallery');
    var mobileWrap = section ? $('[data-gallery-mobile-wrap]', section) : null;
    var mobileControls = section ? $('[data-gallery-mobile-controls]', section) : null;
    var expandBtn = section ? $('[data-gallery-expand]', section) : null;
    var collapseBtn = section ? $('[data-gallery-collapse]', section) : null;
    var items = $$('.work-gallery__item', gallery);
    var stage = $('[data-gallery-stage]', lightbox);
    var closeBtn = $('[data-gallery-close]', lightbox);
    var prevBtn = $('[data-gallery-prev]', lightbox);
    var nextBtn = $('[data-gallery-next]', lightbox);
    var lightboxWebp = $('[data-gallery-lightbox-webp]', lightbox);
    var lightboxImage = $('[data-gallery-image]', lightbox);
    var activeIndex = 0;
    var lastFocused = null;
    var touchStartX = 0;

    if (!items.length || !stage || !closeBtn || !prevBtn || !nextBtn || !lightboxImage || !lightboxWebp) return;

    function resizeMasonry() {
      var row = parseFloat(getComputedStyle(gallery).getPropertyValue('--gallery-row')) || 8;
      var gap = parseFloat(getComputedStyle(gallery).getPropertyValue('--gallery-gap')) || 14;

      items.forEach(function (item) {
        if (item.offsetParent === null) return;
        var img = $('img', item);
        if (!img || !img.complete || !img.naturalWidth) return;

        var height = img.getBoundingClientRect().height;
        var span = Math.ceil((height + gap) / (row + gap));
        item.style.gridRowEnd = 'span ' + span;
      });
    }

    function updateLightbox(index) {
      var item = items[index];
      if (!item) return;

      var source = $('source', item);
      var image = $('img', item);
      if (!image) return;

      activeIndex = index;
      lightboxImage.classList.remove('is-ready');
      lightboxImage.alt = image.alt || '';
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.srcset = image.getAttribute('srcset') || '';
      lightboxImage.sizes = image.getAttribute('sizes') || '100vw';

      lightboxWebp.srcset = source ? (source.getAttribute('srcset') || '') : '';
      lightboxWebp.sizes = source ? (source.getAttribute('sizes') || '') : '100vw';
      lightboxWebp.type = 'image/webp';

      if (lightboxImage.complete) {
        lightboxImage.classList.add('is-ready');
      }
    }

    function openLightbox(index) {
      lastFocused = document.activeElement;
      updateLightbox(index);
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.classList.add('is-open');
      document.body.classList.add('gallery-lightbox-open');
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.hidden = true;
      document.body.classList.remove('gallery-lightbox-open');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function step(direction) {
      var nextIndex = activeIndex + direction;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      updateLightbox(nextIndex);
    }

    function isGalleryMobile() {
      return window.matchMedia('(max-width: 639px)').matches;
    }

    function setMobileWrapHeightToContent() {
      if (!mobileWrap || !isGalleryMobile() || items.length <= 5) return;
      mobileWrap.style.maxHeight = 'none';
      var h = mobileWrap.scrollHeight;
      mobileWrap.style.maxHeight = h + 'px';
    }

    function updateMobileControls() {
      if (!section || !mobileControls || !expandBtn || !collapseBtn || items.length <= 5) return;
      if (!isGalleryMobile()) {
        mobileControls.hidden = true;
        section.classList.remove('is-expanded-mobile');
        if (mobileWrap) mobileWrap.style.maxHeight = '';
        return;
      }

      mobileControls.hidden = false;
      var expanded = section.classList.contains('is-expanded-mobile');
      expandBtn.setAttribute('aria-hidden', expanded ? 'true' : 'false');
      collapseBtn.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    }

    function scheduleMobileGalleryLayout() {
      requestAnimationFrame(function () {
        resizeMasonry();
        requestAnimationFrame(function () {
          setMobileWrapHeightToContent();
        });
      });
    }

    lightboxImage.addEventListener('load', function () {
      lightboxImage.classList.add('is-ready');
    });

    items.forEach(function (item, index) {
      var img = $('img', item);
      if (!img) return;

      function onReady() {
        item.classList.add('is-loaded');
        resizeMasonry();
        if (isGalleryMobile() && items.length > 5) {
          setMobileWrapHeightToContent();
        }
      }

      if (img.complete && img.naturalWidth) {
        onReady();
      } else {
        img.addEventListener('load', onReady, { once: true });
      }

      item.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === stage) closeLightbox();
    });

    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    stage.addEventListener('touchend', function (e) {
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) < 40) return;
      if (deltaX < 0) {
        step(1);
      } else {
        step(-1);
      }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === 'Tab') {
        var focusable = [closeBtn, prevBtn, nextBtn];
        var current = focusable.indexOf(document.activeElement);
        if (current === -1) {
          e.preventDefault();
          focusable[0].focus();
        } else if (e.shiftKey && current <= 0) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        } else if (!e.shiftKey && current === focusable.length - 1) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    });

    if (expandBtn && collapseBtn && section && items.length > 5) {
      expandBtn.addEventListener('click', function () {
        if (mobileWrap && isGalleryMobile()) {
          mobileWrap.style.maxHeight = mobileWrap.scrollHeight + 'px';
        }
        requestAnimationFrame(function () {
          section.classList.add('is-expanded-mobile');
          updateMobileControls();
          scheduleMobileGalleryLayout();
        });
      });

      collapseBtn.addEventListener('click', function () {
        var beforeTop = section.getBoundingClientRect().top;
        if (mobileWrap && isGalleryMobile()) {
          mobileWrap.style.maxHeight = mobileWrap.scrollHeight + 'px';
        }
        requestAnimationFrame(function () {
          section.classList.remove('is-expanded-mobile');
          updateMobileControls();
          scheduleMobileGalleryLayout();

          // Prevent jump to next section when collapsing on mobile.
          if (isGalleryMobile()) {
            requestAnimationFrame(function () {
              var afterTop = section.getBoundingClientRect().top;
              var delta = afterTop - beforeTop;
              if (delta) window.scrollBy(0, delta);
            });
          }
        });
      });
    }

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resizeMasonry();
        updateMobileControls();
        if (isGalleryMobile() && items.length > 5) {
          setMobileWrapHeightToContent();
        }
      }, 100);
    });

    updateMobileControls();
    if (isGalleryMobile() && items.length > 5) {
      requestAnimationFrame(function () {
        scheduleMobileGalleryLayout();
      });
    }
  }

  /* ==========================================================================
     10. Scroll reveal (IntersectionObserver)
     ========================================================================== */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      $$('.js-reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    $$('.js-reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================================
     11. Contacts fast form (progress, mask, validation)
     ========================================================================== */
  function initContactsFastForm() {
    var form = document.getElementById('contacts-fast-form');
    if (!form) return;

    var progressFill = form.querySelector('[data-fast-progress-fill]');
    var progressText = form.querySelector('[data-fast-progress-text]');
    var progressBar = form.querySelector('[data-fast-progressbar]');
    var submitBtn = form.querySelector('[data-fast-submit]');
    var statusEl = form.querySelector('[data-fast-status]');

    var fieldEls = {
      name: form.querySelector('[data-fast-field="name"]'),
      phone: form.querySelector('[data-fast-field="phone"]'),
      messenger: form.querySelector('[data-fast-field="messenger"]'),
      comment: form.querySelector('[data-fast-field="comment"]')
    };

    var inputs = {
      name: fieldEls.name ? fieldEls.name.querySelector('[data-fast-input]') : null,
      phone: fieldEls.phone ? fieldEls.phone.querySelector('[data-fast-phone]') : null,
      messenger: fieldEls.messenger ? fieldEls.messenger.querySelector('[data-fast-input]') : null,
      comment: fieldEls.comment ? fieldEls.comment.querySelector('[data-fast-input]') : null
    };

    if (!inputs.name || !inputs.phone || !progressFill || !progressText || !submitBtn) return;

    var touched = { name: false, phone: false };
    var submitAttempted = false;

    function clearSentState() {
      if (!form.classList.contains('is-sent')) return;
      form.classList.remove('is-sent');
      if (statusEl) {
        statusEl.hidden = true;
        statusEl.textContent = '';
      }
    }

    function normalizePhoneDigits(str) {
      var d = String(str || '').replace(/\D/g, '');
      if (!d.length) return '';
      if (d.slice(0, 3) === '375') {
        return d.slice(0, 12);
      }
      if (d.slice(0, 2) === '80') {
        return ('375' + d.slice(2)).slice(0, 12);
      }
      if (d.charAt(0) === '8') {
        return ('375' + d.slice(1)).slice(0, 12);
      }
      return ('375' + d).slice(0, 12);
    }

    function formatPhoneDisplay(norm) {
      if (!norm || norm.length < 3) {
        return '';
      }
      var n = norm.slice(3);
      var s = '+375';
      if (!n.length) {
        return '+375 ';
      }
      s += ' (' + n.slice(0, 2);
      if (n.length <= 2) {
        return s;
      }
      s += ') ' + n.slice(2, 5);
      if (n.length <= 5) {
        return s;
      }
      s += '-' + n.slice(5, 7);
      if (n.length <= 7) {
        return s;
      }
      s += '-' + n.slice(7, 9);
      return s;
    }

    function applyPhoneMaskFromValue() {
      var norm = normalizePhoneDigits(inputs.phone.value);
      var next = formatPhoneDisplay(norm);
      if (inputs.phone.value !== next) {
        inputs.phone.value = next;
      }
    }

    function isNameValid() {
      return inputs.name.value.trim().length > 0;
    }

    function isPhoneValid() {
      return normalizePhoneDigits(inputs.phone.value).length === 12;
    }

    function isMessengerFilled() {
      return inputs.messenger && inputs.messenger.value.trim().length > 0;
    }

    function isCommentFilled() {
      return inputs.comment && inputs.comment.value.trim().length > 0;
    }

    function computeProgress() {
      var pct = 5;
      if (isNameValid()) pct += 25;
      if (isPhoneValid()) pct += 20;
      if (isMessengerFilled()) pct += 25;
      if (isCommentFilled()) pct += 25;
      return Math.min(100, pct);
    }

    function setFieldError(fieldKey, show) {
      var wrap = fieldEls[fieldKey];
      if (!wrap) return;
      var err = wrap.querySelector('[data-fast-error]');
      if (!err) return;
      if (show) {
        err.hidden = false;
        wrap.classList.add('is-invalid');
      } else {
        err.hidden = true;
        wrap.classList.remove('is-invalid');
      }
    }

    function updateBadgesAndFocus() {
      var active = document.activeElement;

      function badgeVisible(fieldKey, requireFilledOnly) {
        var wrap = fieldEls[fieldKey];
        var inp = inputs[fieldKey];
        if (!wrap || !inp) return false;
        var focused = active === inp;
        if (requireFilledOnly) {
          if (fieldKey === 'messenger') return isMessengerFilled();
          if (fieldKey === 'comment') return isCommentFilled();
        }
        if (fieldKey === 'name') {
          return focused || isNameValid();
        }
        if (fieldKey === 'phone') {
          return true;
        }
        return false;
      }

      if (fieldEls.name) {
        fieldEls.name.classList.toggle('is-badge-visible', badgeVisible('name', false));
      }
      if (fieldEls.phone) {
        fieldEls.phone.classList.toggle('is-badge-visible', badgeVisible('phone', false));
      }
      if (fieldEls.messenger) {
        fieldEls.messenger.classList.toggle('is-badge-visible', badgeVisible('messenger', true));
      }
      if (fieldEls.comment) {
        fieldEls.comment.classList.toggle('is-badge-visible', badgeVisible('comment', true));
      }
    }

    function sync() {
      var pct = computeProgress();
      progressFill.style.width = pct + '%';
      if (progressText) {
        progressText.textContent = pct + '%';
      }
      if (progressBar) {
        progressBar.setAttribute('aria-valuenow', String(pct));
        progressBar.setAttribute('aria-valuetext', 'Заполнено ' + pct + '%');
      }

      var nameOk = isNameValid();
      var phoneOk = isPhoneValid();
      submitBtn.disabled = !(nameOk && phoneOk);

      setFieldError('name', (touched.name || submitAttempted) && !nameOk);
      setFieldError('phone', (touched.phone || submitAttempted) && !phoneOk);

      updateBadgesAndFocus();
    }

    form.addEventListener('focusin', function (e) {
      var t = e.target;
      Object.keys(fieldEls).forEach(function (key) {
        var wrap = fieldEls[key];
        if (!wrap) return;
        wrap.classList.toggle('is-focused', !!(inputs[key] && t === inputs[key]));
      });
      sync();
    });

    form.addEventListener('focusout', function (e) {
      var related = e.relatedTarget;
      var t = e.target;
      Object.keys(fieldEls).forEach(function (key) {
        var wrap = fieldEls[key];
        if (!wrap) return;
        if (!related || !wrap.contains(related)) {
          wrap.classList.remove('is-focused');
        }
      });

      if (t === inputs.name) {
        touched.name = true;
      }
      if (t === inputs.phone) {
        touched.phone = true;
      }
      sync();
    });

    inputs.name.addEventListener('input', function () {
      clearSentState();
      sync();
    });

    inputs.phone.addEventListener('input', function () {
      clearSentState();
      applyPhoneMaskFromValue();
      sync();
    });

    if (inputs.messenger) {
      inputs.messenger.addEventListener('input', function () {
        clearSentState();
        sync();
      });
    }
    if (inputs.comment) {
      inputs.comment.addEventListener('input', function () {
        clearSentState();
        sync();
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitAttempted = true;
      touched.name = true;
      touched.phone = true;
      sync();
      if (!isNameValid() || !isPhoneValid()) {
        return;
      }
      form.classList.add('is-sent');
      if (statusEl) {
        statusEl.textContent = 'Спасибо! Мы скоро свяжемся с вами.';
        statusEl.hidden = false;
        if (typeof statusEl.scrollIntoView === 'function') {
          statusEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });

    sync();
  }

  /* ==========================================================================
     12. Quiz start button (scroll to form placeholder)
     ========================================================================== */
  function initQuiz() {
    var startBtn = $('#quiz-start-btn');
    if (!startBtn) return;
    // The quiz is external — just scroll to quiz section
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var quizSection = $('#quiz');
      if (quizSection) {
        var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '80', 10);
        var top = quizSection.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  /* ==========================================================================
     Init
     ========================================================================== */
  function init() {
    initPageReveal();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initRoomSwitcher();
    initFaq();
    initPopups();
    initWorkGallery();
    initScrollReveal();
    initContactsFastForm();
    initQuiz();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
