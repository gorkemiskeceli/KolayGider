import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Building2, Phone, Check } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newBusiness = {
      ...formData,
      id: `biz_${Date.now()}`,
      status: 'pending', // Requires admin approval
      tier: 'Basic',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('https://kolaygider-api.onrender.com/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBusiness)
      });
      
      if (!response.ok) throw new Error('Kayıt oluşturulamadı');
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans selection:bg-sky-500/30">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center border-r border-slate-800">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
          <div className="w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
          <div className="w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 max-w-lg p-12">
           <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-2xl">
              K
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">
              KolayGider
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            İşletmenizi bir adım <br /><span className="text-emerald-400">öne taşıyın.</span>
          </h2>
          <p className="text-lg text-slate-400">
            Dakikalar içinde hesabınızı oluşturun ve finansal süreçlerinizi dijitalleştirin.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg text-xl">
              K
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              KolayGider
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center lg:text-left">Hesap Oluştur</h2>
          <p className="text-slate-400 mb-8 text-center lg:text-left">Yeni bir işletme hesabı açmak için bilgileri doldurun.</p>

          {error && (
            <div className="p-3 mb-6 bg-rose-500/10 border border-rose-500/50 text-rose-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded-2xl text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Kayıt Başarılı!</h3>
              <p className="text-sm">Hesabınız yönetici onayına gönderildi. Giriş sayfasına yönlendiriliyorsunuz...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">İşletme Adı</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required name="businessName" value={formData.businessName} onChange={handleChange} type="text" placeholder="Örn: Yılmaz Restoran" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Yetkili Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required name="ownerName" value={formData.ownerName} onChange={handleChange} type="text" placeholder="Ahmet Yılmaz" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="0555 555 5555" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="isim@sirket.com" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-500 text-white rounded-xl py-3.5 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25 flex justify-center items-center gap-2 mt-6 disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Kayıt Ol'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-slate-400 text-sm">
            Zaten hesabınız var mı? <Link to="/login" className="font-semibold text-white hover:text-sky-400">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
