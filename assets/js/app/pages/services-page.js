import { app } from '../core/bootstrap-app.js';
import { escapeHtml, formatCurrency } from '../core/formatters.js';
import { resolveServiceImage } from '../core/service-images.js';

const root = document.querySelector('[data-service-list]');

if (root) {
  const services = app.services.listPublicServices();
  root.innerHTML = services.length ? services.map(service => {
    const image = resolveServiceImage(service);
    return `
    <div class="col-md-6 col-xl-4">
      <article class="card agency-card agency-service-card h-100 overflow-hidden">
        <img class="agency-service-image card-img-top" src="${escapeHtml(image.path)}" width="640" height="360"
          alt="${escapeHtml(image.alt)}" loading="lazy">
        <div class="card-body p-4 d-flex flex-column">
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
    </div>`;
  }).join('') : '<div class="col-12"><p class="alert alert-info" role="status">Şu anda yayında bir hizmet bulunmuyor. İhtiyaçlarınızı görüşmek için bizimle iletişime geçebilirsiniz.</p></div>';
}
