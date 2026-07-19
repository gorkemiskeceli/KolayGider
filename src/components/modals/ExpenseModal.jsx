import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Receipt, Tag, CreditCard, Calendar } from 'lucide-react';
import { addExpense } from '../../store/slices/expenseSlice';
import toast from 'react-hot-toast';

export default function ExpenseModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: 'cat_1_1',
    paymentMethod: 'Kredi Kartı',
    type: 'gider',
    status: 'paid'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...formData,
      id: `exp_${Date.now()}`,
      businessId: user.businessId,
      amount: Number(formData.amount),
      receiptUrl: null
    };
    dispatch(addExpense(newRecord))
      .unwrap()
      .then(() => toast.success(formData.type === 'gelir' ? 'Gelir eklendi.' : 'Gider eklendi.'))
      .catch(() => toast.error('İşlem kaydedilemedi.'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <h2 className="text-xl font-bold text-slate-100">Yeni İşlem Ekle</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Toggle */}
          <div className="flex bg-slate-800 p-1 rounded-xl">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'gider'})}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.type === 'gider' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Gider Çıkışı
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'gelir'})}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${formData.type === 'gelir' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Gelir Girişi
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Başlık / Açıklama</label>
            <div className="relative">
              <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Market Alışverişi" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tutar (₺)</label>
              <input required type="number" min="0" step="0.01" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tarih</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Kategori</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none appearance-none">
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Ödeme Yöntemi</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none appearance-none">
                  <option value="Kredi Kartı">Kredi Kartı</option>
                  <option value="Nakit">Nakit</option>
                  <option value="Havale/EFT">Havale/EFT</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors">
              İptal
            </button>
            <button type="submit" className="flex-1 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all">
              {formData.type === 'gelir' ? 'Geliri Kaydet' : 'Gideri Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
