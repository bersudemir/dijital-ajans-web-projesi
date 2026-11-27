import { escapeHtml } from '../../core/formatters.js';
import { metrics, completedProjects, serviceBreakdown, satisfaction, averageSatisfaction } from '../../core/statistics-data.js';

const sections = [
  {
    title: 'KPI değerleri',
    rows: [
      { label: 'Tamamlanan proje', value: metrics.projects },
      { label: 'Kurumsal müşteri', value: metrics.clients },
      { label: 'Deneyim (yıl)', value: metrics.experience },
      { label: 'Müşteri memnuniyeti (%)', value: averageSatisfaction, max: 100 }
    ]
  },
  { title: 'Yıllık proje verileri', rows: completedProjects },
  { title: 'Hizmet dağılımı', rows: serviceBreakdown },
  { title: 'Müşteri memnuniyeti (%)', rows: satisfaction.map(item => ({ ...item, max: 100 })) }
];

const form = document.querySelector('[data-statistics]');
const status = document.querySelector('[data-status]');
form.querySelector('[data-statistics-fields]').innerHTML = sections.map(({ title, rows }, section) => `
  <section class="col-xl-6">
    <fieldset class="surface-card card shadow-sm h-100 p-3 p-md-4">
      <legend class="h5 float-none w-auto mb-3">${title}</legend>
      <div class="d-grid gap-3">
        ${rows.map(({ label, value, max }, index) => `
          <div class="row g-2 align-items-center">
            <label class="col-sm-7 col-form-label" for="metric-${section}-${index}">${escapeHtml(label)}</label>
            <div class="col-sm-5">
              <input class="form-control" id="metric-${section}-${index}" type="number" required
                min="0" step="1" value="${value}" ${max ? `max="${max}"` : ''}>
            </div>
          </div>`).join('')}
      </div>
    </fieldset>
  </section>`).join('');

form.addEventListener('submit', event => {
  event.preventDefault();
  status.textContent = 'Değerler doğrulandı. Bu prototipte değişiklikler kaydedilmez.';
});
for (const event of ['input', 'reset']) form.addEventListener(event, () => { status.textContent = ''; });
