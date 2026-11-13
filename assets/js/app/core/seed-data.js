export const serviceSeed = [
  {
    id: 1,
    slug: 'web-tasarim-gelistirme',
    title: 'Web Tasarım ve Geliştirme',
    shortDescription: 'Modern, hızlı ve responsive kurumsal web çözümleri.',
    description: 'Marka kimliğine uygun, kullanıcı deneyimini ve performansı merkeze alan web projeleri geliştiriyoruz.',
    price: 15000,
    image: 'assets/images/services/web-development.jpg',
    features: ['Responsive tasarım', 'SEO uyumlu yapı', 'Performans optimizasyonu'],
    active: true
  },
  {
    id: 2,
    slug: 'mobil-uygulama',
    title: 'Mobil Uygulama Geliştirme',
    shortDescription: 'İş süreçlerine uygun mobil uygulama çözümleri.',
    description: 'Kullanıcı odaklı arayüz ve sürdürülebilir yazılım mimarisi ile mobil çözümler tasarlıyoruz.',
    price: 30000,
    image: 'assets/images/services/mobile-app.jpg',
    features: ['UI/UX tasarımı', 'API entegrasyonu', 'Test ve yayın desteği'],
    active: true
  },
  {
    id: 3,
    slug: 'kurumsal-yazilim',
    title: 'Kurumsal Yazılım Çözümleri',
    shortDescription: 'İş süreçlerini dijitalleştiren özel yazılım çözümleri.',
    description: 'Kurumun ihtiyacına göre ölçeklenebilir yönetim ve otomasyon yazılımları geliştiriyoruz.',
    price: 45000,
    image: 'assets/images/services/enterprise-software.jpg',
    features: ['İhtiyaç analizi', 'Modüler mimari', 'Raporlama ve dashboard'],
    active: true
  }
];

export const announcementSeed = [
  { id: 1, title: 'Yeni Kurumsal Web Paketimiz Yayında', summary: 'Kurumsal web çözümlerimiz güncellendi.', content: 'Yeni paket kapsamında responsive tasarım, performans ve temel SEO çalışmaları birlikte sunulmaktadır.', publishedAt: '2026-10-20T10:00:00', active: true },
  { id: 2, title: 'Mobil Uygulama Danışmanlığı', summary: 'Yeni danışmanlık hizmetimiz başladı.', content: 'Mobil ürün fikrinden yayın sürecine kadar teknik danışmanlık hizmeti sunuyoruz.', publishedAt: '2026-10-15T10:00:00', active: true },
  { id: 3, title: 'UI/UX Tasarım Sürecimiz Yenilendi', summary: 'Yeni prototipleme yaklaşımımızı devreye aldık.', content: 'Kullanıcı testleri ve prototipleme adımlarını proje sürecimize daha erken dahil ediyoruz.', publishedAt: '2026-10-10T10:00:00', active: true },
  { id: 4, title: 'Bakım ve Destek Paketleri', summary: 'Aylık bakım paketlerimiz güncellendi.', content: 'Web ve yazılım projeleri için düzenli bakım, güvenlik kontrolü ve içerik desteği sağlanmaktadır.', publishedAt: '2026-10-05T10:00:00', active: true },
  { id: 5, title: 'Yeni Proje Başvuruları Açıldı', summary: 'Yeni dönem proje taleplerini kabul ediyoruz.', content: 'Web, mobil ve kurumsal yazılım projeleri için ön görüşme formu üzerinden başvuru yapılabilir.', publishedAt: '2026-10-01T10:00:00', active: true }
];
