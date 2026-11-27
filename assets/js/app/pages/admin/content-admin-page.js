
const form = document.querySelector('[data-content-form]');
const status = document.querySelector('[data-content-status]');

form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = 'Alanlar doğrulandı. Bu prototipte değişiklikler kaydedilmez.';
});

form.addEventListener('input', () => { status.textContent = ''; });
form.querySelector('button[type="submit"]').disabled = false;
