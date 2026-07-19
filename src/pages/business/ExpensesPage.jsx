import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, Download, Plus, Receipt, LayoutGrid, List, TrendingUp, Wallet } from 'lucide-react';
import { fetchExpenses } from '../../store/slices/expenseSlice';
import ExpenseModal from '../../components/modals/ExpenseModal';

export default function ExpensesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: expenses, status } = useSelector((state) => state.expense);
  const [view, setView] = useState('table'); // table or cards
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.businessId && status === 'idle') {
      dispatch(fetchExpenses(user.businessId));
    }
  }, [dispatch, user, status]);

  return (
    <div className="space-y-6">
      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">İşlemler (Gelir / Gider)</h2>
          <p className="text-sm text-slate-400">Tüm harcamalarınızı ve gelirlerinizi yönetin.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
            <Download size={18} />
            <span className="hidden sm:inline">Dışa Aktar</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
            <Plus size={18} />
            <span>Yeni İşlem</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="İşlem başlığı ara..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-between">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-slate-100 transition-colors">
            <Filter size={16} />
            <span>Filtrele</span>
          </button>
          <div className="hidden sm:flex bg-slate-900 border border-slate-700 rounded-lg p-1">
             <button 
                onClick={() => setView('table')} 
                className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <List size={18} />
             </button>
             <button 
                onClick={() => setView('cards')} 
                className={`p-1.5 rounded-md transition-colors ${view === 'cards' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <LayoutGrid size={18} />
             </button>
          </div>
        </div>
      </div>

      {/* Expenses Content */}
      {view === 'table' ? (
        <div className="glass-panel rounded-2xl overflow-hidden hidden sm:block">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/80 text-xs uppercase font-medium text-slate-400 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4">Tür</th>
                <th className="px-6 py-4">İşlem Başlığı</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Yöntem</th>
                <th className="px-6 py-4 text-right">Tutar</th>
                <th className="px-6 py-4 text-center">Durum</th>
                <th className="px-6 py-4 text-center">Belge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {expenses.filter(e => e && e.id).map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    {expense.type === 'gelir' ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center" title="Gelir">
                        <TrendingUp size={16} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center" title="Gider">
                        <Wallet size={16} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{expense.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">
                      {expense.categoryId}
                    </span>
                  </td>
                  <td className="px-6 py-4">{expense.date ? new Date(expense.date).toLocaleDateString('tr-TR') : '-'}</td>
                  <td className="px-6 py-4">{expense.paymentMethod}</td>
                  <td className={`px-6 py-4 text-right font-semibold ${expense.type === 'gelir' ? 'text-emerald-400' : 'text-slate-100'}`}>
                    {expense.type === 'gelir' ? '+' : '-'}₺{(expense.amount || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {expense.status === 'paid' ? (
                       <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">Ödendi</span>
                    ) : (
                       <span className="px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-full text-xs font-medium border border-rose-500/20">Bekliyor</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    {expense.receiptUrl ? (
                      <button className="text-sky-400 hover:text-sky-300 transition-colors"><Receipt size={18} /></button>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {/* Mobile Card View (Also shown when view === 'cards' on desktop) */}
      <div className={`grid grid-cols-1 gap-4 ${view === 'table' ? 'sm:hidden' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {expenses.filter(e => e && e.id).map((expense) => (
          <div key={expense.id} className="glass-panel p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${expense.type === 'gelir' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            <div className="flex justify-between items-start pl-2">
              <div>
                <h3 className="font-bold text-slate-100">{expense.title}</h3>
                <p className="text-xs text-slate-400">{expense.date ? new Date(expense.date).toLocaleDateString('tr-TR') : '-'}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${expense.type === 'gelir' ? 'text-emerald-400' : 'text-slate-100'}`}>
                  {expense.type === 'gelir' ? '+' : '-'}₺{(expense.amount || 0).toLocaleString()}
                </p>
                 {expense.status === 'paid' ? (
                       <span className="text-xs text-emerald-400 font-medium">Ödendi</span>
                    ) : (
                       <span className="text-xs text-rose-400 font-medium">Bekliyor</span>
                    )}
              </div>
            </div>
            <div className="flex gap-2 mt-2 pl-2">
               <span className="px-2 py-1 bg-slate-900 text-slate-400 rounded-md text-[10px] uppercase tracking-wider font-semibold border border-slate-700">
                  {expense.paymentMethod}
               </span>
               {expense.receiptUrl && (
                  <span className="px-2 py-1 bg-sky-500/10 text-sky-400 rounded-md text-[10px] flex items-center gap-1 border border-sky-500/20">
                    <Receipt size={12} /> Fiş Eklendi
                  </span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
