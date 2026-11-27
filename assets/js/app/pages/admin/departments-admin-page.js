import { mountEditor } from './record-editor.js';
import { LocalStorageAdapter } from '../../core/local-storage-adapter.js';

const storage = new LocalStorageAdapter();
const status = document.querySelector('[data-status]');
let departments = [];
try {
  if (storage.has('departments')) departments = storage.get('departments', []);
  else {
    const response = await fetch('../birimler.html');
    if (!response.ok) throw new Error('Birim sayfası okunamadı.');
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    departments = Array.from(html.querySelectorAll('article.agency-department'), section => {
      const [description, skills] = section.querySelectorAll('p');
      return {
        id: section.id,
        title: section.querySelector('h2').textContent,
        description: description.textContent,
        skills: skills.textContent,
        tasks: Array.from(section.querySelectorAll('li'), item => item.textContent).join('\n')
      };
    });
  }
} catch {
  status.textContent = 'Mevcut birimler yüklenemedi. Yeni birim formu kullanılabilir.';
}

mountEditor({
  noun: 'Birim',
  columnCount: 2,
  list: () => departments,
  columns: () => [],
  populate(fields, item) {
    if (!item) return;
    for (const name of ['title', 'description', 'tasks', 'skills']) fields.namedItem(name).value = item[name];
  },
  submit(fields, id) {
    if (!fields.title.value.trim() || !fields.description.value.trim()) {
      throw new Error('Birim adı ve açıklaması zorunludur.');
    }
    const title = fields.title.value.trim();
    const base = title.toLocaleLowerCase('tr-TR').replaceAll('ı', 'i')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!base) throw new Error('Birim adında harf veya rakam kullanın.');
    let nextId = id || base;
    if (!id) {
      let number = 2;
      while (departments.some(item => item.id === nextId)) nextId = `${base}-${number++}`;
    }
    const item = { id: nextId, title, description: fields.description.value.trim(),
      tasks: fields.tasks.value.trim(), skills: fields.skills.value.trim() };
    const next = id ? departments.map(row => row.id === id ? item : row) : [...departments, item];
    storage.set('departments', next);
    departments = next;
    return id ? 'Birim güncellendi.' : 'Birim eklendi.';
  },
  remove(id) {
    const next = departments.filter(item => item.id !== id);
    storage.set('departments', next);
    departments = next;
    return true;
  }
});
