import { siteContact } from '../core/site-contact.js';

for (const element of document.querySelectorAll('[data-contact-field]')) {
  const field = element.dataset.contactField;
  const value = siteContact[field].trim();
  if (!value) continue;

  element.textContent = value;
  if (field === 'phone') element.href = `tel:${value.replace(/[^\d+]/g, '')}`;
  if (field === 'email') element.href = `mailto:${value}`;
}

for (const element of document.querySelectorAll('[data-social-profile]')) {
  const { label, url } = siteContact.social[element.dataset.socialProfile];
  element.textContent = label;
  if (/^https:\/\//i.test(url)) {
    element.href = url;
    element.removeAttribute('aria-disabled');
  }
}

const map = document.querySelector('[data-contact-map]');
if (map && siteContact.address.trim()) {
  const url = new URL('https://www.google.com/maps');
  url.searchParams.set('q', siteContact.address.trim());
  url.searchParams.set('output', 'embed');
  map.src = url.href;
  map.hidden = false;
  document.querySelector('[data-contact-map-note]').hidden = true;
}
