import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, ArrowUpRight, Wallet, Bell, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchExpenses, addExpense } from '../../store/slices/expenseSlice';
import { fetchRecurringPayments, updateRecurringPayment } from '../../store/slices/recurringSlice';
import ExpenseModal from '../../components/modals/ExpenseModal';

export default function BusinessDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: expenses, status: expenseStatus } = useSelector((state) => state.expense);
  const { items: recurring, status: recurringStatus } = useSelector((state) => state.recurring);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.businessId) {
      if (expenseStatus === 'idle') dispatch(fetchExpenses(user.businessId));
      if (recurringStatus === 'idle') dispatch(fetchRecurringPayments(user.businessId));
    }
  }, [dispatch, user, expenseStatus, recurringStatus]);

  // Yaklaşan ödemeler (pending giderler + sıradaki düzenli ödemeler)
  const upcomingExpenses = expenses.filter(e => e.status === 'pending').map(e => ({...e, isRecurring: false}));
  const upcomingRecurring = recurring.map(r => ({
    ...r,
    isRecurring: true,
    date: r.nextDueDate,
    paymentMethod: r.period === 'monthly' ? 'Aylık Düzenli' : 'Yıllık Düzenli'
  }));

  const upcomingPayments = [...upcomingExpenses, ...upcomingRecurring]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);
  
  // Calculate Totals based on type
  const validExpenses = expenses.filter(e => e && e.id);
  const totalExpense = validExpenses.filter(e => e.type === 'gider' && e.status === 'paid').reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalIncome = validExpenses.filter(e => e.type === 'gelir' && e.status === 'paid').reduce((sum, e) => sum + (e.amount || 0), 0);
  const netBalance = totalIncome - totalExpense;

  // Group by day for Chart
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('tr-TR', { weekday: 'short' });
    
    // Calculate for this day
    const dayExp = validExpenses.filter(e => e.type === 'gider' && e.date && new Date(e.date).getDate() === d.getDate());
    const dayInc = validExpenses.filter(e => e.type === 'gelir' && e.date && new Date(e.date).getDate() === d.getDate());
    
    return {
      name: dayStr,
      Gider: dayExp.reduce((sum, e) => sum + (e.amount || 0), 0),
      Gelir: dayInc.reduce((sum, e) => sum + (e.amount || 0), 0)
    };
  });

  const handleMarkAsPaid = (payment) => {
    if (payment.isRecurring) {
      // 1. Yeni bir "Gider" (Expense) oluştur
      const newExpense = {
        id: `exp_${Date.now()}`,
        businessId: user.businessId,
        title: payment.title,
        amount: Number(payment.amount),
        date: new Date().toISOString().split('T')[0],
        categoryId: payment.categoryId || 'cat_1_1',
        paymentMethod: 'Otomatik Düzenli',
        type: 'gider',
        status: 'paid',
        receiptUrl: null
      };
      dispatch(addExpense(newExpense));

      // 2. Düzenli ödemenin bir sonraki tarihini ileri at
      const nextDate = new Date(payment.nextDueDate);
      if (payment.period === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + 1);
      } else {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      
      dispatch(updateRecurringPayment({
        id: payment.id,
        data: { ...payment, nextDueDate: nextDate.toISOString().split('T')[0] }
      }));
    } else {
      toast('Bu işlemi şimdilik düzenli ödemeler için kullanabilirsiniz.', { icon: 'ℹ️' });
    }
  };

  return (
    <div className="space-y-6">
      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Hoş Geldiniz, {user?.ownerName}</h2>
          <p className="text-sm text-slate-400">İşletmenizin güncel finansal durumu</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-400 rounded-lg hover:bg-sky-500/20 transition-colors border border-sky-500/20">
          <ArrowUpRight size={18} />
          <span>Hızlı İşlem Ekle</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-emerald-500/50">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Aylık Toplam Gelir</h3>
          <p className="text-3xl font-bold text-emerald-400 mb-2">₺{totalIncome.toLocaleString()}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            Sadece ödenen kayıtlar (Nakit, POS, Havale)
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 border-rose-500/50">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={64} />
          </div>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Aylık Toplam Gider</h3>
          <p className="text-3xl font-bold text-rose-400 mb-2">₺{totalExpense.toLocaleString()}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
             Sadece ödenmiş giderler
          </div>
        </div>

        <div className={`glass-panel p-5 rounded-2xl relative overflow-hidden border-t-2 ${netBalance >= 0 ? 'border-sky-500/50' : 'border-red-500/50'}`}>
          <h3 className="text-sm font-medium text-slate-400 mb-1">Net Bakiye Durumu</h3>
          <p className={`text-3xl font-bold mb-2 ${netBalance >= 0 ? 'text-sky-400' : 'text-red-400'}`}>
            {netBalance >= 0 ? '+' : '-'}₺{Math.abs(netBalance).toLocaleString()}
          </p>
          {upcomingPayments.length > 0 && (
            <div className="text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={14} /> Yaklaşan ₺{upcomingPayments.reduce((s,e)=>s+e.amount,0).toLocaleString()} ödeme var!
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span> Son 7 Günlük Gelir/Gider Trendi
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₺${val}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="Gelir" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGelir)" />
                <Area type="monotone" dataKey="Gider" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorGider)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Payments Widget */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Bell size={18} className="text-rose-400" /> Yaklaşan Ödemeler
            </h3>
            <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-1 rounded-full">{upcomingPayments.length} Bekleyen</span>
          </div>
          
          <div className="flex-1 space-y-3">
            {upcomingPayments.length > 0 ? upcomingPayments.map((payment, idx) => (
              <div key={payment.id || idx} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex justify-between items-center group">
                <div className="flex items-start gap-3">
                  {payment.isRecurring && (
                    <div className="mt-1 w-6 h-6 bg-indigo-500/20 text-indigo-400 rounded-md flex items-center justify-center shrink-0">
                      <RefreshCw size={12} />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 line-clamp-1">{payment.title}</h4>
                    <p className="text-xs text-slate-400">{new Date(payment.date).toLocaleDateString('tr-TR')} • {payment.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-slate-200">₺{payment.amount}</span>
                  <button onClick={() => handleMarkAsPaid(payment)} className="text-slate-500 hover:text-emerald-400 transition-colors" title="Ödendi İşaretle">
                    <CheckCircle2 size={20} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Yaklaşan ödeme bulunmuyor.
              </div>
            )}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-sky-400 font-medium hover:bg-slate-800 rounded-lg transition-colors">
            Tümünü Gör
          </button>
        </div>
      </div>
    </div>
  );
}
