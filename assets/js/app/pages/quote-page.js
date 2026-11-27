import { app } from '../core/bootstrap-app.js';
import { siteContact } from '../core/site-contact.js';
import { LocalStorageAdapter } from '../core/local-storage-adapter.js';

const form = document.querySelector('[data-quote-form]');
const status = document.querySelector('[data-quote-status]');
const storage = new LocalStorageAdapter();
const name = form.elements.namedItem('fullName');
const email = form.elements.namedItem('email');
const serviceField = form.elements.namedItem('service');
const description = form.elements.namedItem('description');
const services = app.services.listPublicServices();

for (const service of services) {
  serviceField.add(new Option(service.title, service.slug));
}

const requestedSlugs = new URLSearchParams(location.search).getAll('hizmet');
if (requestedSlugs.length === 1 && services.some(service => service.slug === requestedSlugs[0])) {
  serviceField.value = requestedSlugs[0];
}

form.addEventListener('input', event => {
  event.target.setCustomValidity('');
  if (!services.length) return;
  status.textContent = '';
  status.hidden = true;
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const service = services.find(item => item.slug === serviceField.value);
  serviceField.setCustomValidity(service ? '' : 'Listeden bir hizmet seçin.');
  for (const field of [name, description]) {
    const tooShort = field.value.trim().length < field.minLength;
    field.setCustomValidity(tooShort ? `En az ${field.minLength} karakter girin.` : '');
  }
  if (!form.reportValidity()) return;

  const recipient = siteContact.email;
  const serviceTitle = service.title.replace(/[\r\n]+/g, ' ');
  const subject = `Teklif Talebi | ${serviceTitle}`;
  const body = [
    `Ad Soyad: ${name.value.trim()}`,
    `E-posta: ${email.value.trim()}`,
    `İlgilenilen Hizmet: ${serviceTitle}`,
    '',
    'Proje Açıklaması:',
    description.value.trim().replace(/\r?\n/g, '\r\n')
  ].join('\r\n');

  try {
    storage.set('quotes', [...storage.get('quotes', []), {
      fullName: name.value.trim(), email: email.value.trim(), service: service.slug,
      description: description.value.trim(), recipient, subject, body,
      createdAt: new Date().toISOString()
    }]);
    form.reset();
    status.classList.replace('alert-danger', 'alert-success');
    status.textContent = 'Talebiniz kaydedildi. İlginiz için teşekkür ederiz.';
  } catch {
    status.classList.replace('alert-success', 'alert-danger');
    status.textContent = 'Talep kaydedilemedi. Tarayıcı depolama alanını kontrol edin.';
  }
  status.hidden = false;
});

form.querySelector('[type="submit"]').disabled = services.length === 0;
if (!services.length) {
  status.classList.replace('alert-success', 'alert-secondary');
  status.textContent = 'Şu anda teklif talep edilebilecek bir hizmet bulunmuyor.';
  status.hidden = false;
}
