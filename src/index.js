import throttle from 'lodash.throttle';
import './js/formActions';
import './js/lightbox';

const header = document.querySelector('[data-block="header"]');
const links = document.querySelectorAll('[data-link]');

window.onscroll = throttle(scrollFunction, 150);

// Function for defining header height
const headerHeight = () => header.scrollHeight;

// Function fot adding styles to heder on scroll
function scrollFunction() {
  const height = headerHeight();
  if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
    header.classList.add('active');
    return;
  } else {
    header.classList.remove('active');
  }
}

// Smooth scrolling to anchor links
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const id = link.getAttribute('data-link');
    const elementPosition = document.getElementById(id).offsetTop;
    const headerPosition = headerHeight();
    const scrollTo = elementPosition - headerPosition;

    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth',
    });
  });
});

// Custom focus on team div elements
const focusedEl = document.querySelectorAll('.team-list-item__link');
const onBlur = e => e.target.closest('div').classList.remove('focused');
const onFocus = e => e.target.closest('div').classList.add('focused');

focusedEl.forEach(el => {
  el.addEventListener('focus', onFocus);
  el.addEventListener('blur', onBlur);
  el.addEventListener('click', () => el.blur());
});
