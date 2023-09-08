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

Email Alabilmek için [EmailJs](https://www.emailjs.com/) Sayfasından hesap ve servis oluşturmanız gerekiyor. Daha sonrasında bir template oluşturarak size nasıl bir Email gelmesini istiyorsanız onu ayarlamanız gerekmektedir Eğer Fotoğraf özelliğin kullanmak istiyorsanız Template'in içine "{context}" yazısını yazmanız gerekmektedir. Aksi taktirde Fotorafınız mailin içerisine aktarılamayacaktır. Kurduğunuz servisi kullanabilmek için önceki adımda kurduğunuz Exeyi açıp System settings buttonuna basmalısınız. Gerekli alanları doldurduktan sonra Save butonuna bastıktan sonra sistem ayarlarınız biticektir.

#### Profil oluşturma

Önünüzde bulunan "Create New Profile" Buttonuna basarak yeni bir profil oluşturabilirsiniz eğer önünüzde yoksa sol üst köşedeki Configirations kısmından Profiles kısmına tıklayarak açabilirsiniz. Açtığınız anda sizin için örnek bir Profil ile birlikte açılacaktır. Kendiniz yeni bir profil oluşturmak isterseniz "Create New one" Butonuyla oluşturabilir "Delete" Butonuyola silebilirsiniz.


