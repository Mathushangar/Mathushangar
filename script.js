const menuButton = document.querySelector('#menu');
const nav = document.querySelector('nav');
const navLinks = [...document.querySelectorAll('nav a')];
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');

  if (menuButton) {
    menuButton.textContent = 'Menu';
  }
}));

// Reveal content as it enters the viewport
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Highlight the navigation link for the section currently being viewed
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${entry.target.id}`
      );
    });
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

document.querySelectorAll('main section[id]').forEach(section => {
  sectionObserver.observe(section);
});

// Animate impact numbers
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';

    const start = performance.now();
    const duration = 1300;

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      el.textContent =
        `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);

    counterObserver.unobserve(el);
  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Filter insight cards
const filterButtons =
  document.querySelectorAll('[data-filter]');

const insightCards =
  document.querySelectorAll('.insight-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    const filter = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.toggle(
        'selected',
        btn === button
      );
    });

    insightCards.forEach(card => {

      const show =
        filter === 'all' ||
        card.dataset.category === filter;

      card.hidden = !show;

    });
  });
});

// Reading / page scroll progress bar
const progress =
  document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {

  const max =
    document.documentElement.scrollHeight -
    innerHeight;

  const percent =
    max > 0
      ? (scrollY / max) * 100
      : 0;

  if (progress) {
    progress.style.width =
      `${percent}%`;
  }

}, {
  passive: true
});