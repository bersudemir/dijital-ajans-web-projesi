export class BaseRepository {
  constructor(storage, collectionName, ModelClass) {
    if (!storage) throw new Error('storage bağımlılığı zorunludur.');
    if (!collectionName) throw new Error('collectionName zorunludur.');
    if (!ModelClass) throw new Error('ModelClass zorunludur.');

    this.storage = storage;
    this.collectionName = collectionName;
    this.ModelClass = ModelClass;
  }

  getAll() {
    const rows = this.storage.get(this.collectionName, []);
    return rows.map(row => new this.ModelClass(row));
  }

  getById(id) {
    return this.getAll().find(item => String(item.id) === String(id)) ?? null;
  }

  save(entity) {
    const rows = this.getAll();
    const index = rows.findIndex(item => String(item.id) === String(entity.id));

    if (index >= 0) rows[index] = entity;
    else rows.push(entity);

    this.storage.set(this.collectionName, rows);
    return entity;
  }

  delete(id) {
    const rows = this.getAll();
    const next = rows.filter(item => String(item.id) !== String(id));
    this.storage.set(this.collectionName, next);
    return next.length !== rows.length;
  }

  seed(items) {
    if (!this.storage.has(this.collectionName)) {
      this.storage.set(this.collectionName, items);
    }
  }
}
