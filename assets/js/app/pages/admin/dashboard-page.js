import { app } from '../../core/bootstrap-app.js';
import { escapeHtml } from '../../core/formatters.js';
import { metrics } from '../../core/statistics-data.js';
import { publicationBadge } from './record-editor.js';

const services = app.services.listForManagement();
const announcements = app.announcements.listForManagement();
const counts = {
  services: services.length,
  announcements: announcements.length,
  active: services.filter(item => item.active).length,
  clients: metrics.clients
};

for (const counter of document.querySelectorAll('[data-count]')) {
  counter.textContent = counts[counter.dataset.count];
}

document.querySelector('[data-recent]').innerHTML = announcements.slice(0, 4).map(item => `
  <li class="list-group-item px-0 d-flex flex-wrap justify-content-between align-items-center gap-2">
    <span class="text-break">${escapeHtml(item.title)}</span>
    ${publicationBadge(item.active)}
  </li>`).join('') || '<li class="list-group-item px-0 text-secondary">Henüz duyuru yok.</li>';
