import { app } from '../core/bootstrap-app.js';
import { escapeHtml, formatCurrency } from '../core/formatters.js';

function renderServices() {
  const container = document.querySelector('[data-services]');
  if (!container) return;

  const services = app.services.listPublicServices();
  container.innerHTML = services.map((service, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="row align-items-center g-4 p-4 p-lg-5">
        <div class="col-lg-6">
          <span class="badge text-bg-primary mb-3">Hizmet ${index + 1}</span>
          <h2>${escapeHtml(service.title)}</h2>
          <p class="text-secondary">${escapeHtml(service.shortDescription)}</p>
          <p class="fw-semibold">Başlangıç: ${formatCurrency(service.price)}</p>
          <a class="btn btn-primary" href="hizmet-detay.html?slug=${encodeURIComponent(service.slug)}">Detayı İncele</a>
        </div>
        <div class="col-lg-6">
          <div class="ratio ratio-16x9 rounded-4 overflow-hidden bg-light d-flex align-items-center justify-content-center">
            <div class="p-5 text-center text-secondary">${escapeHtml(service.title)} görseli</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAnnouncements() {
  const container = document.querySelector('[data-announcements]');
  if (!container) return;

  container.innerHTML = app.announcements.listLatest(5).map(item => `
    <article class="col-md-6 col-lg-4">
      <div class="card agency-card h-100">
        <div class="card-body">
          <time class="small text-secondary">${new Date(item.publishedAt).toLocaleDateString('tr-TR')}</time>
          <h3 class="h5 mt-2">${escapeHtml(item.title)}</h3>
          <p class="text-secondary">${escapeHtml(item.summary)}</p>
          <button class="btn btn-outline-primary btn-sm" type="button"
            data-bs-toggle="modal" data-bs-target="#announcementModal"
            data-announcement-id="${item.id}">Detay</button>
        </div>
      </div>
    </article>
  `).join('');
}

function bindAnnouncementModal() {
  const modal = document.getElementById('announcementModal');
  if (!modal) return;

  modal.addEventListener('show.bs.modal', event => {
    const id = event.relatedTarget?.dataset?.announcementId;
    const item = app.announcements.listAll().find(x => String(x.id) === String(id));
    if (!item) return;

    modal.querySelector('[data-modal-title]').textContent = item.title;
    modal.querySelector('[data-modal-content]').textContent = item.content;
  });
}

renderServices();
renderAnnouncements();
bindAnnouncementModal();
