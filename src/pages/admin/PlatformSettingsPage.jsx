import { Settings, Shield, Globe, BellRing, Database } from 'lucide-react';

export default function PlatformSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Platform Ayarları</h2>
        <p className="text-sm text-slate-400">Sistem geneli yapılandırmalar ve bakım seçenekleri.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <Globe className="text-sky-400" size={24} />
            <h3 className="text-lg font-bold text-slate-100">Genel Yapılandırma</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Platform Adı</label>
              <input type="text" defaultValue="KolayGider" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Destek E-postası</label>
              <input type="email" defaultValue="destek@kolaygider.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-indigo-500 outline-none" />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Ayarları Kaydet
            </button>
          </div>
        </div>

        {/* Security & Maintenance */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <Shield className="text-rose-400" size={24} />
            <h3 className="text-lg font-bold text-slate-100">Bakım ve Güvenlik</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div>
                <h4 className="font-bold text-slate-200">Bakım Modu</h4>
                <p className="text-xs text-slate-400">Sistemi kullanıcılara geçici olarak kapatır.</p>
              </div>
              <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0.5 top-0.5 transition-all"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div>
                <h4 className="font-bold text-slate-200">Kayıt Alımı</h4>
                <p className="text-xs text-slate-400">Yeni işletme kayıtlarını açık tutar.</p>
              </div>
              <div className="w-12 h-6 bg-indigo-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-all"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Stats */}
        <div className="glass-panel p-6 rounded-2xl md:col-span-2 flex justify-between items-center">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-sky-400">
                <Database size={24} />
             </div>
             <div>
               <h4 className="font-bold text-slate-100">Veritabanı Durumu</h4>
               <p className="text-sm text-slate-400">Kullanılan Alan: 2.4 GB / 50 GB</p>
             </div>
           </div>
           <button className="px-4 py-2 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors">Yedek Al</button>
        </div>
      </div>
    </div>
  );
}
