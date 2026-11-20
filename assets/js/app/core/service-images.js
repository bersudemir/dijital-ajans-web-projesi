export const serviceImages = [
  {
    path: 'assets/images/services/web-development.svg',
    slug: 'web-tasarim-gelistirme',
    label: 'Web tasarım ve geliştirme',
    alt: 'Web tarayıcısında kod simgesi ve içerik kartları'
  },
  {
    path: 'assets/images/services/mobile-app.svg',
    slug: 'mobil-uygulama',
    label: 'Mobil uygulama geliştirme',
    alt: 'Akıllı telefon ekranında uygulama arayüzü ve yan paneller'
  },
  {
    path: 'assets/images/services/enterprise-software.svg',
    slug: 'kurumsal-yazilim',
    label: 'Kurumsal yazılım',
    alt: 'Merkezî yazılıma bağlı belge, rapor ve görev modülleri'
  }
];

export function findServiceImage(path) {
  // Previously seeded records may still reference the same filenames with a .jpg extension.
  const normalizedPath = typeof path === 'string' ? path.replace(/\.jpg$/, '.svg') : '';
  return serviceImages.find(image => image.path === normalizedPath);
}

export function resolveServiceImage(service) {
  return findServiceImage(service.image)
    ?? serviceImages.find(image => image.slug === service.slug)
    ?? serviceImages[0];
}
