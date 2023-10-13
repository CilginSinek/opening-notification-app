# Opening Notification App

![AppView!](https://github.com/CilginSinek/opening-notification-app/blob/main/assets/App.png?raw=true)

## İçerik
- [Açıklama-Kullanım](#Açıklama-Kullanım)
- [Kullanılan Teknolojiler](#KullanilanTeknolojiler)

## Açıklama-Kullanım

### Açıklama

Bilgisayarınız açıldığında size mail atan bir uygulamadır. Eğer isterseniz sorgu sistemiyle kontrollü bir şekilde bildirim atma özelliği mevcuttur. Şimdilik AutoUpdater özelliği yoktur. Uygulama bütün pencereleri kapattığınızda Icon olarak çalışmaya devam edecektir ve sadece Windows desteği vardır.

### Kullanım

#### Kurulum
[Exe](https://github.com/CilginSinek/opening-notification-app/releases/tag/v1.0.0) dosyasını çalıştırarak ya da

Kodu indirdikten sonra dosya konumunda
```bash
npm install && npm run make
```
#### Sistem ayarları

Email Alabilmek için Google hesabınızdan bir "Uygulama Parolası" oluşturmanız gerekmektedir. Bu parolayı mail hesabınızla birlikte sistem ayarlarına yazarak mail alabilirsiniz.

#### Profil oluşturma

Önünüzde bulunan "Create New Profile" Buttonuna basarak yeni bir profil oluşturabilirsiniz eğer önünüzde yoksa sol üst köşedeki Configirations kısmından Profiles kısmına tıklayarak açabilirsiniz. Açtığınız anda sizin için örnek bir Profil ile birlikte açılacaktır. Kendiniz yeni bir profil oluşturmak isterseniz "Create New one" Butonuyla oluşturabilir "Delete" Butonuyola silebilirsiniz.

## Kullanılan Teknolojiler
- ElectronJS
- Nodemailer
- Node-Webcam
