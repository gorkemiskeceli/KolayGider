import { useState, useEffect } from 'react';
import { Settings, Image as ImageIcon, Smartphone } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';

export default function SettingsPage() {
  const { user } = useSelector((state) => state.auth);
  const [deferredPrompt, setDeferredPrompt] = useState(window.deferredPWAInstallPrompt || null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error("Otomatik yükleme engellendi. Lütfen adres çubuğundaki 'Yükle' ikonunu kullanın.", { duration: 5000 });
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      window.deferredPWAInstallPrompt = null;
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">İşletme Ayarları</h2>
        <p className="text-sm text-slate-400">Profil ve dükkan bilgilerinizi güncelleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-700/50 pb-2">Genel Bilgiler</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-500 overflow-hidden relative group cursor-pointer">
                <ImageIcon size={32} />
                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition-all">
                  <span className="text-[10px] text-white">Yükle</span>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 bg-slate-800 text-sm text-slate-200 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">Logo Yükle</button>
                <p className="text-xs text-slate-500 mt-2">Önerilen boyut: 256x256px</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">İşletme Adı</label>
                <input type="text" defaultValue={user?.businessName || "Yılmaz Restoran"} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Vergi Dairesi</label>
                  <input type="text" defaultValue="Beyoğlu VD" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Vergi Numarası</label>
                  <input type="text" defaultValue="1234567890" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">E-Posta</label>
                <input type="email" defaultValue={user?.email || "ahmet@yilmazrestoran.com"} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">Değişiklikleri Kaydet</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border-indigo-500/20">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
              <Smartphone size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Uygulamayı İndir (PWA)</h3>
            <p className="text-sm text-slate-400 mb-4">KolayGider'i telefonunuza veya bilgisayarınıza uygulama olarak yükleyin ve internetiniz yokken bile kullanın.</p>
            <button 
              onClick={handleInstallClick} 
              className="w-full py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 font-medium text-sm"
            >
              Uygulamayı Yükle
            </button>

            <div className="mt-6 pt-6 border-t border-indigo-500/20">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 text-center">Telefondan Test Et</h4>
              <div className="bg-white p-3 rounded-xl inline-block w-full flex justify-center">
                <QRCode value={`http://192.168.0.3:${window.location.port}`} size={150} />
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Telefonunuzun kamerasıyla bu kodu okutarak yerel ağ üzerinden uygulamaya erişebilirsiniz. <br/>
                <span className="text-indigo-400 mt-1 inline-block">Not: Bilgisayarınız ve telefonunuz aynı Wi-Fi ağına bağlı olmalıdır. Terminalde projeyi yeniden başlatmanız gerekebilir.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
