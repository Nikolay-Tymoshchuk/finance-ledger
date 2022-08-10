import formValidationIcon from './images/form/worning.svg';
import throttle from 'lodash.throttle';
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

// Form interaction
const form = document.querySelector('[data-form]');
const name = form.elements.name;
const email = form.elements.email;
const errorMessage = form.querySelector('[data-error]');
const submitBtn = form.querySelector('[type="submit"]');

[name, email].forEach(input => input.addEventListener('focus', onFocusInput));
[name, email].forEach(input => input.addEventListener('blur', onBlurInput));

submitBtn.addEventListener('click', validationForm);

function validationForm(e) {
  e.preventDefault();

  if (email.value.length === 0) {
    errorMessage.innerHTML = `<img src=${formValidationIcon} alt="error of required field" /> <span>This is a required field</span>`;
    return;
  }

  let formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log('Form successfully submitted'))
    .catch(error => alert(error));

  form.reset();
}

function onFocusInput(e) {
  errorMessage.innerHTML = ``;
  e.target.nextElementSibling.classList.add('active-filled');
}

function onBlurInput(e) {
  if (e.target.value.trim() !== '') return;
  e.target.nextElementSibling.classList.remove('active-filled');
}
