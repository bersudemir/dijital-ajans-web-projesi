# Mimari Notları

## Neden katmanlı yapı?
Projenin bu dönem server-side backend'i yoktur. Buna rağmen UI kodu doğrudan LocalStorage'a bağlanmaz. Amaç ikinci dönemde REST API geldiğinde public/admin ekranlarını yeniden yazmadan veri kaynağını değiştirmektir.

### Katmanlar
1. **Model**: Service, Announcement vb. veri sözleşmeleri.
2. **Repository**: verinin nereden geldiğini/saklandığını soyutlar.
3. **Service**: iş kuralları ve sıralama/filtreleme gibi uygulama davranışları.
4. **Page Controller**: DOM ile konuşur; veriyi service katmanından alır.

## SOLID karşılığı
- **SRP**: Her sınıf tek sorumluluğa sahip.
- **OCP**: LocalStorage repository yerine API repository eklenebilir.
- **LSP**: Aynı repository sözleşmesini uygulayan farklı veri kaynakları değiştirilebilir.
- **ISP**: Sayfalar yalnızca ihtiyaç duyduğu servisleri kullanır.
- **DIP**: Service, veri kaynağının ayrıntısını değil repository soyutlamasını kullanır.

## Bu dönem yapılmaması gerekenler
- HTML içinde büyük veri dizileri tutmak.
- Her sayfada LocalStorage erişimini tekrar etmek.
- Admin ve public için farklı veri kopyaları üretmek.
- Dosya yollarını gelişigüzel çoğaltmak.
- Gerçek backend varmış gibi güvenlik iddiasında bulunmak.
