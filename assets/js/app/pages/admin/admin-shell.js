const sessionKey = 'digitalAgency:adminDemoSession';
const current = document.body.dataset.adminPage;
const pages = {
  index: './dashboard-page.js',
  hizmetler: './services-admin-page.js',
  duyurular: './announcements-admin-page.js',
  birimler: './departments-admin-page.js',
  'sayfa-icerikleri': './content-admin-page.js',
  istatistikler: './statistics-admin-page.js'
};

function hasDemoSession() {
  try {
    return sessionStorage.getItem(sessionKey) === '1';
  } catch {
    return false;
  }
}

function bindLogin() {
  const demoUsername = 'admin';
  const demoPassword = '123';
  const form = document.querySelector('[data-admin-login]');
  const status = form.querySelector('[data-login-status]');
  form.addEventListener('input', () => { status.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const username = form.elements.namedItem('username').value;
    const password = form.elements.namedItem('password').value;
    if (username !== demoUsername || password !== demoPassword) {
      status.textContent = 'Kullanıcı adı veya şifre hatalı';
      return;
    }
    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      status.textContent = 'Demo oturumu açılamadı. Tarayıcı depolama ayarlarını kontrol edin.';
      return;
    }
    location.replace('index.html');
  });
  form.querySelector('[type="submit"]').disabled = false;
}

function renderShell() {
  const link = (file, label, publicSite = false) => `
  <a class="nav-link px-3 py-2 ${file === current ? 'active' : 'text-body'}"
    href="${publicSite ? '../index.html' : file + '.html'}"${file === current ? ' aria-current="page"' : ''}>${label}</a>`;

  const shell = document.querySelector('[data-admin-shell]');
  shell.innerHTML = `
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
        ${link('sayfa-icerikleri', 'Sayfa İçerikleri')}
        <p class="small text-secondary fw-semibold mt-3 mb-1 px-3">Raporlama</p>
        ${link('istatistikler', 'İstatistikler')}
        <p class="small text-secondary fw-semibold mt-3 mb-1 px-3">Site</p>
        ${link('public', 'Siteyi Görüntüle', true)}
        <button class="btn btn-outline-secondary mt-3" type="button" data-admin-logout>Çıkış Yap</button>
      </nav>
    </div>
  </aside>`;

  shell.querySelector('[data-admin-logout]').addEventListener('click', () => {
    sessionStorage.removeItem(sessionKey);
    location.replace('giris.html');
  });
}

if (current === 'giris') {
  if (hasDemoSession()) location.replace('index.html');
  else bindLogin();
} else {
  const main = document.getElementById('admin-main');
  const checkSession = () => {
    if (hasDemoSession()) return true;
    main.hidden = true;
    location.replace('giris.html');
    return false;
  };

  if (checkSession()) {
    window.addEventListener('pageshow', checkSession);
    renderShell();
    await import(pages[current]);
    main.hidden = false;
  }
}
