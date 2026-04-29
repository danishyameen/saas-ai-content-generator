import { useState } from 'react';
import { User, Mail, Lock, Save, Building, Globe, MapPin, Phone, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { authAPI, aiAPI } from '../../services/api';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [companyDetails, setCompanyDetails] = useState({
    name: user?.companyDetails?.name || '',
    address: user?.companyDetails?.address || '',
    website: user?.companyDetails?.website || '',
    phone: user?.companyDetails?.phone || '',
    logo: user?.companyDetails?.logo || '',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.updateProfile({
        name,
        email,
        companyDetails
      });
      updateUser(data.data);
      toast.success('Profile and branding updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLogo = async () => {
    if (!companyDetails.name) {
      toast.error('Please enter company name first');
      return;
    }
    setLogoLoading(true);
    try {
      const { data } = await aiAPI.generateLogo({
        brandName: companyDetails.name,
        autoSave: true
      });
      setCompanyDetails({ ...companyDetails, logo: data.data });
      toast.success('Brand logo generated and saved!');
    } catch (error) {
      toast.error('Logo generation failed');
    } finally {
      setLogoLoading(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyDetails({ ...companyDetails, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadLogo = () => {
    if (!companyDetails.logo) return;
    const a = document.createElement('a');
    a.href = companyDetails.logo;
    a.download = `${companyDetails.name || 'brand'}-logo.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-dark-400">Manage your account and company branding</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile & Branding */}
        <div className="space-y-6">
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

              <h3 className="font-semibold pt-4 mb-2 border-t border-dark-700">Company & Branding</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Company/Brand Name</label>
                <div className="relative">
                  <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    value={companyDetails.name}
                    onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
                    className="input w-full pl-10"
                    placeholder="My Awesome Brand"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <div className="relative">
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    value={companyDetails.website}
                    onChange={(e) => setCompanyDetails({...companyDetails, website: e.target.value})}
                    className="input w-full pl-10"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    value={companyDetails.address}
                    onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                    className="input w-full pl-10"
                    placeholder="123 Business St, City"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    value={companyDetails.phone}
                    onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
                    className="input w-full pl-10"
                    placeholder="+92 3XX XXXXXXX"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? <Loader2 size={16} className="animate-spin mr-2 inline" /> : <Save size={16} className="inline mr-2" />}
                Save All Settings
              </button>
            </form>
          </div>
        </div>

        {/* Logo Management */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Brand Logo</h3>
            <div className="space-y-4">
              <div className="aspect-square w-full bg-dark-900 rounded-lg border-2 border-dashed border-dark-700 flex items-center justify-center overflow-hidden relative group">
                {companyDetails.logo ? (
                  <>
                    <img src={companyDetails.logo} alt="Brand Logo" className="w-full h-full object-contain" />
                    <button
                      onClick={downloadLogo}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Download size={32} className="text-white" />
                    </button>
                  </>
                ) : (
                  <ImageIcon size={48} className="text-dark-500" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="btn-secondary cursor-pointer flex items-center justify-center gap-2">
                  <ImageIcon size={16} />
                  Upload
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
                <button
                  onClick={handleGenerateLogo}
                  disabled={logoLoading}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  {logoLoading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                  AI Generate
                </button>
              </div>
              <p className="text-xs text-dark-400 text-center">
                Recommended: Square PNG with transparent background
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input w-full"
                  required
                  minLength={6}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
