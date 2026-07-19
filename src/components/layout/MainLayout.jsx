import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Home, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  CreditCard,
  CalendarDays,
  Tags,
  PieChart,
  ClipboardList,
  Building2,
  ShieldAlert,
  LifeBuoy
} from 'lucide-react';
import { login, logout } from '../../store/slices/authSlice';

export const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const switchRole = (role) => {
    if (role === 'SUPER_ADMIN') {
      dispatch(login({ id: 'sa_1', email: 'admin@kolaygider.com', role: 'SUPER_ADMIN', name: 'Super Admin' }));
      navigate('/admin');
    } else {
      dispatch(login({ id: 'biz_101', role: 'BUSINESS_OWNER', businessId: 'biz_101', ownerName: 'Ahmet Yılmaz', businessName: 'Yılmaz Restoran' }));
      navigate('/dashboard');
    }
  };

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    { to: '/admin/businesses', icon: <Users size={22} />, label: 'İşletmeler' },
    { to: '/admin/logs', icon: <ClipboardList size={22} />, label: 'Sistem Logları' },
  ];

  const businessLinks = [
    { to: '/dashboard', icon: <Home size={22} />, label: 'Ana Sayfa' },
    { to: '/dashboard/expenses', icon: <CreditCard size={22} />, label: 'Giderler' },
    { to: '/dashboard/recurring', icon: <CalendarDays size={22} />, label: 'Düzenli' },
    { to: '/dashboard/categories', icon: <Tags size={22} />, label: 'Kategoriler' },
    { to: '/dashboard/reports', icon: <PieChart size={22} />, label: 'Raporlar' },
    { to: '/dashboard/settings', icon: <Settings size={22} />, label: 'Ayarlar' },
  ];

  const links = user?.role === 'SUPER_ADMIN' ? adminLinks : businessLinks;

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans selection:bg-sky-500/30">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl z-20 transition-all duration-300">
        <div className="p-6 border-b border-slate-700/50 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              K
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
              KolayGider
            </h1>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {user?.role === 'SUPER_ADMIN' ? 'Super Admin Paneli' : user?.businessName}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 hover:border hover:border-slate-600/30 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={isActive ? "scale-110 transition-transform" : "group-hover:scale-110 transition-transform"}>
                    {link.icon}
                  </div>
                  <span className="font-medium tracking-wide">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 rounded-xl hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-200 group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 bg-slate-900">
        {/* Mobile Header */}
        <header className="md:hidden glass-panel sticky top-0 z-30 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
              K
            </div>
            <h1 className="text-xl font-bold text-slate-100">KolayGider</h1>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors p-2 bg-slate-800 rounded-full">
            <LogOut size={20} />
          </button>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t-slate-700/50 flex justify-around p-2 pb-safe z-40">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-xl transition-colors ${
                isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110 mb-1' : ''}`}>
                   {link.icon}
                </div>
                <span className="text-[10px] mt-1 font-medium">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Floating Action Button (FAB) for Mobile - Only for Business Owner */}
      {user?.role === 'BUSINESS_OWNER' && (
        <button className="md:hidden fixed bottom-24 right-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-4 rounded-full shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all z-40 border border-sky-400/30">
          <PlusCircle size={26} />
        </button>
      )}
    </div>
  );
};
