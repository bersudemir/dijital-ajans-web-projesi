import { Announcement } from '../models/announcement.js';

export class AnnouncementService {
  constructor(repository) {
    this.repository = repository;
  }

  listLatest(limit = 5) {
    return this.repository.getPublished().slice(0, limit);
  }

  listAll() {
    return this.repository.getPublished();
  }

  listForManagement() {
    return this.repository.getAll().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  save({ id, title, summary, content, publishedAt, active, files = [] }) {
    const previous = id ? this.repository.getById(id) : null;
    if (id && !previous) throw new Error('Bu duyuru artık mevcut değil.');

    title = title.trim();
    content = content.trim();
    if (!title || !content) throw new Error('Başlık ve içerik zorunludur.');
    if (!publishedAt || !Number.isFinite(Date.parse(publishedAt))) throw new Error('Geçerli bir tarih girin.');

    const attachments = (previous?.attachments ?? []).filter(
      attachment => !files.some(file => file.kind === attachment?.kind)
    );
    for (const { kind, name, size, type, dataUrl } of files) {
      attachments.push({ kind, name, size, type, dataUrl });
    }

    return this.repository.save(new Announcement({
      id: previous?.id ?? crypto.getRandomValues(new Uint32Array(4)).join('-'),
      title, content, publishedAt, active,
      summary: summary.trim() || content.slice(0, 160),
      image: previous?.image,
      attachments
    }));
  }

  delete(id) {
    return this.repository.delete(id);
  }
}
