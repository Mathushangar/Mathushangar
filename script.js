const menuButton = document.querySelector('#menu');
const nav = document.querySelector('nav');
const navLinks = [...document.querySelectorAll('nav a')];
const year = document.querySelector('#year');

// Automatically update copyright year
if (year) {
  year.textContent = new Date().getFullYear();
}


// ===============================
// MOBILE MENU
// ===============================

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});


// Close mobile menu after clicking a navigation link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');

    menuButton?.setAttribute('aria-expanded', 'false');

    if (menuButton) {
      menuButton.textContent = 'Menu';
    }
  });
});


// ===============================
// REVEAL ANIMATION
// ===============================

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);


// Find every element with class "reveal"
document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px'
  }
);


// Watch all sections that have IDs
document.querySelectorAll('main section[id]').forEach(section => {
  sectionObserver.observe(section);
});


// ===============================
// ANIMATED IMPACT NUMBERS
// ===============================

const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;

      const target = Number(element.dataset.count);
      const suffix = element.dataset.suffix || '';

      const start = performance.now();
      const duration = 1300;

      const tick = now => {
        const progress = Math.min(
          (now - start) / duration,
          1
        );

        // Makes the animation slow down naturally
        const eased =
          1 - Math.pow(1 - progress, 3);

        element.textContent =
          `${Math.round(target * eased)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);

      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.5
  }
);


counters.forEach(counter => {
  counterObserver.observe(counter);
});


// ===============================
// INSIGHTS FILTER
// ===============================

const filterButtons =
  document.querySelectorAll('[data-filter]');

const insightCards =
  document.querySelectorAll('.insight-card');


filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    const filter = button.dataset.filter;

    // Change selected filter button
    filterButtons.forEach(btn => {
      btn.classList.toggle(
        'selected',
        btn === button
      );
    });


    // Show/hide insight cards
    insightCards.forEach(card => {

      const shouldShow =
        filter === 'all' ||
        card.dataset.category === filter;

      card.hidden = !shouldShow;
    });

  });
});


// ===============================
// PAGE SCROLL PROGRESS BAR
// ===============================

const progressBar =
  document.querySelector('.scroll-progress');


window.addEventListener(
  'scroll',
  () => {

    const maximumScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      maximumScroll > 0
        ? (window.scrollY / maximumScroll) * 100
        : 0;

    if (progressBar) {
      progressBar.style.width =
        `${percentage}%`;
    }

  },
  {
    passive: true
  }
);
