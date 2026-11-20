const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');
const draft = document.querySelector('[data-contact-draft]');

if (form && status && draft) {
  const draftSubject = draft.querySelector('[data-draft-subject]');
  const draftBody = draft.querySelector('#draft-body');
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
      draft.hidden = true;
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    fields.forEach(validate);
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    draftSubject.textContent = data.get('subject').trim();
    draftBody.value = [
      `Ad Soyad: ${data.get('fullName').trim()}`,
      `E-posta: ${data.get('email').trim()}`,
      '',
      data.get('message').trim()
    ].join('\n');
    draft.hidden = false;
    status.textContent = 'E-posta taslağı hazır. Mesajınız gönderilmedi veya kaydedilmedi.';
  });

  form.querySelector('[type="submit"]').disabled = false;
}
