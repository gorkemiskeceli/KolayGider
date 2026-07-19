import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarDays, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { fetchRecurringPayments, deleteRecurringPayment } from '../../store/slices/recurringSlice';
import RecurringPaymentModal from '../../components/modals/RecurringPaymentModal';
import ConfirmModal from '../../components/modals/ConfirmModal';
import toast from 'react-hot-toast';

export default function RecurringPaymentsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: recurring, status } = useSelector((state) => state.recurring);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (user?.businessId && status === 'idle') {
      dispatch(fetchRecurringPayments(user.businessId));
    }
  }, [dispatch, user, status]);

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteRecurringPayment(deleteTarget.id))
        .unwrap()
        .then(() => toast.success('Düzenli ödeme başarıyla silindi.'))
        .catch(() => toast.error('Düzenli ödeme silinirken hata oluştu.'));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <RecurringPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ConfirmModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Düzenli Ödemeyi Sil"
        message={`"${deleteTarget?.title}" adlı düzenli ödemeyi iptal etmek istediğinize emin misiniz? Gelecekteki otomatik ödemeler oluşturulmayacaktır.`}
        confirmText="Evet, İptal Et"
      />
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Düzenli Ödemeler</h2>
          <p className="text-sm text-slate-400">Aylık ve yıllık tekrarlayan giderlerinizi otomatik takip edin.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
          <Plus size={18} />
          <span>Yeni Kural Ekle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recurring.map((payment) => (
          <div key={payment.id} className="glass-panel p-5 rounded-2xl relative overflow-hidden border-t-4 border-t-indigo-500 group">
            <button 
              onClick={() => setDeleteTarget(payment)}
              className="absolute top-4 right-4 p-2 bg-rose-500/10 text-rose-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/20"
              title="Sil"
            >
              <Trash2 size={16} />
            </button>
            <div className="flex justify-between items-start mb-4 pr-10">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                <RefreshCw size={20} />
              </div>
              <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700 uppercase tracking-wider">
                {payment.period === 'monthly' ? 'Aylık' : 'Yıllık'}
              </span>
            </div>
            <h3 className="font-bold text-lg text-slate-100 mb-1">{payment.title}</h3>
            <p className="text-2xl font-bold text-sky-400 mb-4">₺{payment.amount.toLocaleString()}</p>
            
            <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-1.5 text-slate-400">
                <CalendarDays size={16} />
                <span>Sonraki: {new Date(payment.nextDueDate).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add New Card */}
        <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all cursor-pointer bg-slate-800/20 min-h-[200px]">
          <Plus size={32} className="mb-2" />
          <span className="font-medium">Yeni Düzenli Ödeme Ekle</span>
        </div>
      </div>
    </div>
  );
}
