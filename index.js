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
const allSections = document.querySelectorAll('.sections');
const allHeadingContainers = document.querySelectorAll('.heading-container');
const servicesContainer = document.querySelector('.services-container');
const projectsContainer = document.querySelector('.work__container');
const contactSubheading = document.querySelector('.contact__subheading');

const observer = (func, options) => {
  return new IntersectionObserver(func, options);
};

function showElements(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    const classes = entry.target.classList;
    if (classes.contains('sections')) classes.add('show-section');
    if (classes.contains('heading-container')) {
      const heading = entry.target.querySelector('.heading-secondary');
      heading.classList.add('show-heading');
    }
    if (classes.contains('services-container')) {
      const cards = entry.target.querySelectorAll('.services-card');
      cards.forEach((card) => card.classList.add('show-card'));
    }

    if (classes.contains('work__container')) {
      const cards = entry.target.querySelectorAll('.work-card');
      cards.forEach((card) => card.classList.add('show-card--fade'));
    }

    if (classes.contains('contact__subheading')) classes.add('show-subheading');
  }
}

const options = { root: null, rootMargin: '0px', threshold: 0 };
const optionsMargin = { root: null, rootMargin: '-100px' };

const sectionsObserver = observer(showElements, options);
allSections.forEach((section) => {
  section.classList.add('hide-section');
  sectionsObserver.observe(section);
});

const headingsObserver = observer(showElements, optionsMargin);
allHeadingContainers.forEach((container) => {
  container.querySelector('.heading-secondary').classList.add('hide-heading');
  headingsObserver.observe(container);
});

const servicesObserver = observer(showElements, optionsMargin);
function handleServices() {
  const cards = servicesContainer.querySelectorAll('.services-card');
  cards.forEach((card) => card.classList.add('hide-card'));
  servicesObserver.observe(servicesContainer);
}
handleServices();

const projectsObserver = observer(showElements, options);
function handleProjects() {
  const cards = projectsContainer.querySelectorAll('.work-card');
  cards.forEach((card) => card.classList.add('hide-card'));
  projectsObserver.observe(projectsContainer);
}
handleProjects();

const subheadingObserver = observer(showElements, optionsMargin);
function handleSubheading() {
  contactSubheading.classList.add('hide-subheading');
  subheadingObserver.observe(contactSubheading);
}
handleSubheading();
