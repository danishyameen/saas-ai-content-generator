import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Megaphone, Lightbulb, Share2, BarChart3, TrendingUp, Zap, Crown } from 'lucide-react';
import { aiAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';

const generators = [
  { icon: Package, title: 'Product Generator', desc: 'Generate compelling product descriptions', path: '/dashboard/product', color: 'from-blue-500 to-cyan-500' },
  { icon: Search, title: 'SEO Generator', desc: 'Create SEO-optimized content', path: '/dashboard/seo', color: 'from-green-500 to-emerald-500' },
  { icon: Megaphone, title: 'Ads Generator', desc: 'Generate high-converting ad copy', path: '/dashboard/ads', color: 'from-orange-500 to-red-500' },
  { icon: Lightbulb, title: 'Business Ideas', desc: 'Get innovative business concepts', path: '/dashboard/business-ideas', color: 'from-yellow-500 to-amber-500' },
  { icon: Share2, title: 'Social Content', desc: 'Create social media posts', path: '/dashboard/social', color: 'from-purple-500 to-pink-500' },
  { icon: BarChart3, title: 'Competitor Analysis', desc: 'Analyze your competition', path: '/dashboard/competitor', color: 'from-indigo-500 to-blue-500' },
];

export default function DashboardHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ used: 0, limit: 5 });

  useEffect(() => {
    // Fetch usage stats
    aiAPI.getHistory({ limit: 1 })
      .then(({ data }) => {
        setStats({
          used: user?.usageToday || 0,
          limit: user?.plan === 'free' ? 5 : (user?.plan === 'pro' ? 100 : 'unlimited'),
        });
      })
      .catch(() => {});
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-dark-400">What would you like to generate today?</p>
      </div>

      {/* Usage Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold">Today's Usage</h3>
              <p className="text-sm text-dark-400">
                {stats.used} / {stats.limit} requests
              </p>
            </div>
          </div>
          {user?.plan === 'free' && (
            <Link to="/dashboard/billing" className="btn-primary text-sm">
              <Crown size={16} className="inline mr-1" />
              Upgrade
            </Link>
          )}
        </div>
        <div className="w-full bg-dark-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${user?.plan === 'free' ? Math.min((stats.used / 5) * 100, 100) : (user?.plan === 'pro' ? Math.min((stats.used / 100) * 100, 100) : 100)}%` }}
          />
        </div>
      </div>

      {/* Generators Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Genifai Generators</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generators.map((gen, i) => {
            const Icon = gen.icon;
            return (
              <Link
                key={i}
                to={gen.path}
                className="card hover:border-primary-500/50 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${gen.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{gen.title}</h3>
                <p className="text-sm text-dark-400">{gen.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{user?.totalAIRequests || 0}</p>
              <p className="text-sm text-dark-400">Total Requests</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <Crown size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold capitalize">{user?.plan}</p>
              <p className="text-sm text-dark-400">Current Plan</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Share2 size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{user?.referralCount || 0}</p>
              <p className="text-sm text-dark-400">Referrals</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">${user?.referralEarnings || 0}</p>
              <p className="text-sm text-dark-400">Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
