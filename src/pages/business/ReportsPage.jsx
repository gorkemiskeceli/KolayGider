import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchExpenses } from '../../store/slices/expenseSlice';
import { fetchCategories } from '../../store/slices/categorySlice';

export default function ReportsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: expenses, status: expenseStatus } = useSelector((state) => state.expense);
  const { items: categories, status: categoryStatus } = useSelector((state) => state.category);

  useEffect(() => {
    if (user?.businessId) {
      if (expenseStatus === 'idle') dispatch(fetchExpenses(user.businessId));
      if (categoryStatus === 'idle') dispatch(fetchCategories(user.businessId));
    }
  }, [dispatch, user, expenseStatus, categoryStatus]);

  // Hesaplama: Sadece bu ayın "gider" türündeki kayıtları
  const chartData = useMemo(() => {
    if (!expenses.length || !categories.length) return [];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Sadece bu ayki giderleri filtrele
    const thisMonthExpenses = expenses.filter(e => {
      if (e.type !== 'gider') return false;
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    // Kategoriye göre grupla ve topla
    const grouped = thisMonthExpenses.reduce((acc, curr) => {
      const catId = curr.categoryId;
      acc[catId] = (acc[catId] || 0) + (curr.amount || 0);
      return acc;
    }, {});

    // Recharts formatına dönüştür (name, value, color)
    const result = Object.entries(grouped).map(([catId, totalValue]) => {
      const category = categories.find(c => c.id === catId);
      return {
        name: category ? category.name : 'Diğer',
        value: totalValue,
        color: category ? category.color : '#64748b' // default slate
      };
    }).sort((a, b) => b.value - a.value); // Büyükten küçüğe sırala

    return result;
  }, [expenses, categories]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Gelişmiş Raporlar</h2>
        <p className="text-sm text-slate-400">İşletmenizin harcama alışkanlıklarını analiz edin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-slate-100 mb-6 border-b border-slate-700/50 pb-2">Kategori Dağılımı (Bu Ay)</h3>
          <div className="flex-1 min-h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                    formatter={(value) => `₺${value.toLocaleString()}`}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                Bu ay için henüz gider kaydı bulunmuyor.
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-slate-500 text-center">
          <p className="mb-2 font-medium text-slate-400">Aylık Trend Analizi (Çok Yakında)</p>
          <div className="text-xs">
            Gelir ve giderlerinizi geçmiş aylarla kıyaslayan detaylı grafikler yeterli veri toplandıktan sonra aktif olacaktır.
          </div>
        </div>
      </div>
    </div>
  );
}
