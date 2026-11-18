import './admin-shell.js';
import { app } from '../../core/bootstrap-app.js';
import { escapeHtml, formatCurrency } from '../../core/formatters.js';
import { mountEditor, publicationBadge } from './record-editor.js';

mountEditor({
  noun: 'Hizmet',
  columnCount: 5,
  list: () => app.services.listForManagement(),
  columns: item => [`<code class="text-break">${escapeHtml(item.slug)}</code>`, formatCurrency(item.price), publicationBadge(item.active)],
  populate(fields, item) {
    if (!item) return;
    for (const name of ['title', 'slug', 'price', 'shortDescription', 'description']) {
      fields.namedItem(name).value = item[name];
    }
    fields.features.value = item.features.join('\n');
    fields.active.checked = item.active;
  },
  submit(fields, id) {
    app.services.save({
      id,
      title: fields.title.value,
      slug: fields.slug.value,
      shortDescription: fields.shortDescription.value,
      description: fields.description.value,
      price: fields.price.valueAsNumber,
      features: fields.features.value.split('\n').map(feature => feature.trim()).filter(Boolean),
      active: fields.active.checked
    });
    return 'Hizmet kaydedildi.';
  },
  remove: id => app.services.delete(id)
});
