import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tags, Plus, Trash2 } from 'lucide-react';
import { fetchCategories, deleteCategory } from '../../store/slices/categorySlice';
import { fetchExpenses } from '../../store/slices/expenseSlice';
import CategoryModal from '../../components/modals/CategoryModal';
import ConfirmModal from '../../components/modals/ConfirmModal';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: categories, status: categoryStatus } = useSelector((state) => state.category);
  const { items: expenses, status: expenseStatus } = useSelector((state) => state.expense);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (user?.businessId) {
      if (categoryStatus === 'idle') dispatch(fetchCategories(user.businessId));
      if (expenseStatus === 'idle') dispatch(fetchExpenses(user.businessId));
    }
  }, [dispatch, user, categoryStatus, expenseStatus]);

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteCategory(deleteTarget.id))
        .unwrap()
        .then(() => toast.success('Kategori başarıyla silindi.'))
        .catch(() => toast.error('Kategori silinirken hata oluştu.'));
    }
  };

  // Bu ayın giderlerini kategoriye göre grupla
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(e => {
    if (e.type !== 'gider' || e.status !== 'paid') return false;
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const getCategoryUsage = (catId) => {
    return thisMonthExpenses
      .filter(e => e.categoryId === catId)
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  };

  return (
    <div className="space-y-6">
      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Kategoriyi Sil"
        message={`"${deleteTarget?.name}" kategorisini silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve bu kategoriye ait olan giderler 'Diğer' olarak görünebilir.`}
        confirmText="Evet, Sil"
      />
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Kategori & Bütçeler</h2>
          <p className="text-sm text-slate-400">Harcama kategorilerinizi ve bütçe limitlerini belirleyin.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
          <Plus size={18} />
          <span>Kategori Ekle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const usedAmount = getCategoryUsage(cat.id);
          const limit = cat.budgetLimit || 0;
          let percentage = 0;
          
          if (limit > 0) {
            percentage = Math.min(100, Math.round((usedAmount / limit) * 100));
          } else if (usedAmount > 0) {
            // Limit yoksa ama harcama varsa bar dolsun ama çok belirgin olmasın
            percentage = 100;
          }

          const isOverBudget = limit > 0 && usedAmount > limit;

          return (
            <div key={cat.id} className="glass-panel p-5 rounded-2xl flex items-center gap-4 relative group">
              <button 
                onClick={() => setDeleteTarget(cat)}
                className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-rose-500/10 text-rose-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/20"
                title="Sil"
              >
                <Trash2 size={16} />
              </button>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
                style={{ backgroundColor: cat.color }}
              >
                <Tags size={24} />
              </div>
              <div className="flex-1 pr-12">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-100 line-clamp-1">{cat.name}</h3>
                  <span className="text-xs text-slate-400">
                    Limit: {limit > 0 ? `₺${limit.toLocaleString()}` : 'Belirsiz'}
                  </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-1 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : ''}`} 
                    style={{ width: `${percentage}%`, backgroundColor: isOverBudget ? undefined : cat.color }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">₺{usedAmount.toLocaleString()} harcandı</span>
                  <span className={`text-[10px] font-medium ${isOverBudget ? 'text-red-400' : 'text-slate-500'}`}>
                    {limit > 0 ? `%${percentage} kullanıldı` : 'Limit yok'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State / Add New Card */}
        <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all cursor-pointer bg-slate-800/20 min-h-[120px]">
          <Plus size={32} className="mb-2" />
          <span className="font-medium">Yeni Kategori Ekle</span>
        </div>
      </div>
    </div>
  );
}
