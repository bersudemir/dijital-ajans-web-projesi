// Ajansın statik demo verileri. Proje dağılımı tüm yılları kapsar.
const completedProjects = [
  { label: '2022', value: 13 },
  { label: '2023', value: 16 },
  { label: '2024', value: 20 },
  { label: '2025', value: 25 },
  { label: '2026', value: 30 }
];
const serviceBreakdown = [
  { label: 'Web Tasarım ve Geliştirme', value: 54, color: 'var(--bs-primary)' },
  { label: 'Mobil Uygulama Geliştirme', value: 32, color: '#0f766e' },
  { label: 'Kurumsal Yazılım Çözümleri', value: 38, color: '#9a3412' }
];
const satisfaction = [
  { label: '2025 · 4. çeyrek', axisLabel: '2025 Ç4', value: 93 },
  { label: '2026 · 1. çeyrek', axisLabel: '2026 Ç1', value: 95 },
  { label: '2026 · 2. çeyrek', axisLabel: '2026 Ç2', value: 97 },
  { label: '2026 · 3. çeyrek', axisLabel: '2026 Ç3', value: 99 }
];

const totalProjects = serviceBreakdown.reduce((total, item) => total + item.value, 0);
const averageSatisfaction = satisfaction.reduce((total, item) => total + item.value, 0) / satisfaction.length;
const metrics = {
  projects: totalProjects,
  clients: 68,
  experience: 8,
  satisfaction: `%${averageSatisfaction}`
};

// Bootstrap Admin / HTML charts.html örneğindeki viewBox, grid ve koordinat yaklaşımı.
const plot = { width: 320, height: 210, left: 39, right: 10, top: 27, bottom: 34 };
const plotWidth = plot.width - plot.left - plot.right;
const baseline = plot.height - plot.bottom;
const plotHeight = baseline - plot.top;

function plotChart(target, entries, { id, title, ticks, format = String, line = false }) {
  const min = ticks[0];
  const max = ticks.at(-1);
  const y = value => baseline - (value - min) / (max - min) * plotHeight;
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
  let offset = 0;
  const segments = serviceBreakdown.map(({ value, color }) => {
    const share = value / totalProjects * 100;
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
        <text x="90" y="89" fill="var(--bs-body-color)" font-size="27" font-weight="700">${totalProjects}</text>
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
  ticks: [0, 10, 20, 30]
});
renderBreakdown(document.querySelector('[data-service-chart]'));
plotChart(document.querySelector('[data-satisfaction-chart]'), satisfaction, {
  id: 'quarterly-satisfaction',
  title: 'Çeyreklere göre müşteri memnuniyeti',
  ticks: [90, 95, 100],
  format: value => `%${value}`,
  line: true
});
