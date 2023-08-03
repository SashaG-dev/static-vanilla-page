const body = document.querySelector('body');

// RESETS / DEFAULTS
body.addEventListener('click', function (e) {
  e.preventDefault();
});

// HEADER / NAVIGATION
const header = document.querySelector('.header');
const navBtn = document.querySelector('.nav__btn');
const overlay = document.querySelector('.overlay');
const navMob = document.querySelector('.nav__mobile-container');
const logos = document.querySelectorAll('.logo');

function handleNav(type) {
  [body, overlay, navMob].forEach((el) => el.classList[type]('nav-open'));
}

header.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    handleNav('remove');
    navBtn.classList.remove('open-nav');
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

logos.forEach((logo) =>
  logo.addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  })
);

navBtn.addEventListener('click', function (e) {
  this.classList.toggle('open-nav');
  handleNav('toggle');
});

// SECTIONS

// SERVICES

// PROJECTS

// CONTACT

// FOOTER
