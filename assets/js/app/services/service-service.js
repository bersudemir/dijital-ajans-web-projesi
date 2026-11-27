import { Service } from '../models/service.js';
import { resolveServiceImage } from '../core/service-images.js';

export class ServiceService {
  constructor(repository) {
    this.repository = repository;
  }

  listPublicServices() {
    return this.repository.getActive();
  }

  getDetail(slug) {
    if (!slug) return null;
    const service = this.repository.getBySlug(slug);
    return service?.active ? service : null;
  }

  listForManagement() {
    return this.repository.getAll();
  }

  save({ id, title, shortDescription, description, price, features, active, image }) {
    const previous = id ? this.repository.getById(id) : null;
    if (id && !previous) throw new Error('Bu hizmet artık mevcut değil.');

    title = title.trim();
    const slug = previous?.slug ?? title.toLocaleLowerCase('tr-TR').replaceAll('ı', 'i')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    description = description.trim();
    if (!title || !description) throw new Error('Hizmet adı ve açıklaması zorunludur.');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error('Hizmet adında harf veya rakam kullanın.');
    }
    const duplicate = this.repository.getBySlug(slug);
    if (duplicate && duplicate.id !== previous?.id) throw new Error('Bu adla bir hizmet zaten mevcut.');
    if (!Number.isFinite(price) || price < 0) throw new Error('Fiyat sıfır veya daha büyük olmalıdır.');

    return this.repository.save(new Service({
      id: previous?.id ?? crypto.getRandomValues(new Uint32Array(4)).join('-'),
      title, slug, description, price, features, active,
      shortDescription: shortDescription.trim() || description.slice(0, 160),
      image: resolveServiceImage({ image: image ?? previous?.image, slug }).path
    }));
  }

  delete(id) {
    return this.repository.delete(id);
  }
}
