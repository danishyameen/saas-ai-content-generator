import { useState } from 'react';
import { User, Mail, Lock, Save } from 'lucide-react';
import { authAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.updateProfile({ name, email });
      updateUser(data.data);
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword, newPassword });
      toast.success('Password changed');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-dark-400">Manage your account settings</p>
      </div>

      {/* Profile */}
      <div className="card">
        <h3 className="font-semibold mb-4">Profile Information</h3>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full pl-10"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            <Save size={16} className="inline mr-2" />
            Save Changes
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="card">
        <h3 className="font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input w-full pl-10"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input w-full pl-10"
                required
                minLength={6}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            Change Password
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="card">
        <h3 className="font-semibold mb-4">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-dark-400">Account Type</span>
            <span className="capitalize font-medium">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-400">Current Plan</span>
            <span className="capitalize font-medium">{user?.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-400">Referral Code</span>
            <span className="font-mono text-primary-400">{user?.referralCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-dark-400">Member Since</span>
            <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
