# 🚀 KolayGider — Yeni Nesil İşletme Gider Yönetimi (SaaS PWA)

KolayGider, küçük ve orta ölçekli işletmelerin (KOBİ) gelir-gider dengesini kurmalarına, harcama kalemlerini takip etmelerine ve finansal durumlarını analiz etmelerine olanak tanıyan **mobil odaklı (Mobile-First)** bir SaaS (Software as a Service) web uygulamasıdır.

PWA (Progressive Web App) mimarisi ile tasarlanmış olup, bilgisayarda modern bir web paneli sunarken telefonda tam teşekküllü bir mobil uygulama gibi çalışır.

---

## 🌟 Projenin Amacı ve Kapsamı
Bu proje, karmaşık muhasebe programlarına ihtiyaç duymayan işletme sahipleri için basit, modern ve kullanıcı dostu bir arayüz ile geliştirilmiştir. Multi-tenant (Çoklu Kiracı) yapısı sayesinde tek bir platform üzerinde birden fazla işletme, verileri tamamen izole edilmiş biçimde kendi hesaplarını yönetebilir.

**Sistem 2 ana rolden oluşmaktadır:**
1. **Süper Yönetici (Admin):** Tüm sisteme kayıt olan işletmeleri denetler, onaylar, paketlerini ayarlar veya sistemden uzaklaştırır.
2. **İşletme Sahibi (Kullanıcı):** Sadece kendi dükkanına ait harcamaları girer, kategoriler oluşturur, raporlamaları takip eder.

---

## 🔐 Test İçin Yönetici (Admin) Bilgileri
Uygulamayı test edecek hocalarımız ve jüri üyeleri için ön tanımlı yönetici hesabı bilgileri:

> **Giriş Linki:** `https://kolay-gider.vercel.app/login`
> **E-Posta:** `admin@kolaygider.com`
> **Şifre:** `123456`

---

## 🛠️ Hocalarımız İçin Test Senaryosu (Önemli!)

Sistemin tam işleyişini görmek için aşağıdaki test senaryosunu adım adım uygulayabilirsiniz:

1. **Yeni İşletme Kaydı (Kayıt Ol Sayfası):**
   - Sistemin ana sayfasından "Kayıt Ol" butonuna basarak rastgele bir e-posta ve şifre ile yeni bir işletme oluşturun.
   - *Dikkat:* Kayıt olduğunuz an hesabınız **"Pending" (Beklemede)** durumuna düşer. Güvenlik gereği yeni kayıt olan işletmeler doğrudan sisteme giriş yapamazlar ("Yönetici onayı bekliyor" hatası alırlar).

2. **Yönetici Onayı:**
   - Yukarıda verilen **Admin hesabı** ile sisteme giriş yapın.
   - Sol menüden **"İşletmeler"** sayfasına gidin.
   - En üstteki "Onay Bekleyen İşletmeler" kutucuğunda az önce oluşturduğunuz hesabı göreceksiniz. **"Onayla"** butonuna tıklayın.
   - *(İsterseniz tablodan kalem ikonuna basarak bu işletmeye ait detayları güncelleyebilir veya silebilirsiniz).*
   - Sağ alt köşeden **Çıkış Yap** butonuna tıklayarak admin panelinden çıkın.

3. **Müşteri Paneline Giriş ve Kullanım:**
   - Onaylanan yeni hesabınızın e-posta ve şifresiyle sisteme tekrar giriş yapın.
   - İşletmeye özel Dashboard sizi karşılayacak. Buradan:
     - **Giderler:** Yeni harcama faturaları veya fişleri ekleyebilirsiniz.
     - **Düzenli Ödemeler:** Her ay tekrarlanan kira, aidat vb. giderleri tanımlayabilirsiniz.
     - **Kategoriler:** Harcamalarınızı gruplayabilirsiniz.
     - **Ayarlar:** Şifrenizi değiştirebilir, işletme bilgilerinizi güncelleyebilir ve telefondan indirmek için QR kodu okutabilirsiniz.

---

## 💻 Kullanılan Teknolojiler (Tech Stack)

