# Dijital Ajans ve Yazılım Çözümleri — Başlangıç Paketi

Bu klasör, `Bootstrap Admin / HTML` şablonunun üzerine uygulanacak proje mimarisini içerir.

## Kullanım
1. Önce `danilo62x/bootstrap-admin-html` reposunu ZIP olarak indirip açın.
2. Orijinal şablon klasörünün bir yedeğini alın.
3. Bu paketteki `assets/js/app`, `assets/css/custom.css`, `docs` ve yeni HTML sayfalarını şablon klasörüne kopyalayın.
4. Her HTML sayfasında mevcut `assets/css/app.css` dosyasından sonra `assets/css/custom.css` yükleyin.
5. Projeyi doğrudan dosya olarak açmak yerine bir local server ile çalıştırın.

Örnek:
```bash
python -m http.server 5500
```
veya
```bash
npx serve .
```

## Mimari hedef
Bu dönem:
`UI -> Service -> Repository -> LocalStorage`

İkinci dönem:
`UI -> Service -> Repository -> REST API -> Backend -> Database`

UI katmanı doğrudan `localStorage` kullanmaz. Böylece gerçek backend geldiğinde sadece repository katmanı değiştirilir.
