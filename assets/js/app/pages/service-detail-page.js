import { app } from '../core/bootstrap-app.js';
import { escapeHtml } from '../core/formatters.js';

const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');
const service = app.services.getDetail(slug);
const root = document.querySelector('[data-service-detail]');

if (!root) {
  // Sayfada hedef alan yoksa işlem yapma.
} else if (!service) {
  root.innerHTML = `
    <h1 class="h2 fw-bold">Hizmet bulunamadı</h1>
    <div class="alert alert-warning" role="alert">
      İstenen hizmet bulunamadı. <a href="hizmetler.html" class="alert-link">Tüm hizmetlere dön.</a>
    </div>`;
} else {
  const money = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(service.price);
  root.innerHTML = `
    <nav aria-label="Sayfa yolu"><ol class="breadcrumb small"><li class="breadcrumb-item"><a href="index.html">Ana Sayfa</a></li><li class="breadcrumb-item"><a href="hizmetler.html">Hizmetler</a></li><li class="breadcrumb-item active" aria-current="page">${escapeHtml(service.title)}</li></ol></nav>
    <div class="row g-5 align-items-start">
      <div class="col-lg-7">
        <span class="badge text-bg-primary mb-3">Hizmet Detayı</span>
        <h1 class="display-5 fw-bold">${escapeHtml(service.title)}</h1>
        <p class="lead text-secondary">${escapeHtml(service.description)}</p>
        <h2 class="h4 mt-4">Hizmet kapsamı</h2>
        <ul class="list-group list-group-flush mt-3">
          ${service.features.map(feature => `<li class="list-group-item px-0">✓ ${escapeHtml(feature)}</li>`).join('')}
        </ul>
      </div>
      <aside class="col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <p class="text-secondary mb-1">Başlangıç ücreti</p>
            <p class="display-6 fw-bold">${money}</p>
            <p class="small text-secondary">Fiyat örnek proje içeriğidir; gerçek teklif proje kapsamına göre belirlenir.</p>
            <a class="btn btn-primary w-100" href="iletisim.html">Teklif / Görüşme Talebi</a>
          </div>
        </div>
      </aside>
    </div>`;
}
