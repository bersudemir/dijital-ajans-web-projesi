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
}
