import { app } from '../core/bootstrap-app.js';
import { LocalStorageAdapter } from '../core/local-storage-adapter.js';

const menu = document.querySelector('[data-service-menu]');
const services = app.services.listPublicServices();
const currentSlug = location.pathname.endsWith('/hizmet-detay.html')
  ? new URLSearchParams(location.search).get('slug')
  : null;

if (services.length) {
  const divider = document.createElement('li');
  divider.innerHTML = '<hr class="dropdown-divider">';
  menu.append(divider);
}

for (const service of services) {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.className = 'dropdown-item text-wrap';
  link.href = `hizmet-detay.html?slug=${encodeURIComponent(service.slug)}`;
  link.textContent = service.title;
  if (service.slug === currentSlug) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
  item.append(link);
  menu.append(item);
}

const storage = new LocalStorageAdapter();
if (storage.has('departments')) {
  const departments = storage.get('departments', []);
  const departmentMenu = document.querySelector('a[href="birimler.html"]')?.closest('.dropdown-menu');
  if (departmentMenu) {
    departmentMenu.querySelectorAll('li:not(:first-child)').forEach(item => item.remove());
    if (departments.length) {
      const divider = document.createElement('li');
      divider.innerHTML = '<hr class="dropdown-divider">';
      departmentMenu.append(divider);
    }
    for (const department of departments) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'dropdown-item text-wrap';
      link.href = `birimler.html#${encodeURIComponent(department.id)}`;
      link.textContent = department.title;
      item.append(link);
      departmentMenu.append(item);
    }
  }
  if (location.pathname.endsWith('/birimler.html')) {
    const list = document.querySelector('article.agency-department')?.parentElement;
    const shortcuts = document.querySelector('[aria-label="Birimlere hızlı erişim"]');
    list.querySelectorAll('article.agency-department').forEach(item => item.remove());
    shortcuts.replaceChildren();
    if (!departments.length) {
      const note = document.createElement('p');
      note.className = 'text-secondary';
      note.textContent = 'Şu anda listelenen birim yok.';
      shortcuts.append(note);
    }
    for (const department of departments) {
      const shortcut = document.createElement('a');
      shortcut.className = 'btn btn-outline-primary';
      shortcut.href = `#${encodeURIComponent(department.id)}`;
      shortcut.textContent = department.title;
      shortcuts.append(shortcut);
      const article = document.createElement('article');
      article.id = department.id;
      article.className = 'agency-department card mb-4';
      const body = document.createElement('div');
      body.className = 'card-body p-4 p-lg-5';
      const row = document.createElement('div');
      row.className = 'row g-4';
      const intro = document.createElement('div');
      intro.className = 'col-lg-5';
      const title = document.createElement('h2');
      title.className = 'h2 fw-bold';
      title.textContent = department.title;
      const description = document.createElement('p');
      description.className = 'text-secondary mb-0';
      description.textContent = department.description;
      intro.append(title, description);
      const details = document.createElement('div');
      details.className = 'col-lg-7';
      const tasksTitle = document.createElement('h3');
      tasksTitle.className = 'h5 fw-bold';
      tasksTitle.textContent = 'Görev alanları';
      const tasks = document.createElement('ul');
      tasks.className = 'agency-list';
      for (const line of department.tasks.split('\n').filter(Boolean)) {
        const task = document.createElement('li');
        task.textContent = line;
        tasks.append(task);
      }
      const skillsTitle = document.createElement('h3');
      skillsTitle.className = 'h5 fw-bold mt-4';
      skillsTitle.textContent = 'İlgili uzmanlıklar';
      const skills = document.createElement('p');
      skills.className = 'text-secondary mb-0';
      skills.textContent = department.skills;
      details.append(tasksTitle, tasks, skillsTitle, skills);
      row.append(intro, details);
      body.append(row);
      article.append(body);
      list.append(article);
    }
  }
}
