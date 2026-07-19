import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Receipt, ShieldCheck, Wallet } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-xl">
                K
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                KolayGider
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-sky-400 transition-colors">Özellikler</a>
              <a href="#how-it-works" className="hover:text-sky-400 transition-colors">Nasıl Çalışır?</a>
              <a href="#pricing" className="hover:text-sky-400 transition-colors">Fiyatlandırma</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Giriş Yap
              </Link>
              <Link to="/login" className="text-sm font-medium bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full hover:bg-white transition-colors shadow-lg shadow-white/10 hidden sm:block">
                Ücretsiz Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
            <div className="w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
            <div className="w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">
              İşletmenizin Finansal Kontrolü <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Artık Sizin Elinizde
              </span>
            </h1>
            <p className="mt-4 text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Küçük ve orta ölçekli işletmeler için tasarlanmış profesyonel gider takip platformu. 
              Giderlerinizi kaydedin, bütçenizi planlayın ve her ay ne kadar kâr ettiğinizi saniyeler içinde görün.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login" className="bg-sky-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2">
                Hemen Ücretsiz Başla <ArrowRight size={20} />
              </Link>
              <a href="#features" className="bg-slate-800/50 text-slate-200 border border-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center">
                Özellikleri Keşfet
              </a>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl bg-slate-900/50">
              <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Akıllı Raporlama</h3>
              <p className="text-slate-400">Giderlerinizi otomatik kategorize edin ve anlaşılır grafiklerle aylık nakit akışınızı anında analiz edin.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl bg-slate-900/50">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                <Receipt size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kolay Fatura Takibi</h3>
              <p className="text-slate-400">Fiş ve faturalarınızın fotoğraflarını çekip sisteme yükleyin, kağıt karmaşasından kalıcı olarak kurtulun.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl bg-slate-900/50">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tam Güvenlik</h3>
              <p className="text-slate-400">Tüm finansal verileriniz uçtan uca şifrelenir ve sadece sizin erişebileceğiniz özel sunucularda güvenle saklanır.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
