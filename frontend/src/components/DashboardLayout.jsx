import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Search,
  Megaphone,
  Lightbulb,
  Share2,
  BarChart3,
  History,
  CreditCard,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Crown,
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Product Generator', path: '/dashboard/product' },
  { icon: Search, label: 'SEO Generator', path: '/dashboard/seo' },
  { icon: Megaphone, label: 'Ads Generator', path: '/dashboard/ads' },
  { icon: Lightbulb, label: 'Business Ideas', path: '/dashboard/business-ideas' },
  { icon: Share2, label: 'Social Content', path: '/dashboard/social' },
  { icon: BarChart3, label: 'Competitor Analysis', path: '/dashboard/competitor' },
  { icon: Megaphone, label: 'Marketing Campaign', path: '/dashboard/campaign' },
  { icon: History, label: 'History', path: '/dashboard/history' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: Users, label: 'Affiliate Program', path: '/dashboard/affiliate' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: BarChart3, label: 'AI Requests', path: '/admin/ai-requests' },
  { icon: Users, label: 'Affiliates', path: '/admin/affiliates' },
  { icon: History, label: 'Activity Logs', path: '/admin/logs' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  if (!user) return <Navigate to="/login" />;

  const isAdmin = location.pathname.startsWith('/admin');
  const items = isAdmin ? adminNavItems : navItems;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-900 border-r border-dark-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-white font-bold">AI Generator</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-dark-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-140px)]">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
              >
                <Icon size={20} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-dark-400 truncate">{user?.email}</p>
            </div>
            <div className="flex items-center gap-1">
              {user?.plan === 'pro' && (
                <span className="px-2 py-0.5 bg-primary-600/20 text-primary-400 text-xs rounded-full">
                  Pro
                </span>
              )}
              {user?.plan === 'enterprise' && (
                <span className="px-2 py-0.5 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                  Enterprise
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-sm border-b border-dark-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-dark-400 hover:text-white"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {user?.plan === 'free' && (
                <Link to="/dashboard/billing" className="btn-primary text-sm">
                  <Crown size={16} className="inline mr-1" />
                  Upgrade to Pro
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-dark-300 hover:text-white"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown size={16} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl py-1">
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-dark-300 hover:bg-dark-700 hover:text-white"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/dashboard/billing"
                      className="block px-4 py-2 text-sm text-dark-300 hover:bg-dark-700 hover:text-white"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Billing
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-dark-300 hover:bg-dark-700 hover:text-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <hr className="border-dark-700 my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-700"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
