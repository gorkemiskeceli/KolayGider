import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Activity, CreditCard, ArrowUpRight, TrendingUp, Building2, LifeBuoy, Zap } from 'lucide-react';
import { fetchBusinesses } from '../../store/slices/businessSlice';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const growthData = [
  { name: 'Oca', users: 120, mrr: 15000 },
  { name: 'Şub', users: 135, mrr: 18000 },
  { name: 'Mar', users: 160, mrr: 22000 },
  { name: 'Nis', users: 210, mrr: 28000 },
  { name: 'May', users: 250, mrr: 34000 },
  { name: 'Haz', users: 310, mrr: 45000 },
  { name: 'Tem', users: 380, mrr: 58000 },
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items: businesses, status } = useSelector((state) => state.business);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBusinesses());
    }
    // Fetch mock tickets directly
    fetch('http://localhost:3000/tickets').then(r => r.json()).then(data => setTickets(data)).catch(() => {});
  }, [dispatch, status]);

  const activeBusinesses = businesses.filter(b => b.status === 'active');
  const openTickets = tickets.filter(t => t.status === 'open');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Genel Bakış (SaaS Admin)</h2>
          <p className="text-sm text-slate-400">Platformun anlık durumu ve büyüme metrikleri.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
            <Zap size={18} />
            <span>Sistem Raporu Çıkar</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-indigo-500/50">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Aylık Tekrarlayan Gelir (MRR)</h3>
          <p className="text-3xl font-bold text-slate-100 mb-2">₺58.000</p>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <ArrowUpRight size={14} /> %28 geçen aya göre
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-emerald-500/50">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Building2 size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Aktif İşletmeler</h3>
          <p className="text-3xl font-bold text-emerald-400 mb-2">{activeBusinesses.length}</p>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp size={14} /> Yeni işletmeler katıldı
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-sky-500/50">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Toplam Kullanıcılar</h3>
          <p className="text-3xl font-bold text-slate-100 mb-2">1,248</p>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <ArrowUpRight size={14} /> %12 büyüme
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-rose-500/50">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <LifeBuoy size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Açık Destek Talepleri</h3>
          <p className="text-3xl font-bold text-rose-400 mb-2">{openTickets.length || 0}</p>
          <div className="text-xs text-rose-400 flex items-center gap-1">
            Müdahale bekleyen talepler
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> MRR Büyüme Trendi
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₺${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} itemStyle={{ color: '#f8fafc' }} />
                <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMRR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Businesses */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Activity size={18} className="text-sky-400"/> Son Kayıt Olanlar
            </h3>
          </div>
          <div className="space-y-4 flex-1">
            {businesses.slice(-5).reverse().map(biz => (
              <div key={biz.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
                <div>
                  <h4 className="font-medium text-slate-200">{biz.businessName}</h4>
                  <p className="text-xs text-slate-400">{biz.ownerName}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                  biz.tier === 'Enterprise' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' : 
                  biz.tier === 'Pro' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20' : 
                  'bg-slate-700 text-slate-300'
                }`}>
                  {biz.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
