import { escapeHtml } from '../../core/formatters.js';
import { metrics, completedProjects, serviceBreakdown, satisfaction, averageSatisfaction } from '../../core/statistics-data.js';
import { LocalStorageAdapter } from '../../core/local-storage-adapter.js';

const sections = [
  {
    title: 'Genel Göstergeler',
    rows: [
      { label: 'Tamamlanan proje (otomatik)', value: metrics.projects, readOnly: true },
      { label: 'Kurumsal müşteri', value: metrics.clients },
      { label: 'Deneyim (yıl)', value: metrics.experience },
      { label: 'Müşteri memnuniyeti (%) (otomatik)', value: averageSatisfaction, max: 100, readOnly: true }
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
        ${rows.map(({ label, value, max, readOnly }, index) => `
          <div class="row g-2 align-items-center">
            <label class="col-sm-7 col-form-label" for="metric-${section}-${index}">${escapeHtml(label)}</label>
            <div class="col-sm-5">
              <input class="form-control" id="metric-${section}-${index}" type="number" required ${readOnly ? 'readonly' : ''}
                min="0" step="1" value="${value}" ${max ? `max="${max}"` : ''}>
            </div>
          </div>`).join('')}
      </div>
    </fieldset>
  </section>`).join('');

const input = (section, index) => Number(form.querySelector(`#metric-${section}-${index}`).value);
const originalYears = completedProjects.map(item => item.value);
const originalBreakdown = serviceBreakdown.map(item => item.value);
const rebalance = (values, target) => {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (!total) return values.map((_, index) => index === values.length - 1 ? target : 0);
  let assigned = 0;
  return values.map((value, index) => {
    const next = index === values.length - 1 ? target - assigned :
      Math.min(target - assigned, Math.round(value / total * target));
    assigned += next;
    return next;
  });
};
const updateDerived = () => {
  form.querySelector('#metric-0-0').value = completedProjects.reduce((sum, _, index) => sum + input(1, index), 0);
  form.querySelector('#metric-0-3').value = Number((satisfaction.reduce((sum, _, index) => sum + input(3, index), 0) / satisfaction.length).toFixed(1));
};
form.addEventListener('submit', event => {
  event.preventDefault();
  let yearly = completedProjects.map((_, index) => input(1, index));
  let breakdown = serviceBreakdown.map((_, index) => input(2, index));
  if (yearly.some(value => !Number.isSafeInteger(value)) ||
      breakdown.some(value => !Number.isSafeInteger(value))) {
    status.textContent = 'Geçerli tam sayı değerleri girin.';
    return;
  }
  const yearlyTotal = yearly.reduce((sum, value) => sum + value, 0);
  const breakdownTotal = breakdown.reduce((sum, value) => sum + value, 0);
  let balanced = false;
  if (yearlyTotal !== breakdownTotal) {
    if (breakdown.every((value, index) => value === originalBreakdown[index])) {
      breakdown = rebalance(breakdown, yearlyTotal);
      balanced = true;
    } else if (yearly.every((value, index) => value === originalYears[index])) {
      yearly = rebalance(yearly, breakdownTotal);
      balanced = true;
    } else {
      status.textContent = 'Yıllık projeler ile hizmet dağılımı toplamı eşit olmalıdır.';
      return;
    }
  }
  try {
    new LocalStorageAdapter().set('statistics', {
      clients: input(0, 1), experience: input(0, 2), completedProjects: yearly,
      serviceBreakdown: breakdown,
      satisfaction: satisfaction.map((_, index) => input(3, index))
    });
    yearly.forEach((value, index) => { form.querySelector(`#metric-1-${index}`).value = value; });
    breakdown.forEach((value, index) => { form.querySelector(`#metric-2-${index}`).value = value; });
    originalYears.splice(0, originalYears.length, ...yearly);
    originalBreakdown.splice(0, originalBreakdown.length, ...breakdown);
    updateDerived();
    for (const field of form.querySelectorAll('input')) field.defaultValue = field.value;
    status.textContent = balanced
      ? 'İstatistikler kaydedildi. Proje dağılımları yeni toplama uyarlandı.'
      : 'İstatistikler kaydedildi.';
  } catch {
    status.textContent = 'İstatistikler kaydedilemedi. Tarayıcı depolama alanını kontrol edin.';
  }
});
form.addEventListener('input', () => { updateDerived(); status.textContent = ''; });
form.addEventListener('reset', () => setTimeout(() => { updateDerived(); status.textContent = ''; }, 0));
