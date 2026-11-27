import { app } from '../core/bootstrap-app.js';
import { escapeHtml } from '../core/formatters.js';
import { appendAttachments } from '../core/announcement-attachments.js';

const root = document.querySelector('[data-all-announcements]');
if (root) {
  root.innerHTML = app.announcements.listAll().map(item => `
    <article class="card rounded-4" data-announcement-id="${escapeHtml(item.id)}">
      <div class="card-body p-3 p-md-4">
        <time class="small agency-announcement-date">${new Date(item.publishedAt).toLocaleDateString('tr-TR')}</time>
        <h2 class="h5 mt-2">${escapeHtml(item.title)}</h2>
        <p class="text-secondary mb-0">${escapeHtml(item.content)}</p>
      </div>
    </article>`).join('') || '<p class="text-secondary">Şu anda yayında duyuru yok.</p>';
  for (const article of root.querySelectorAll('[data-announcement-id]')) {
    const item = app.announcements.listAll().find(row => String(row.id) === article.dataset.announcementId);
    appendAttachments(article.querySelector('.card-body'), item?.attachments);
  }
}
