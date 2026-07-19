import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Tag, Wallet } from 'lucide-react';
import { addCategory } from '../../store/slices/categorySlice';
import toast from 'react-hot-toast';

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', 
  '#0ea5e9', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'
];

export default function CategoryModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    budgetLimit: '',
    color: COLORS[0],
    type: 'gider'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      ...formData,
      id: `cat_${Date.now()}`,
      businessId: user.businessId,
      budgetLimit: formData.budgetLimit ? Number(formData.budgetLimit) : null
    };
    dispatch(addCategory(newCategory))
      .unwrap()
      .then(() => toast.success('Kategori eklendi.'))
      .catch(() => toast.error('Kategori eklenemedi.'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <h2 className="text-xl font-bold text-slate-100">Yeni Kategori Ekle</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Kategori Adı</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Örn: Ofis Malzemeleri" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Aylık Bütçe Limiti (₺) (Opsiyonel)</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="number" min="0" step="0.01" name="budgetLimit" value={formData.budgetLimit} onChange={handleChange} placeholder="Limit yok" className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 focus:border-sky-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Renk Seçimi</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-white' : 'border-transparent'} transition-all`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-800 text-slate-300 font-medium rounded-xl hover:bg-slate-700 transition-colors">
              İptal
            </button>
            <button type="submit" className="flex-1 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 shadow-lg shadow-sky-500/20 transition-all">
              Kategoriyi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
