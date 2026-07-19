import { useEffect, useState } from 'react';
import { CreditCard, Search, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/subscriptions')
      .then(r => r.json())
      .then(data => setSubscriptions(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Abonelik Yönetimi</h2>
          <p className="text-sm text-slate-400">Platformu kullanan işletmelerin ödeme ve paket durumları.</p>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input type="text" placeholder="Abonelik veya işletme ara..." className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-slate-100 transition-colors">
          <Filter size={16} />
          <span>Filtrele</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase font-medium text-slate-400 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4">İşletme ID</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Döngü</th>
                <th className="px-6 py-4 text-right">Tutar</th>
                <th className="px-6 py-4 text-center">Durum</th>
                <th className="px-6 py-4 text-right">Sonraki Fatura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{sub.businessId}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                      sub.plan === 'Enterprise' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' : 
                      sub.plan === 'Pro' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20' : 
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize">{sub.billingCycle}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-100">₺{sub.price}</td>
                  <td className="px-6 py-4 text-center">
                    {sub.status === 'active' ? (
                       <span className="flex items-center justify-center gap-1 text-emerald-400"><CheckCircle2 size={16}/> Aktif</span>
                    ) : (
                       <span className="flex items-center justify-center gap-1 text-rose-400"><AlertCircle size={16}/> Gecikmiş</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">{new Date(sub.nextBillingDate).toLocaleDateString('tr-TR')}</td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr>
                   <td colSpan="6" className="px-6 py-8 text-center text-slate-500">Kayıt bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
