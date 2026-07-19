import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Calendar, Wallet } from 'lucide-react';
import { addRecurringPayment } from '../../store/slices/recurringSlice';
import toast from 'react-hot-toast';

export default function RecurringPaymentModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    period: 'monthly',
    nextDueDate: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      ...formData,
      id: `rec_${Date.now()}`,
      businessId: user.businessId,
      amount: Number(formData.amount),
      status: 'active'
    };
    dispatch(addRecurringPayment(newPayment))
      .unwrap()
      .then(() => toast.success('Düzenli ödeme eklendi.'))
      .catch(() => toast.error('Düzenli ödeme eklenemedi.'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <h2 className="text-xl font-bold text-slate-100">Yeni Düzenli Ödeme</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Açıklama / Başlık</label>
            <div className="relative">
              <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Ofis Kirası" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Tutar (₺)</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input required type="number" min="0" step="0.01" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Periyot</label>
              <select name="period" value={formData.period} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none">
                <option value="monthly">Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">İlk Ödeme Tarihi</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input required type="date" name="nextDueDate" value={formData.nextDueDate} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors">
              İptal
            </button>
            <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 shadow-lg shadow-indigo-500/20 transition-all">
              Kuralı Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
