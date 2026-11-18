const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');

if (form && status) {
  const fields = Array.from(form.querySelectorAll('input, textarea'));
  const validate = field => {
    const tooShort = field.value.trim().length < Math.max(1, field.minLength);
    field.setCustomValidity(tooShort ? 'Lütfen bu alanı yeterli uzunlukta ve yalnızca boşluk içermeyecek şekilde doldurun.' : '');
  };

  fields.forEach(field => {
    validate(field);
    field.addEventListener('input', () => {
      validate(field);
      status.textContent = '';
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    fields.forEach(validate);
    if (!form.reportValidity()) return;
    status.textContent = 'Form alanları doğrulandı. Bu bir önizlemedir; mesajınız gönderilmedi veya kaydedilmedi.';
  });

  form.querySelector('[type="submit"]').disabled = false;
}
