import { siteContact } from '../core/site-contact.js';
import { LocalStorageAdapter } from '../core/local-storage-adapter.js';

const content = new LocalStorageAdapter().get('pageContent', {}) ?? {};
const setText = (selector, value) => {
  if (value && document.querySelector(selector)) document.querySelector(selector).textContent = value;
};
const setParagraphs = (selector, value) => {
  const container = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!container || !value) return;
  const paragraphs = container.querySelectorAll('p');
  const parts = value.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
  parts.forEach((part, index) => {
    if (paragraphs[index]) paragraphs[index].textContent = part;
    else {
      const paragraph = document.createElement('p');
      paragraph.className = 'text-secondary mb-0';
      paragraph.textContent = part;
      container.append(paragraph);
    }
  });
  paragraphs.forEach((paragraph, index) => { paragraph.hidden = index >= parts.length; });
};
setText('footer .col-lg-5 p', content['footer-description']);

if (location.pathname.endsWith('/hakkimizda.html')) {
  setText('.agency-page-header h1', content['about-title']);
  setText('.agency-page-header p', content['about-summary']);
  setParagraphs('.agency-section .col-lg-7', content['about-content']);
}
if (location.pathname.endsWith('/misyon-vizyon.html')) {
  const cards = document.querySelectorAll('.agency-section article.agency-content-panel');
  if (cards[0]) setParagraphs(cards[0].querySelector('.card-body'), content.mission);
  if (cards[1]) setParagraphs(cards[1].querySelector('.card-body'), content.vision);
  if (content.values) {
    const valueCards = document.querySelectorAll('.agency-soft-section article.agency-content-panel');
    content.values.split('\n').map(line => line.split('|').map(part => part.trim())).forEach(([title, description], index) => {
      if (!valueCards[index] || !title || !description) return;
      valueCards[index].querySelector('h3').textContent = title;
      valueCards[index].querySelector('p').textContent = description;
    });
  }
}

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
  else {
    element.removeAttribute('href');
    element.setAttribute('aria-disabled', 'true');
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
