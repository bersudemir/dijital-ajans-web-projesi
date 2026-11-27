import { escapeHtml } from '../../core/formatters.js';

export function publicationBadge(active) {
  return active ? '<span class="badge text-bg-success">Aktif</span>' : '<span class="badge text-bg-secondary">Pasif</span>';
}

export function mountEditor({ noun, columnCount, list, columns, populate, submit, remove }) {
  const form = document.querySelector('[data-editor]');
  const modal = form.closest('.modal');
  const grid = document.querySelector('[data-records]');
  const add = document.querySelector('[data-add]');
  const status = document.querySelector('[data-status]');
  const error = form.querySelector('[data-form-error]');
  let records;
  let selected;
  let trigger;

  function render() {
    records = list();
    grid.innerHTML = records.map((record, index) => `
      <tr>
        <th scope="row" class="text-break">${escapeHtml(record.title)}</th>
        ${columns(record).map(cell => `<td>${cell}</td>`).join('')}
        <td>
          <div class="d-flex flex-wrap gap-2">
            <button type="button" class="btn btn-sm btn-outline-primary" data-edit="${index}" aria-label="${escapeHtml(record.title)} kaydını düzenle">Düzenle</button>
            ${remove ? `<button type="button" class="btn btn-sm btn-outline-danger" data-delete="${index}" aria-label="${escapeHtml(record.title)} kaydını sil">Sil</button>` : ''}
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="${columnCount}" class="text-secondary p-3">Henüz kayıt yok.</td></tr>`;
  }

  function open(button, record) {
    trigger = button;
    selected = record;
    form.reset();
    status.textContent = '';
    error.hidden = true;
    modal.querySelector('.modal-title').textContent = record ? `${noun} Düzenle` : `Yeni ${noun}`;
    populate(form.elements, record);
    bootstrap.Modal.getOrCreateInstance(modal).show();
  }

  add.addEventListener('click', () => open(add, null));
  grid.addEventListener('click', event => {
    const edit = event.target.closest('[data-edit]');
    if (edit) open(edit, records[edit.dataset.edit]);

    const del = event.target.closest('[data-delete]');
    if (!del || !remove) return;
    const record = records[del.dataset.delete];
    if (!window.confirm(`“${record.title}” silinsin mi?`)) return;
    try {
      const deleted = remove(record.id);
      render();
      status.textContent = deleted ? 'Kayıt silindi.' : 'Kayıt artık mevcut değil.';
      add.focus();
    } catch {
      status.textContent = 'Kayıt silinemedi. Tarayıcı depolama erişimini kontrol edin.';
    }
  });

  modal.addEventListener('shown.bs.modal', () => form.elements.namedItem('title').focus());
  modal.addEventListener('hidden.bs.modal', () => (trigger?.isConnected ? trigger : add).focus());
  form.addEventListener('submit', async event => {
    event.preventDefault();
    error.hidden = true;
    try {
      const message = await submit(form.elements, selected?.id);
      render();
      status.textContent = message;
      bootstrap.Modal.getInstance(modal).hide();
    } catch (failure) {
      error.textContent = failure.message;
      error.hidden = false;
      error.scrollIntoView({ block: 'nearest' });
    }
  });

  render();
}
