
import { LocalStorageAdapter } from '../../core/local-storage-adapter.js';
import { siteContact } from '../../core/site-contact.js';

const storage = new LocalStorageAdapter();
const form = document.querySelector('[data-content-form]');
const status = document.querySelector('[data-content-status]');
const fields = form.elements;

try {
  const pages = await Promise.all(['../hakkimizda.html', '../misyon-vizyon.html', '../index.html']
    .map(async path => {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Sayfa içeriği okunamadı.');
      return new DOMParser().parseFromString(await response.text(), 'text/html');
    }));
  const [about, mission, home] = pages;
  const cards = mission.querySelectorAll('.agency-section article.agency-content-panel');
  const defaults = {
    'about-title': about.querySelector('.agency-page-header h1').textContent,
    'about-summary': about.querySelector('.agency-page-header p').textContent,
    'about-content': Array.from(about.querySelectorAll('.agency-section .col-lg-7 p'), item => item.textContent).join('\n\n'),
    mission: Array.from(cards[0].querySelectorAll('p'), item => item.textContent).join('\n\n'),
    vision: Array.from(cards[1].querySelectorAll('p'), item => item.textContent).join('\n\n'),
    values: Array.from(mission.querySelectorAll('.agency-soft-section article.agency-content-panel'), card =>
      `${card.querySelector('h3').textContent} | ${card.querySelector('p').textContent}`).join('\n'),
    'footer-description': home.querySelector('footer .col-lg-5 p').textContent,
    address: siteContact.address, phone: siteContact.phone, email: siteContact.email,
    designer: siteContact.designer,
    linkedin: siteContact.social.linkedin.url,
    instagram: siteContact.social.instagram.url,
    github: siteContact.social.github.url
  };
  const values = { ...defaults, ...storage.get('pageContent', {}) };
  for (const [name, value] of Object.entries(values)) fields.namedItem(name).value = value;
  form.querySelector('[type="submit"]').disabled = false;
} catch {
  status.textContent = 'Mevcut sayfa içerikleri yüklenemedi. Sayfayı yenileyin.';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  for (const [key, value] of Object.entries(values)) values[key] = value.trim();
  try {
    storage.set('pageContent', values);
    status.textContent = 'Sayfa içerikleri kaydedildi.';
  } catch {
    status.textContent = 'İçerikler kaydedilemedi. Tarayıcı depolama alanını kontrol edin.';
  }
});
form.addEventListener('input', () => { status.textContent = ''; });
