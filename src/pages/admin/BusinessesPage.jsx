import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, MoreVertical, Edit2, ShieldAlert, CheckCircle } from 'lucide-react';
import { fetchBusinesses, updateBusinessStatus } from '../../store/slices/businessSlice';

export default function BusinessesPage() {
  const dispatch = useDispatch();
  const { items: businesses, status } = useSelector((state) => state.business);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBusinesses());
    }
  }, [dispatch, status]);

  const handleApprove = (id) => {
    dispatch(updateBusinessStatus({ id, status: 'active' }));
  };

  const pendingBusinesses = businesses.filter(b => b.status === 'pending');
  const activeBusinesses = businesses.filter(b => b.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">İşletmeler</h2>
          <p className="text-sm text-slate-400">Platformdaki tüm kiracıları (tenants) yönetin.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
          <Plus size={18} />
          <span>Yeni İşletme Ekle</span>
        </button>
      </div>

      {pendingBusinesses.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-sky-500/30">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span> Onay Bekleyen İşletmeler
          </h3>
          <div className="space-y-3">
            {pendingBusinesses.map((biz) => (
              <div key={biz.id} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div>
                  <h4 className="font-bold text-slate-200">{biz.businessName} <span className="text-xs text-slate-500 font-normal">({biz.id})</span></h4>
                  <p className="text-sm text-slate-400">{biz.ownerName} - {biz.email} - {biz.phone}</p>
                </div>
                <button 
                  onClick={() => handleApprove(biz.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                  <CheckCircle size={18} /> Onayla
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase font-medium text-slate-400 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4">İşletme Adı</th>
                <th className="px-6 py-4">Yetkili</th>
                <th className="px-6 py-4 text-center">Paket</th>
                <th className="px-6 py-4 text-center">Durum</th>
                <th className="px-6 py-4">Kayıt Tarihi</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {activeBusinesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-200">
                    <div className="flex flex-col">
                      <span>{biz.businessName}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{biz.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-200">{biz.ownerName}</span>
                      <span className="text-xs text-slate-400">{biz.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                      biz.tier === 'Enterprise' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                      biz.tier === 'Pro' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                      'bg-slate-700 text-slate-300 border-slate-600'
                    }`}>
                      {biz.tier || 'Basic'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {biz.status === 'active' ? (
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Aktif</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full text-xs font-medium border border-rose-500/20">Pasif</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{new Date(biz.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-sky-400 bg-slate-800 rounded-md transition-colors"><Edit2 size={16} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-md transition-colors"><ShieldAlert size={16} /></button>
                  </td>
                </tr>
              ))}
              {activeBusinesses.length === 0 && (
                <tr>
                   <td colSpan="6" className="px-6 py-8 text-center text-slate-500">Kayıtlı aktif işletme bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
