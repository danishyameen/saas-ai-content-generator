import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Layout
import DashboardLayout from './components/DashboardLayout';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ProductGenerator from './pages/dashboard/ProductGenerator';
import SEOGenerator from './pages/dashboard/SEOGenerator';
import AdsGenerator from './pages/dashboard/AdsGenerator';
import BusinessIdeas from './pages/dashboard/BusinessIdeas';
import SocialContent from './pages/dashboard/SocialContent';
import CompetitorAnalysis from './pages/dashboard/CompetitorAnalysis';
import MarketingCampaign from './pages/dashboard/MarketingCampaign';
import History from './pages/dashboard/History';
import Billing from './pages/dashboard/Billing';
import AffiliateDashboard from './pages/dashboard/AffiliateDashboard';
import Settings from './pages/dashboard/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminAIRequests from './pages/admin/AdminAIRequests';
import AdminAffiliates from './pages/admin/AdminAffiliates';
import AdminLogs from './pages/admin/AdminLogs';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="product" element={<ProductGenerator />} />
          <Route path="seo" element={<SEOGenerator />} />
          <Route path="ads" element={<AdsGenerator />} />
          <Route path="business-ideas" element={<BusinessIdeas />} />
          <Route path="social" element={<SocialContent />} />
          <Route path="competitor" element={<CompetitorAnalysis />} />
          <Route path="campaign" element={<MarketingCampaign />} />
          <Route path="history" element={<History />} />
          <Route path="billing" element={<Billing />} />
          <Route path="affiliate" element={<AffiliateDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="ai-requests" element={<AdminAIRequests />} />
          <Route path="affiliates" element={<AdminAffiliates />} />
          <Route path="logs" element={<AdminLogs />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
