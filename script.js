const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#main-nav');
const navLinks = [...document.querySelectorAll('#main-nav a')];
const year = document.querySelector('#year');
const progressBar = document.querySelector('.scroll-progress');


// ===============================
// COPYRIGHT YEAR
// ===============================

if (year) {
  year.textContent = new Date().getFullYear();
}


// ===============================
// MOBILE NAVIGATION
// ===============================

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    menuButton.textContent = isOpen
      ? 'Close'
      : 'Menu';
  });


  // Close menu after clicking a navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );

      menuButton.textContent = 'Menu';
    });
  });
}


// ===============================
// REVEAL ANIMATION
// ===============================

const revealElements =
  document.querySelectorAll('.reveal');


if ('IntersectionObserver' in window) {

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('visible');

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  // Fallback for older browsers
  revealElements.forEach(element => {
    element.classList.add('visible');
  });

}


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

const observedSections = [
  ...document.querySelectorAll(
    'main section[id]'
  )
];


if ('IntersectionObserver' in window) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          navLinks.forEach(link => {

            const sectionId =
              `#${entry.target.id}`;

            const linkTarget =
              link.getAttribute('href');


            link.classList.toggle(
              'active',
              linkTarget === sectionId
            );

          });

        });

      },
      {
        rootMargin:
          '-35% 0px -55% 0px'
      }
    );


  observedSections.forEach(section => {
    sectionObserver.observe(section);
  });

}


// ===============================
// SCROLL PROGRESS BAR
// ===============================

function updateScrollProgress() {

  if (!progressBar) {
    return;
  }


  const maximumScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const percentage =
    maximumScroll > 0
      ? (
          window.scrollY /
          maximumScroll
        ) * 100
      : 0;


  const safePercentage =
    Math.min(
      100,
      Math.max(
        0,
        percentage
      )
    );


  progressBar.style.width =
    `${safePercentage}%`;
}


// Run once when page loads
updateScrollProgress();


// Update while scrolling
window.addEventListener(
  'scroll',
  updateScrollProgress,
  {
    passive: true
  }
);


// Recalculate if browser size changes
window.addEventListener(
  'resize',
  updateScrollProgress
);
