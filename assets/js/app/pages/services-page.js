import { app } from '../core/bootstrap-app.js';
import { escapeHtml, formatCurrency } from '../core/formatters.js';

const root = document.querySelector('[data-service-list]');

if (root) {
  const services = app.services.listPublicServices();
  root.innerHTML = services.length ? services.map(service => `
    <div class="col-md-6 col-xl-4">
      <article class="card agency-card h-100">
        <div class="card-body p-4 d-flex flex-column">
          <span class="text-primary fw-semibold small mb-3">DİJİTAL ÇÖZÜMLER</span>
          <h2 class="h4 fw-bold">${escapeHtml(service.title)}</h2>
          <p class="text-secondary">${escapeHtml(service.shortDescription)}</p>
          <ul class="agency-list small text-secondary">
            ${service.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}
          </ul>
          <div class="mt-auto pt-3">
            <p class="fw-semibold">Başlangıç: ${formatCurrency(service.price)}</p>
            <a class="btn btn-outline-primary" href="hizmet-detay.html?slug=${encodeURIComponent(service.slug)}"
              aria-label="${escapeHtml(service.title)} hizmetinin detayını incele">Detayı İncele</a>
          </div>
        </div>
      </article>
    </div>`).join('') : '<div class="col-12"><p class="alert alert-info" role="status">Şu anda yayında bir hizmet bulunmuyor. İhtiyaçlarınızı görüşmek için bizimle iletişime geçebilirsiniz.</p></div>';
}
