# NovaSoft Ajans

NovaSoft Ajans, Web Tasarımı dersi kapsamında hazırladığım dijital ajans web sitesi projesidir. Projede bir yazılım ve dijital hizmet ajansının tanıtım sitesi ile yönetici paneli tasarlanmıştır.

Web sitesi responsive olarak hazırlanmıştır. Böylece bilgisayar, tablet ve telefon ekranlarında kullanılabilir.

## Kullanılan Teknolojiler

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- LocalStorage

## Web Sitesi

Web sitesinde aşağıdaki bölümler bulunmaktadır:

- **Ana Sayfa:** Ajans tanıtımı, otomatik geçişli hizmet slider'ı ve güncel duyurular.
- **Hakkımızda:** Ajans hakkında bilgiler ve çalışma yaklaşımı.
- **Misyon ve Vizyon:** Ajansın hedefleri ve temel değerleri.
- **Hizmetler:** Sunulan hizmetler, açıklamaları, görselleri ve fiyat bilgileri.
- **Birimler:** Ajansın çalışma birimleri ve görevleri.
- **Duyurular:** Güncel duyuruların listelendiği sayfa.
- **Sayılarla Ajans:** Ajansa ait istatistikler ve grafikler.
- **İletişim:** İletişim bilgileri, harita ve şikâyet/öneri formu.

## Yönetici Paneli

Yönetici paneline `admin/index.html` dosyasından ulaşılabilir.

Panel üzerinden hizmet ve duyuru kayıtları eklenebilir, düzenlenebilir ve silinebilir. Hizmetler için görsel seçimi de yapılabilir.

Hizmet ve duyuru kayıtları tarayıcının **LocalStorage** alanında saklanmaktadır. Diğer yönetim ekranlarında içerik ve form tasarımları bulunmaktadır.

## Projeyi Çalıştırma

Proje dosyaları Visual Studio Code ile açılabilir. `index.html` dosyası, Live Server gibi bir yerel web sunucusu kullanılarak çalıştırılabilir.

- **Ana sayfa:** `index.html`
- **Yönetici paneli:** `admin/index.html`

Proje HTML, CSS ve JavaScript ile hazırlandığı için veritabanı veya sunucu tarafında çalışan bir uygulama gerektirmez.

## Kullanılan Hazır Şablon

Projede [Bootstrap Admin / HTML](https://github.com/danilo62x/bootstrap-admin-html) açık kaynak şablonu kullanılmış ve dijital ajans temasına uygun olarak düzenlenmiştir.

Şablonun MIT lisans bilgileri `LICENSE` dosyasında bulunmaktadır.
