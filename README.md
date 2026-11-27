# NovaSoft Ajans

## Proje Hakkında

NovaSoft Ajans, Web Tasarımı dersi kapsamında geliştirilen kurgusal bir dijital ajans sitesidir. Ziyaretçiler hizmetleri ve duyuruları inceleyebilir, istatistikleri görebilir ve iki ayrı iletişim formunu kullanabilir. Yönetim paneli, site içeriklerinin tarayıcı üzerinden düzenlenmesini sağlar.

![NovaSoft Ajans ana sayfası: lacivert giriş bölümü, dijital ürün illüstrasyonu ve dört istatistik kartı](docs/screenshots/ana-sayfa.png)

Ekran görüntüleri: [Hizmetler](docs/screenshots/hizmetler.png), [İletişim](docs/screenshots/iletisim.png), [Yönetici girişi](docs/screenshots/yonetici-girisi.png), [Yönetim paneli](docs/screenshots/yonetim-paneli.png).

## Canlı Demo

- [Canlı site](https://bersudemir.github.io/dijital-ajans-web-projesi/)
- [Yönetici girişi](https://bersudemir.github.io/dijital-ajans-web-projesi/admin/giris.html)
- [GitHub deposu](https://github.com/bersudemir/dijital-ajans-web-projesi)

## Kullanılan Teknolojiler

| Teknoloji | Projedeki kullanımı |
| --- | --- |
| HTML5 ve CSS3 | Sayfa yapısı, duyarlı yerleşim ve görsel düzen |
| Bootstrap 5 | Izgara, mobil menü, hizmet slider’ı, modallar ve form bileşenleri |
| JavaScript ES modülleri | Sayfa etkileşimleri, form doğrulama, veri okuma ve yönetim işlemleri |
| Yerel SVG | Ajans ve hizmet illüstrasyonları ile tarayıcıda çizilen grafikler |
| LocalStorage ve SessionStorage | Site kayıtları, form başvuruları ve sekmeye ait giriş işareti |

## Hazır Şablon ve Özelleştirmeler

[Bootstrap Admin / HTML](https://github.com/danilo62x/bootstrap-admin-html) şablonunun bileşenleri ve yönetim paneli yerleşimi kullanıldı. Şablonun `assets/css/app.css` dosyası korundu. Ajansa özgü lacivert giriş ve çağrı bölümleri, kart stilleri ve erişilebilirlik ayarları `assets/css/custom.css` dosyasında yer alır. Ana sayfa illüstrasyonu ve hizmet görselleri depodaki SVG dosyalarından yüklenir.

## Site Sayfaları ve Özellikler

| Sayfa | İçerik |
| --- | --- |
| [Ana Sayfa](index.html) | Ajans tanıtımı, dört gösterge, 5 saniyede ilerleyen hizmet slider’ı ve modalda açılan duyurular |
| [Hakkımızda](hakkimizda.html) ve [Misyon & Vizyon](misyon-vizyon.html) | Ajansın çalışma yaklaşımı, hedefleri ve değerleri |
| [Hizmetler](hizmetler.html) ve [Hizmet Detayı](hizmet-detay.html?slug=web-tasarim-gelistirme) | Aktif hizmetler, kapsam, görsel, başlangıç ücreti ve teklif bağlantısı |
| [Birimler](birimler.html) | Yazılım geliştirme, UI/UX tasarım ve dijital pazarlama ekipleri |
| [Duyurular](duyurular.html) | Yayındaki duyuruların yeniden eskiye sıralanmış listesi |
| [Sayılarla Ajans](sayilarla-ajans.html) | Yıllık proje sayıları, hizmet dağılımı ve müşteri memnuniyetini gösteren SVG grafikler |
| [İletişim](iletisim.html) | İletişim bilgileri, harita ve birbirinden bağımsız iki form |

**Teklif talebi** hizmet detayından açıldığında ilgili aktif hizmeti otomatik seçer. **Şikâyet ve öneri** formu ayrı çalışır. Geçerli başvurular tarayıcının `localStorage` alanına kaydedilir. Alıcı, konu ve mesaj e-posta gönderimine uygun biçimde hazırlanır; gerçek e-posta gönderimi yapılmaz. Kayıtlar yalnızca kullanılan tarayıcıda görülebilir.

## Yönetim Paneli

- **Giriş sayfası** [`admin/giris.html`](admin/giris.html)
- **Demo kullanıcı adı** `admin`
- **Demo şifre** `123`

Demo bilgileri JavaScript kodunda görülebilir. Bu giriş gerçek kimlik doğrulama veya güvenlik sağlamaz. Uygulama giriş bilgilerini saklamaz ve `sessionStorage` alanında yalnızca sekmeye ait oturum işaretini tutar.

Panelde hizmet, duyuru ve birim kayıtları eklenebilir, düzenlenebilir ve silinebilir. Hizmetlerde yerel SVG seçilebilir. Küçük duyuru ekleri (dosya başına en fazla 256 KB) tarayıcıda saklanır ve ziyaretçi sayfalarından indirilebilir. Sayfa İçerikleri ekranı kurumsal metinleri, iletişim bilgilerini ve harita adresini; İstatistikler ekranı ana sayfa göstergelerini ve SVG grafik verilerini günceller. Bu kayıtlar `localStorage` alanında saklanır ve sayfa yenilendiğinde korunur.

## Kurulum ve Çalıştırma

Projeyi klonlayın ve yerel bir HTTP sunucusuyla açın. Örneğin, Python 3 kuruluysa şu komutları kullanabilirsiniz:

```bash
git clone https://github.com/bersudemir/dijital-ajans-web-projesi.git
cd dijital-ajans-web-projesi
python -m http.server 8000
```

[http://localhost:8000/](http://localhost:8000/) adresi ana sayfayı, [http://localhost:8000/admin/giris.html](http://localhost:8000/admin/giris.html) yönetici girişini açar. VS Code Live Server da kullanılabilir. JavaScript modüllerinin yüklenmesi için dosyaları doğrudan açmak yerine HTTP üzerinden çalıştırın.

```text
dijital-ajans-web-projesi/
├── *.html                  Ziyaretçi sayfaları
├── admin/                  Demo giriş ve yönetim ekranları
├── assets/
│   ├── css/                 Şablon ve projeye özel stiller
│   ├── images/              Yerel SVG illüstrasyonlar
│   └── js/app/
│       ├── core/            Başlangıç verileri, kurulum ve depolama bağdaştırıcısı
│       ├── models/          Hizmet ve duyuru veri modelleri
│       ├── pages/           Ziyaretçi ve yönetim ekranı modülleri
│       ├── repositories/    Kayıt okuma ve yazma
│       └── services/        Hizmet ve duyuru kuralları
├── docs/screenshots/        Gerçek site ekran görüntüsü
└── LICENSE                  Şablonun MIT lisansı
```

## Kullanıcı Akış Diyagramı

```mermaid
flowchart TD
    Visitor["Ziyaretçi"] --> Home["Ana sayfa ve menü"]
    Home --> Services["Hizmet listesi veya slider"]
    Services --> Detail["Hizmet detayı"]
    Detail --> Quote["Teklif formu: hizmet otomatik seçilir"]
    Quote --> SavedQuote["Teklif talebi tarayıcıya kaydedilir"]
    Home --> Contact["İletişim sayfası"]
    Contact --> Feedback["Şikâyet ve öneri formu"]
    Feedback --> SavedFeedback["Mesaj tarayıcıya kaydedilir"]
    Home --> Content["Duyurular ve istatistikler"]

    Admin["Yönetici"] --> Login["Demo giriş"]
    Login --> Valid{"Demo bilgileri doğru mu?"}
    Valid -->|Evet| Dashboard["Yönetim paneli"]
    Valid -->|Hayır| Error["Hata mesajı"]
    Error --> Login
    Dashboard --> Manage["Hizmet, duyuru, birim, içerik ve istatistikleri yönet"]
    Dashboard --> Logout["Çıkış yap"]
    Logout --> Login
```

## Sistem Mimarisi ve Veri Akış Diyagramı

Sayfa modülleri hizmet ve duyuru verilerine ilgili servis üzerinden ulaşır. Servisler, kayıtları repository katmanına iletir. Repository katmanı tarayıcı depolamasına `LocalStorageAdapter` ile erişir. `bootstrap-app.js` bu modülleri birleştirir ve koleksiyon anahtarları henüz yoksa başlangıç verilerini ekler.

```mermaid
flowchart LR
    ServicePages["Hizmet sayfaları ve services-admin-page.js"] --> ServiceService["ServiceService"]
    AnnouncementPages["Duyuru sayfaları ve announcements-admin-page.js"] --> AnnouncementService["AnnouncementService"]
    ServiceService --> ServiceRepository["ServiceRepository"]
    AnnouncementService --> AnnouncementRepository["AnnouncementRepository"]
    ServiceRepository --> BaseRepository["BaseRepository"]
    AnnouncementRepository --> BaseRepository
    BaseRepository --> Adapter["LocalStorageAdapter"]
    Adapter --> Storage[("Tarayıcı LocalStorage")]
```

## Projenin Sınırlılıkları

- Kayıtlar ve form başvuruları tarayıcıya ve site adresine özeldir. Farklı cihazlar veya tarayıcı profilleri arasında eşitlenmez.
- Demo oturumu istemci tarafında çalışır. Projede sunucu tarafı kimlik doğrulama ve veritabanı bulunmaz.
- İletişimde gösterilen Umuttepe Yerleşkesi konumu eğitim projesi için seçilmiştir; NovaSoft Ajans’ın gerçek ofisi veya üniversiteyle kurumsal bağı olarak değerlendirilmemelidir.
- Formlar alıcı, konu ve mesajı hazırlar ve yerel kayıt oluşturur; e-posta göndermez. Duyuru ekleri küçük dosyalarla ve tarayıcının depolama kotasıyla sınırlıdır.
- Bootstrap JavaScript paketi ve harita gibi dış kaynakların yüklenmesi internet bağlantısına bağlıdır.

## Lisans

Kullanılan [Bootstrap Admin / HTML şablonu](https://github.com/danilo62x/bootstrap-admin-html) MIT lisanslıdır. Orijinal lisans ve telif bildirimi [`LICENSE`](LICENSE) dosyasında yer alır.
