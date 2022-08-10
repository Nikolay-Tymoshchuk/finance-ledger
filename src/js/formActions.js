import { Notify } from 'notiflix/build/notiflix-notify-aio';
import formValidationIcon from '../images/form/worning.svg';
Notify.init({
  position: 'center-center',
  timeout: 3000,
  clickToClose: true,
  showClose: true,
  backOverlayColor: '#000',
  fontSize: '18px',
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
    .then(() =>
      Notify.success('Thank you for contacting us! In the near future we will contact you')
    )
    .catch(() => Notify.error('Something went wrong. Please, try again later'));

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
