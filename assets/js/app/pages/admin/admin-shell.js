const current = document.body.dataset.adminPage;
const link = (file, label, publicSite = false) => `
  <a class="nav-link px-3 py-2 ${file === current ? 'active' : 'text-body'}"
    href="${publicSite ? '../index.html' : file + '.html'}"${file === current ? ' aria-current="page"' : ''}>${label}</a>`;

// Uses the template's surface header, surface sidebar and grouped navigation.
document.querySelector('[data-admin-shell]').innerHTML = `
  <header class="agency-admin-header surface-header border-bottom sticky-top d-flex align-items-center gap-3 px-3 px-md-4 py-3">
    <button class="btn btn-outline-primary d-lg-none" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#admin-sidebar" aria-controls="admin-sidebar">Menü</button>
    <a class="fw-bold text-body text-decoration-none" href="index.html">NovaSoft Ajans Yönetimi</a>
  </header>
  <aside class="offcanvas-lg offcanvas-start surface-sidebar agency-admin-sidebar border-end" tabindex="-1"
    id="admin-sidebar" aria-labelledby="admin-nav-title">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title h5" id="admin-nav-title">Yönetim Menüsü</h2>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#admin-sidebar" aria-label="Kapat"></button>
    </div>
    <div class="offcanvas-body p-3">
      <nav class="nav nav-pills flex-column gap-1" aria-label="Yönetim menüsü">
        ${link('index', 'Dashboard')}
        <p class="small text-secondary fw-semibold mt-3 mb-1 px-3">İçerik Yönetimi</p>
        ${link('hizmetler', 'Hizmetler')}
        ${link('duyurular', 'Duyurular')}
        ${link('birimler', 'Birimler')}
        <p class="small text-secondary fw-semibold mt-3 mb-1 px-3">Raporlama</p>
        ${link('istatistikler', 'İstatistikler')}
        <p class="small text-secondary fw-semibold mt-3 mb-1 px-3">Site</p>
        ${link('public', 'Siteyi Görüntüle', true)}
      </nav>
    </div>
  </aside>`;
