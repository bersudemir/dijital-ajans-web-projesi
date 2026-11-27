import { app } from '../../core/bootstrap-app.js';
import { escapeHtml, formatCurrency } from '../../core/formatters.js';
import { findServiceImage, serviceImages } from '../../core/service-images.js';
import { mountEditor, publicationBadge } from './record-editor.js';

const imageSelect = document.getElementById('image');
for (const image of serviceImages) imageSelect.add(new Option(image.label, image.path));

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
    fields.image.value = findServiceImage(item.image)?.path ?? '';
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
      image: fields.image.value,
      features: fields.features.value.split('\n').map(feature => feature.trim()).filter(Boolean),
      active: fields.active.checked
    });
    return id ? 'Hizmet güncellendi.' : 'Hizmet eklendi.';
  },
  remove: id => app.services.delete(id)
});
