import './admin-shell.js';
import { app } from '../../core/bootstrap-app.js';
import { escapeHtml } from '../../core/formatters.js';
import { mountEditor, publicationBadge } from './record-editor.js';

const fileKinds = ['image', 'pdf', 'word'];
const dateFormat = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
const attachmentNames = attachments => attachments
  .map(attachment => typeof attachment === 'string' ? attachment : attachment?.name)
  .filter(Boolean).join(', ');

function localDateTime(value = new Date()) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '';
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

mountEditor({
  noun: 'Duyuru',
  columnCount: 5,
  list: () => app.announcements.listForManagement(),
  columns: item => [
    escapeHtml(Number.isFinite(Date.parse(item.publishedAt)) ? dateFormat.format(new Date(item.publishedAt)) : '—'),
    `<span class="text-break">${escapeHtml(attachmentNames(item.attachments) || '—')}</span>`,
    publicationBadge(item.active)
  ],
  populate(fields, item) {
    fields.publishedAt.value = localDateTime(item?.publishedAt);
    const names = attachmentNames(item?.attachments ?? []);
    document.querySelector('[data-saved-files]').textContent = names ? `Kayıtlı dosya bilgileri: ${names}` : '';
    if (!item) return;
    for (const name of ['title', 'summary', 'content']) fields.namedItem(name).value = item[name];
    fields.active.checked = item.active;
  },
  submit(fields, id) {
    const files = [];
    for (const kind of fileKinds) {
      const file = fields.namedItem(kind).files[0];
      if (file) files.push({ kind, name: file.name, size: file.size, type: file.type });
    }
    app.announcements.save({
      id,
      title: fields.title.value,
      summary: fields.summary.value,
      content: fields.content.value,
      publishedAt: fields.publishedAt.value,
      active: fields.active.checked,
      files
    });
    return 'Duyuru kaydedildi.';
  },
  remove: id => app.announcements.delete(id)
});
