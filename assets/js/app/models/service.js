export class Service {
  constructor({ id, slug, title, shortDescription, description, price, image, features = [], active = true }) {
    if (!id) throw new Error('Service.id zorunludur.');
    if (!slug) throw new Error('Service.slug zorunludur.');
    if (!title) throw new Error('Service.title zorunludur.');

    this.id = id;
    this.slug = slug;
    this.title = title;
    this.shortDescription = shortDescription ?? '';
    this.description = description ?? '';
    this.price = Number(price ?? 0);
    this.image = image ?? '';
    this.features = Array.isArray(features) ? features : [];
    this.active = Boolean(active);
  }
}
