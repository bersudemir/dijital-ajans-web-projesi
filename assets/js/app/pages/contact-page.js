import { siteContact } from '../core/site-contact.js';

const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');
const draft = document.querySelector('[data-contact-draft]');

if (form && status && draft) {
  const draftSubject = draft.querySelector('[data-draft-subject]');
  const draftBody = draft.querySelector('#draft-body');
  const openDraft = draft.querySelector('[data-contact-open]');
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
      status.hidden = true;
      draft.hidden = true;
      openDraft.removeAttribute('href');
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    fields.forEach(validate);
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const recipient = siteContact.email;
    const subject = data.get('subject').trim().replace(/[\r\n]+/g, ' ');
    const body = [
      `Ad Soyad: ${data.get('fullName').trim()}`,
      `E-posta: ${data.get('email').trim()}`,
      '',
      data.get('message').trim().replace(/\r?\n/g, '\r\n')
    ].join('\r\n');
    draft.querySelector('[data-draft-recipient]').textContent = recipient;
    draftSubject.textContent = subject;
    draftBody.value = body;
    openDraft.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    draft.hidden = false;
    status.textContent = 'Mesajınız hazırlandı. Göndermek için e-posta uygulamanızı kullanın.';
    status.hidden = false;
  });

  form.querySelector('[type="submit"]').disabled = false;
}
