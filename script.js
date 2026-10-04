/* AnyService interactions: launch reveal, scroll rhythm, service picker and local demo forms. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.querySelector('#intro');
  const startButton = document.querySelector('#start-experience');
  let hasStarted = false;

  function startExperience() {
    if (!intro || hasStarted) return;
    hasStarted = true;
    startButton?.setAttribute('aria-pressed', 'true');
    intro.classList.add('is-leaving');
    const finish = () => {
      intro.classList.add('is-gone');
      intro.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('intro-locked');
      document.querySelector('#main-content')?.focus({ preventScroll: true });
    };
    if (reduceMotion) finish();
    else window.setTimeout(finish, 1160);
  }

  startButton?.addEventListener('click', startExperience);
  intro?.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && !hasStarted) {
      event.preventDefault();
      startButton?.focus();
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target === intro) {
      event.preventDefault();
      startExperience();
    }
  });

  // Section reveals use the browser observer; users with reduced motion see everything immediately.
  const revealItems = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // CSS scroll timelines power the progress strip where supported; this small fallback covers older browsers.
  const progress = document.querySelector('.scroll-progress span');
  if (progress && !CSS.supports('animation-timeline: scroll()')) {
    let scheduled = false;
    const updateProgress = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = remaining > 0 ? window.scrollY / remaining : 0;
      progress.style.setProperty('--fallback-progress', String(Math.min(1, Math.max(0, fraction))));
      scheduled = false;
    };
    window.addEventListener('scroll', () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }

  // A small, accessible mouse response on the hero art and CTA chips.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    }, { passive: true });
  }
  const tiltTarget = document.querySelector('[data-tilt]');
  if (finePointer && tiltTarget && !reduceMotion) {
    tiltTarget.addEventListener('pointermove', (event) => {
      const rect = tiltTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltY = (x - .5) * 7;
      const tiltX = (.5 - y) * 7;
      tiltTarget.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      tiltTarget.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
      tiltTarget.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
      tiltTarget.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
    });
    tiltTarget.addEventListener('pointerleave', () => {
      tiltTarget.style.setProperty('--tilt-x', '0deg');
      tiltTarget.style.setProperty('--tilt-y', '0deg');
    });
  }

  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .12;
        const y = (event.clientY - rect.top - rect.height / 2) * .12;
        button.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      button.addEventListener('pointerleave', () => { button.style.translate = ''; });
    });
  }

  // Mobile navigation closes on selection, escape, or an outside tap.
  const menuButton = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    nav?.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    nav?.classList.toggle('is-open', !isOpen);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('pointerdown', (event) => {
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
  });

  // The same choice powers both the category cards and the visit builder.
  const serviceButtons = [...document.querySelectorAll('[data-pick-service]')];
  const serviceCards = [...document.querySelectorAll('[data-service]')];
  const timeButtons = [...document.querySelectorAll('[data-pick-time]')];
  const builderStatus = document.querySelector('#builder-status');
  const builderCta = document.querySelector('#builder-cta');
  let chosenService = '';
  let chosenTime = '';

  const selectedValue = (group) => group === 'service' ? chosenService : chosenTime;
  function updateVisitBuilder(announce = true) {
    serviceButtons.forEach((button) => {
      const selected = button.dataset.pickService === chosenService;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    serviceCards.forEach((button) => {
      const selected = button.dataset.service === chosenService;
      button.setAttribute('aria-pressed', String(selected));
    });
    timeButtons.forEach((button) => {
      const selected = button.dataset.pickTime === chosenTime;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const summary = [chosenService, chosenTime].filter(Boolean).join(' · ');
    if (builderStatus && announce) {
      builderStatus.textContent = summary ? `${summary} — looking like a good start.` : 'Your visit, your pace. No pressure.';
    }
    if (builderCta) {
      const query = new URLSearchParams({ source: 'builder' });
      if (chosenService) query.set('service', chosenService);
      if (chosenTime) query.set('time', chosenTime);
      builderCta.href = `account.html?${query.toString()}`;
    }
  }
  serviceButtons.forEach((button) => button.addEventListener('click', () => {
    chosenService = selectedValue('service') === button.dataset.pickService ? '' : button.dataset.pickService;
    updateVisitBuilder();
  }));
  serviceCards.forEach((button) => button.addEventListener('click', () => {
    chosenService = selectedValue('service') === button.dataset.service ? '' : button.dataset.service;
    updateVisitBuilder();
    const status = document.querySelector('#builder-status');
    if (status && chosenService) status.textContent = `${chosenService} added. Pick a visit time when you're ready.`;
  }));
  timeButtons.forEach((button) => button.addEventListener('click', () => {
    chosenTime = selectedValue('time') === button.dataset.pickTime ? '' : button.dataset.pickTime;
    updateVisitBuilder();
  }));

  // Account tabs and successful-looking front-end previews never send or persist personal details.
  const accountTabs = [...document.querySelectorAll('[data-account-tab]')];
  const accountForms = [...document.querySelectorAll('[data-account-form]')];
  function showAccountForm(name) {
    accountTabs.forEach((tab) => {
      const active = tab.dataset.accountTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    accountForms.forEach((form) => {
      const active = form.dataset.accountForm === name;
      form.hidden = !active;
      form.classList.toggle('is-active', active);
    });
  }
  accountTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showAccountForm(tab.dataset.accountTab));
    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = accountTabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + accountTabs.length) % accountTabs.length];
        showAccountForm(next.dataset.accountTab);
        next.focus();
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  const serviceField = document.querySelector('#profile-service');
  const serviceParam = params.get('service');
  if (serviceField && serviceParam && [...serviceField.options].some((option) => option.value === serviceParam)) {
    serviceField.value = serviceParam;
  }
  const timeField = document.querySelector('[name="time"]');
  const timeParam = params.get('time');
  if (timeField && timeParam && [...timeField.options].some((option) => option.value === timeParam)) {
    timeField.value = timeParam;
  }

  const toast = document.querySelector('#form-toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4800);
  }
  accountForms.forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = form.dataset.accountForm === 'create'
      ? 'That profile looks ready. This preview does not send or store your details.'
      : 'Sign-in preview complete. Code delivery and authentication are not connected.';
    showToast(message);
  }));

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

