# 🚀 KolayGider — Küçük İşletmeler İçin Gider Takip Sistemi (SaaS PWA)

KolayGider, küçük işletmelerin aylık ödemelerini, düzenli giderlerini ve harcama kategorilerini kolayca takip etmelerini sağlayan mobil odaklı (Mobile-First) bir SaaS web uygulamasıdır. 

PWA (Progressive Web App) desteği sayesinde mobil cihazlara uygulama gibi indirilebilir.

---

## 🌟 Öne Çıkan Özellikler

### 👑 Geliştirici / Super Admin Paneli
- **İşletme Yönetimi:** Sisteme yeni işletmeler ekleme, bilgilerini güncelleme ve hesaplarını dondurma/aktifleştirme.
- **Sistem İstatistikleri:** Toplam kayıtlı işletme ve aktif müşteri sayılarını izleme.

### 🏪 İşletme Sahibi Paneli (Müşteri Modülü)
- **Veri İzolasyonu:** Her işletme sahibi sadece kendi dükkanına ait harcamaları görür.
- **Gider & Ödeme Takibi:** Aylık faturalar, kira ve tedarik giderlerini kaydetme, ödeme durumunu (Ödendi / Bekliyor) yönetme.
- **Mobil Odaklı Tasarım:** Alt navigasyon çubuğu (Bottom Nav), hızlı gider ekleme butonu (FAB) ve mobil kart tasarımları.
- **PWA Desteği:** App Store / Play Store olmadan telefona "Ana Ekrana Ekle" butonuyla indirebilme.

---

## 🛠️ Teknolojiler

- **Frontend:** React + Vite
- **Stil & Tasarım:** Tailwind CSS + Lucide Icons
- **State Yönetimi:** Redux Toolkit
- **Mock REST API:** `json-server`
- **PWA Altyapısı:** `vite-plugin-pwa`

---

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleyin
npm install

### 2. Mock Sunucuyu (json-server) Başlatın
npx json-server --watch db.json --port 3000

### 3. Geliştirici Sunucusunu Çalıştırın
npm run dev

---

## 📱 PWA Test Etme
1. Projeyi derleyin: `npm run build`
2. Önizlemeyi başlatın: `npm run preview`
3. Chrome/Edge üzerinden İncele (F12) -> **Application** -> **Service Workers / Manifest** adımlarını takip ederek PWA durumunu kontrol edin.