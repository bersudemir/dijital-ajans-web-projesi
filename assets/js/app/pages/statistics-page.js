import { completedProjects, serviceBreakdown, satisfaction, totalProjects, metrics } from '../core/statistics-data.js';

document.querySelector('[data-project-summary]').textContent =
  `${completedProjects[0].label}–${completedProjects.at(-1).label} döneminde toplam ${totalProjects} proje tamamladık.`;

// Bootstrap Admin / HTML charts.html örneğindeki viewBox, grid ve koordinat yaklaşımı.
const plot = { width: 320, height: 210, left: 39, right: 10, top: 27, bottom: 34 };
const plotWidth = plot.width - plot.left - plot.right;
const baseline = plot.height - plot.bottom;
const plotHeight = baseline - plot.top;

function plotChart(target, entries, { id, title, ticks, format = String, line = false }) {
  const min = ticks[0];
  const max = ticks.at(-1);
  const y = value => baseline - (value - min) / Math.max(1, max - min) * plotHeight;
  const slot = plotWidth / entries.length;
  const points = entries.map((entry, index) => ({
    ...entry,
    x: plot.left + slot * (index + 0.5),
    y: y(entry.value)
  }));

  const grid = ticks.map(tick => `
    <line x1="${plot.left}" y1="${y(tick)}" x2="${plot.width - plot.right}" y2="${y(tick)}"
      stroke="var(--bs-border-color)" ${tick === min ? '' : 'stroke-dasharray="4 4"'} />
    <text x="${plot.left - 6}" y="${y(tick)}" text-anchor="end" dominant-baseline="middle">${format(tick)}</text>
  `).join('');

  const linePath = points.map(({ x, y }, index) => `${index ? 'L' : 'M'} ${x} ${y}`).join(' ');
  const series = points.map(point => {
    const barWidth = slot * 0.6;
    return line
      ? `<circle cx="${point.x}" cy="${point.y}" r="4" fill="var(--bs-primary)" />`
      : `<rect x="${point.x - barWidth / 2}" y="${point.y}" width="${barWidth}"
          height="${baseline - point.y}" rx="4" fill="var(--bs-primary)" />`;
  }).join('');

  target.innerHTML = `
    <svg class="d-block w-100" viewBox="0 0 ${plot.width} ${plot.height}" role="img"
      aria-labelledby="${id}-title" aria-describedby="${id}-desc">
      <title id="${id}-title">${title}</title>
      <desc id="${id}-desc">${entries.map(({ label, value }) => `${label}: ${format(value)}`).join('; ')}.
        Dikey eksen ${format(min)} ile ${format(max)} arasındadır.</desc>
      <line x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${baseline}" stroke="var(--bs-border-color)" />
      <g fill="var(--bs-secondary-color)" font-size="14">${grid}</g>
      ${line ? `<path d="${linePath}" fill="none" stroke="var(--bs-primary)" stroke-width="2.5" stroke-linejoin="round" />` : ''}
      ${series}
      <g fill="var(--bs-body-color)" font-size="15" text-anchor="middle">
        ${points.map(({ label, axisLabel, value, x, y }) => `
          <text x="${x}" y="${y - 9}" font-weight="600">${format(value)}</text>
          <text x="${x}" y="${baseline + 22}">${axisLabel ?? label}</text>
        `).join('')}
      </g>
    </svg>`;
}

function renderBreakdown(target) {
  const breakdownTotal = serviceBreakdown.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;
  const segments = serviceBreakdown.map(({ value, color }) => {
    const share = breakdownTotal ? value / breakdownTotal * 100 : 0;
    const angle = (offset + share / 2) / 100 * 2 * Math.PI - Math.PI / 2;
    const segment = `
      <circle cx="90" cy="90" r="64" pathLength="100" fill="none" stroke="${color}" stroke-width="32"
        stroke-dasharray="${share} ${100 - share}" stroke-dashoffset="${-offset}" transform="rotate(-90 90 90)" />`;
    offset += share;
    const label = `<text x="${90 + 64 * Math.cos(angle)}" y="${90 + 64 * Math.sin(angle)}"
      dominant-baseline="middle" fill="#fff" font-size="15" font-weight="700">${value}</text>`;
    return { segment, label };
  });

  target.innerHTML = `
    <svg class="agency-chart-donut d-block mx-auto mb-3" viewBox="0 0 180 180" aria-hidden="true">
      ${segments.map(item => item.segment).join('')}
      <g text-anchor="middle">
        ${segments.map(item => item.label).join('')}
        <text x="90" y="89" fill="var(--bs-body-color)" font-size="27" font-weight="700">${breakdownTotal}</text>
        <text x="90" y="108" fill="var(--bs-secondary-color)" font-size="13">Toplam proje</text>
      </g>
    </svg>
    <dl class="mb-0">
      ${serviceBreakdown.map(({ label, value }) => `
        <div class="d-flex justify-content-between gap-2 border-top py-2">
          <dt class="small">${label}</dt>
          <dd class="mb-0 fw-semibold text-nowrap">${value} proje</dd>
        </div>
      `).join('')}
    </dl>`;
}

for (const element of document.querySelectorAll('[data-statistic]')) {
  element.textContent = metrics[element.dataset.statistic];
}

plotChart(document.querySelector('[data-project-chart]'), completedProjects, {
  id: 'completed-projects',
  title: 'Yıllara göre tamamlanan projeler',
  ticks: (() => {
    const max = Math.max(...completedProjects.map(item => item.value), 1);
    const step = max <= 5 ? 1 : Math.ceil(max / 4 / 5) * 5;
    return [0, step, step * 2, step * 3, step * 4];
  })()
});
renderBreakdown(document.querySelector('[data-service-chart]'));
plotChart(document.querySelector('[data-satisfaction-chart]'), satisfaction, {
  id: 'quarterly-satisfaction',
  title: 'Çeyreklere göre müşteri memnuniyeti',
  ticks: (() => {
    const low = Math.min(...satisfaction.map(item => item.value));
    const start = Math.max(0, Math.floor(low / 10) * 10 - 10);
    return [start, (start + 100) / 2, 100];
  })(),
  format: value => `%${value}`,
  line: true
});
