export class ServiceService {
  constructor(repository) {
    this.repository = repository;
  }

  listPublicServices() {
    return this.repository.getActive();
  }

  getDetail(slug) {
    if (!slug) return null;
    return this.repository.getBySlug(slug);
  }
}
