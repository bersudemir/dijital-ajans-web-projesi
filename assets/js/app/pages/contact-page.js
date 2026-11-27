import { siteContact } from '../core/site-contact.js';
import { LocalStorageAdapter } from '../core/local-storage-adapter.js';

const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');
const storage = new LocalStorageAdapter();

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
      status.hidden = true;
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
    try {
      storage.set('feedback', [...storage.get('feedback', []), {
        fullName: data.get('fullName').trim(), email: data.get('email').trim(),
        subject, message: data.get('message').trim(), recipient, body,
        createdAt: new Date().toISOString()
      }]);
      form.reset();
      fields.forEach(field => field.setCustomValidity(''));
      status.classList.replace('alert-danger', 'alert-success');
      status.textContent = 'Mesajınız kaydedildi. Görüşleriniz için teşekkür ederiz.';
    } catch {
      status.classList.replace('alert-success', 'alert-danger');
      status.textContent = 'Mesaj kaydedilemedi. Tarayıcı depolama alanını kontrol edin.';
    }
    status.hidden = false;
  });

  form.querySelector('[type="submit"]').disabled = false;
}
