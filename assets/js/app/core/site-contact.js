import { LocalStorageAdapter } from './local-storage-adapter.js';

// Adres Google Maps sorgusunda da kullanılır. URL'si boş profiller metin olarak gösterilir.
const saved = new LocalStorageAdapter().get('pageContent', {}) ?? {};
export const siteContact = {
  address: saved.address || 'Kocaeli Üniversitesi, Umuttepe Yerleşkesi, 41001 İzmit/Kocaeli, Türkiye.',
  phone: saved.phone || '+90 216 555 01 24',
  email: saved.email || 'info@novasoftajans.com',
  designer: saved.designer || 'Bersu Demir',
  social: {
    linkedin: { label: 'LinkedIn', url: saved.linkedin || '' },
    instagram: { label: 'Instagram', url: saved.instagram || '' },
    github: { label: 'GitHub', url: saved.github ?? 'https://github.com/bersudemir/dijital-ajans-web-projesi' }
  }
};
