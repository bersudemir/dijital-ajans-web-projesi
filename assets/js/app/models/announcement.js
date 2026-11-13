export class Announcement {
  constructor({ id, title, summary, content, publishedAt, image = '', attachments = [], active = true }) {
    if (!id) throw new Error('Announcement.id zorunludur.');
    if (!title) throw new Error('Announcement.title zorunludur.');

    this.id = id;
    this.title = title;
    this.summary = summary ?? '';
    this.content = content ?? '';
    this.publishedAt = publishedAt ?? new Date().toISOString();
    this.image = image;
    this.attachments = Array.isArray(attachments) ? attachments : [];
    this.active = Boolean(active);
  }
}
