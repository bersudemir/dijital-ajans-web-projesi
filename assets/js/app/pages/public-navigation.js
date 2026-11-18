import { app } from '../core/bootstrap-app.js';

const menu = document.querySelector('[data-service-menu]');
const services = app.services.listPublicServices();
const currentSlug = location.pathname.endsWith('/hizmet-detay.html')
  ? new URLSearchParams(location.search).get('slug')
  : null;

if (services.length) {
  const divider = document.createElement('li');
  divider.innerHTML = '<hr class="dropdown-divider">';
  menu.append(divider);
}

for (const service of services) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.className = 'dropdown-item text-wrap';
  link.href = `hizmet-detay.html?slug=${encodeURIComponent(service.slug)}`;
  link.textContent = service.title;
  if (service.slug === currentSlug) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
  item.append(link);
  menu.append(item);
}
