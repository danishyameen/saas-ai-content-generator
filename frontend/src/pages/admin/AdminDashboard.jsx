import { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, BarChart3, Crown, Zap } from 'lucide-react';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then(({ data }) => setStats(data.data))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-dark-400">Overview of your SaaS platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.users?.total || 0}</p>
              <p className="text-sm text-dark-400">Total Users</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.users?.active || 0}</p>
              <p className="text-sm text-dark-400">Active Users</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats?.revenue?.total || 0}</p>
              <p className="text-sm text-dark-400">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.ai?.totalRequests || 0}</p>
              <p className="text-sm text-dark-400">AI Requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Plan Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Free</span>
                <span className="text-sm font-medium">{stats?.users?.byPlan?.free || 0}</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-dark-500 h-2 rounded-full"
                  style={{
                    width: `${stats?.users?.total ? ((stats.users.byPlan?.free || 0) / stats.users.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Pro</span>
                <span className="text-sm font-medium">{stats?.users?.byPlan?.pro || 0}</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{
                    width: `${stats?.users?.total ? ((stats.users.byPlan?.pro || 0) / stats.users.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Enterprise</span>
                <span className="text-sm font-medium">{stats?.users?.byPlan?.enterprise || 0}</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{
                    width: `${stats?.users?.total ? ((stats.users.byPlan?.enterprise || 0) / stats.users.total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-dark-400">Stripe</span>
              <span className="font-medium">${stats?.revenue?.stripe || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-400">JazzCash</span>
              <span className="font-medium">${stats?.revenue?.jazzcash || 0}</span>
            </div>
            <hr className="border-dark-700" />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-400">${stats?.revenue?.total || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="card">
        <h3 className="font-semibold mb-4">Today's Activity</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-dark-900 rounded-lg">
            <Zap size={24} className="text-primary-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats?.ai?.todayRequests || 0}</p>
            <p className="text-sm text-dark-400">AI Requests Today</p>
          </div>
          <div className="text-center p-4 bg-dark-900 rounded-lg">
            <Users size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats?.recentUsers?.length || 0}</p>
            <p className="text-sm text-dark-400">Recent Signups</p>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card">
        <h3 className="font-semibold mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Plan</th>
                <th className="text-left py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentUsers?.slice(0, 5).map((user) => (
                <tr key={user._id} className="border-b border-dark-800">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2 text-dark-400">{user.email}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.plan === 'pro' ? 'bg-primary-600/20 text-primary-400' :
                      user.plan === 'enterprise' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-dark-700 text-dark-300'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-2 text-dark-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
