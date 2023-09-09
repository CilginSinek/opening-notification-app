# Opening Notification App

![AppView!](https://github.com/CilginSinek/opening-notification-app/blob/main/assets/App.png?raw=true)

## İçerik
- [Açıklama-Kullanım](#Kullanim-Aciklama)
- [Kullanılan Teknolojiler](#KullanilanTeknolojiler)

## Açıklama-Kullanım

### Açıklama

Hala betada olan uygulama Şuanlık Başlangıçta otomatik çalışmıyor, AutoUpdater yok ve Paket Exe oluşturulmadı. Uygulama bütün pencereleri kapattığınızda Icon olarak çalışmaya devam edecektir ve sadece Windows desteği vardır.

### Kullanım

#### Kurulum

Kodu indirdikten sonra dosya konumunda
```bash
npm install && npm run make
```
#### Sistem ayarları

Email Alabilmek için [SendGrid](https://sendgrid.com/) sitesine giderek ilk başta hesap oluşturmanız gerekiyor. Hesap oluşturduktan sonra bir API key oluşturmanız ve Mail gönderici Mail adresini doğrulamanız gerek. Bunları Uygulamada kaydedip Email alabilirsiniz.

#### Profil oluşturma

Önünüzde bulunan "Create New Profile" Buttonuna basarak yeni bir profil oluşturabilirsiniz eğer önünüzde yoksa sol üst köşedeki Configirations kısmından Profiles kısmına tıklayarak açabilirsiniz. Açtığınız anda sizin için örnek bir Profil ile birlikte açılacaktır. Kendiniz yeni bir profil oluşturmak isterseniz "Create New one" Butonuyla oluşturabilir "Delete" Butonuyola silebilirsiniz.

## Kullanılan Teknolojiler
- ElectronJS
- SendGrid
- Node-Webcam