import { mountEditor } from './record-editor.js';

// The public page remains the source while department management is a prototype.
const status = document.querySelector('[data-status]');
let departments = [];
try {
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
  submit(fields) {
    if (!fields.title.value.trim() || !fields.description.value.trim()) {
      throw new Error('Birim adı ve açıklaması zorunludur.');
    }
    return 'Form doğrulandı. Bu prototipte değişiklikler kaydedilmez.';
  }
});
