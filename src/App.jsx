import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './routes/RouteGuards';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import BusinessesPage from './pages/admin/BusinessesPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import SubscriptionsPage from './pages/admin/SubscriptionsPage';
import SupportTicketsPage from './pages/admin/SupportTicketsPage';
import PlatformSettingsPage from './pages/admin/PlatformSettingsPage';
import BusinessDashboard from './pages/business/BusinessDashboard';
import ExpensesPage from './pages/business/ExpensesPage';
import RecurringPaymentsPage from './pages/business/RecurringPaymentsPage';
import CategoriesPage from './pages/business/CategoriesPage';
import ReportsPage from './pages/business/ReportsPage';
import SettingsPage from './pages/business/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/businesses" element={<BusinessesPage />} />
            <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/admin/tickets" element={<SupportTicketsPage />} />
            <Route path="/admin/logs" element={<AuditLogsPage />} />
            <Route path="/admin/settings" element={<PlatformSettingsPage />} />
          </Route>
        </Route>

        {/* Protected Business Owner Routes */}
        <Route element={<ProtectedRoute requiredRole="BUSINESS_OWNER" />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<BusinessDashboard />} />
            <Route path="/dashboard/expenses" element={<ExpensesPage />} />
            <Route path="/dashboard/recurring" element={<RecurringPaymentsPage />} />
            <Route path="/dashboard/categories" element={<CategoriesPage />} />
            <Route path="/dashboard/reports" element={<ReportsPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
