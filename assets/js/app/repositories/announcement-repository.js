import { BaseRepository } from './base-repository.js';
import { Announcement } from '../models/announcement.js';

export class AnnouncementRepository extends BaseRepository {
  constructor(storage) {
    super(storage, 'announcements', Announcement);
  }

  getPublished() {
    return this.getAll()
      .filter(item => item.active)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }
}