### Frontend (Kullanıcı Arayüzü)
- **React.js:** Bileşen (component) tabanlı UI inşası.
- **Vite:** Çok hızlı geliştirme (dev-server) ve build aracı.
- **Tailwind CSS (v4):** Modern, Glassmorphism destekli şık ve tamamen responsive (mobil uyumlu) stil yönetimi.
- **Redux Toolkit:** Merkezi durum (state) yönetimi. `authSlice`, `businessSlice`, `expenseSlice` gibi modüllerle verilerin yönetilmesi.
- **React Router DOM (v6):** Sayfalar arası yönlendirme ve `RouteGuards` ile rol tabanlı (Admin vs User) sayfa güvenliği.
- **Lucide React:** Modern ikon seti kütüphanesi.
- **React Hot Toast:** Kullanıcıya işlemleri sonrasında şık bildirimler (toast) sunma.
- **Vite PWA Plugin:** Tarayıcı üzerinden mobil uygulama gibi yüklenebilme altyapısı (Service Worker & Manifest).

### Backend (API & Veritabanı)
- **JSON Server:** Projeye özel RESTful API simülasyonu.
- **Render.com:** Backend (API) kısmının uzak sunucuda canlı olarak host edilmesi. `https://kolaygider-api.onrender.com`
- **Vercel:** Frontend arayüzünün canlıya alınması. `https://kolay-gider.vercel.app`

---

## 📂 Proje Dosya Yapısı (Folder Structure)

Proje modern React dizin mimarisine uygun olarak modüler şekilde parçalanmıştır:

```text
KolayGider/
├── db.json                     # Render üzerinde çalışan RESTful API veritabanı.
├── index.html                  # React uygulamasının kök HTML dosyası.
├── package.json                # Proje bağımlılıkları ve çalıştırma scriptleri.
├── vercel.json                 # Vercel üzerinde React Router 404 hatalarını önleyen yönlendirme ayarı.
├── src/
│   ├── main.jsx                # React DOM render ve Redux Provider sarıcısı.
│   ├── App.jsx                 # Tüm sayfa rotalarının (Routing) tanımlandığı ana dosya.
│   ├── index.css               # Tailwind CSS baz ayarları ve Glassmorphism class'ları.
│   │
│   ├── components/             # Tekrar kullanılabilen bağımsız UI parçaları
│   │   ├── layout/             # Header, Sidebar, BottomNav, MainLayout gibi iskelet bileşenleri.
│   │   └── modals/             # Düzenli Ödeme Ekleme, Kategori, Confirm ve İşletme Güncelleme (BusinessModal) pencereleri.
│   │
│   ├── pages/                  # Sayfa bazlı ana bileşenler
│   │   ├── admin/              # Super Admin'e özel sayfalar (İşletmeler, Abonelikler, Ayarlar vb.)
│   │   ├── business/           # İşletme Sahiplerine özel sayfalar (Dashboard, Giderler, Kategoriler, Ayarlar)
│   │   ├── LandingPage.jsx     # Sisteme üye olmayanlar için tanıtım sayfası.
│   │   ├── Login.jsx           # Giriş sayfası.
│   │   └── Register.jsx        # Kayıt sayfası.
│   │
│   ├── routes/
│   │   └── RouteGuards.jsx     # Güvenlik! Sadece yetkisi olanların sayfalara girmesini sağlayan koruyucu katman.
│   │
│   └── store/                  # Redux Toolkit State Yönetimi Merkezi
│       ├── index.js            # Store yapılandırması.
│       ├── slices/             # İş mantıklarının ve API isteklerinin (Thunk) tutulduğu slice'lar
│       │   ├── authSlice.js    # Giriş, çıkış, yetkilendirme ve şifre güncelleme.
│       │   ├── businessSlice.js# İşletme listeleme, onaylama, güncelleme, silme.
│       │   └── expenseSlice.js # İşletmelere ait giderlerin yönetimi.
```

---

## ✨ Tasarım Felsefesi
Bu projede kullanıcı deneyimi (UX) en ön planda tutulmuştur. **"Sıkıcı muhasebe"** konseptinden uzaklaşılmış, **Koyu Tema (Dark Mode)** üzerine kurulan **Glassmorphism (Buzlu cam)** detaylarıyla çok daha **Premium** bir his elde edilmiştir.

Hem admin yetkililerinin kolayca binlerce işletmeyi yönetebilmesi hem de işletme sahiplerinin ceplerindeki telefondan 2 tıkla giderlerini kaydedebilmesi amacıyla **Mobil Öncelikli (Mobile-First)** geliştirme prensipleri kullanılmıştır.