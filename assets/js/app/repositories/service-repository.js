import { BaseRepository } from './base-repository.js';
import { Service } from '../models/service.js';

export class ServiceRepository extends BaseRepository {
  constructor(storage) {
    super(storage, 'services', Service);
  }

  getActive() {
    return this.getAll().filter(service => service.active);
  }

  getBySlug(slug) {
    return this.getAll().find(service => service.slug === slug) ?? null;
  }
}
