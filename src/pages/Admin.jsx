import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Image as ImageIcon,
  DollarSign,
  Clock,
  ArrowLeft,
  ChevronRight,
  LogOut,
  UserPlus,
  ShieldCheck,
  Mail,
  Lock,
  RefreshCw,
  Users
} from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import NavigationBar from '../components/NavigationBar';

const Admin = () => {
  const { 
    siteData, 
    admins,
    user,
    login,
    logout,
    createAdmin,
    removeAdmin,
    resetAdminPassword,
    resetSiteData,
    updateSettings, 
    addPackage, 
    updatePackage, 
    removePackage,
    addTestimonial,
    removeTestimonial
  } = useSiteData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('aucklandCityTours');
  
  // New Admin State
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      setAuthError('Invalid credentials or unauthorized account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createAdmin(newAdminEmail, newAdminPassword);
      alert('New admin registered successfully!');
      setNewAdminEmail('');
      setNewAdminPassword('');
      setEditingItem(null);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminTabs = [
    { id: 'dashboard', label: 'Stats', icon: <LayoutDashboard size={18} /> },
    { id: 'packages', label: 'Tours', icon: <Package size={18} /> },
    { id: 'testimonials', label: 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'team', label: 'Team', icon: <Users size={18} /> },
    { id: 'settings', label: 'Global', icon: <Settings size={18} /> }
  ];

  if (!user) {
    return (
      <div className="admin-login-page page-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <motion.div 
          className="admin-glass-panel" 
          style={{ padding: '3rem', width: '100%', maxWidth: '450px', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '1.5rem', marginBottom: '1rem' }}>
              <ShieldCheck size={40} color="var(--primary-color)" />
            </div>
            <h2 className="responsive-hero-title" style={{ fontSize: '2rem', margin: 0 }}>Secure Admin</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enter credentials to manage Happy Rides</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="input-group">
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="email" 
                  className="input-field admin-glass-panel" 
                  style={{ padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.03)' }}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="password" 
                  className="input-field admin-glass-panel" 
                  style={{ padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.03)' }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {authError && <p style={{ color: '#EF4444', fontSize: '0.9rem' }}>{authError}</p>}
            <button className="btn-primary-glass admin-btn w-full" type="submit" disabled={isSubmitting} style={{ padding: '1.2rem', marginTop: '1rem' }}>
              {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="admin-section">
      <h2 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Site Performance</h2>
      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div className="admin-glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <Package size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h3>Active Packages</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {Object.values(siteData.packages).reduce((acc, curr) => acc + curr.length, 0)}
          </p>
        </div>
        <div className="admin-glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <MessageSquare size={32} color="#10B981" style={{ marginBottom: '1rem' }} />
          <h3>Reviews</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{siteData.testimonials.length}</p>
        </div>
        <div className="admin-glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <Users size={32} color="#F59E0B" style={{ marginBottom: '1rem' }} />
          <h3>Admin Team</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{admins.length}</p>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="responsive-hero-title">Admin Team</h2>
        <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'team_add' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={18} /> New Admin
        </button>
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {admins.map(admin => (
          <div key={admin.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color={admin.role === 'super_admin' ? '#F59E0B' : 'var(--primary-color)'} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{admin.email}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{admin.role.replace('_', ' ').toUpperCase()} • Created {new Date(admin.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-outline admin-btn" title="Reset Password" onClick={() => resetAdminPassword(admin.email)}><RefreshCw size={16} /></button>
              {admin.email !== user.email && (
                <button className="btn-outline admin-btn" style={{ color: '#EF4444' }} title="Remove Admin" onClick={() => window.confirm(`Remove ${admin.email}?`) && removeAdmin(admin.email)}><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPackages = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="responsive-hero-title">Tour Packages</h2>
        <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'package', mode: 'add', category: selectedCategory })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> New Package
        </button>
      </div>
      <div className="category-tabs" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {Object.keys(siteData.packages).map(cat => (
          <button key={cat} className={`pop-tag ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)} style={{ background: selectedCategory === cat ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', border: 'none', padding: '0.6rem 1.2rem', whiteSpace: 'nowrap' }}>
            {cat.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {siteData.packages[selectedCategory].map(pkg => (
          <div key={pkg.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src={pkg.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '1rem', objectFit: 'cover', background: 'rgba(255,255,255,0.05)' }} />
              <div>
                <h4 style={{ fontSize: '1.2rem' }}>{pkg.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pkg.price} • {pkg.duration}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-outline admin-btn" onClick={() => setEditingItem({ ...pkg, type: 'package', mode: 'edit', category: selectedCategory })}><Edit3 size={18} /></button>
              <button className="btn-outline admin-btn" style={{ color: '#EF4444' }} onClick={() => removePackage(selectedCategory, pkg.id)}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="responsive-hero-title">Testimonials</h2>
        <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'testimonial', mode: 'add' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add Review
        </button>
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {siteData.testimonials.map(test => (
          <div key={test.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: '2rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{test.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{test.location} • {test.rating} Stars</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>"{test.text.substring(0, 80)}..."</p>
            </div>
            <button className="btn-outline admin-btn" style={{ color: '#EF4444', flexShrink: 0, width: '45px', height: '45px', padding: 0 }} onClick={() => removeTestimonial(test.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="admin-section">
      <h2 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Site Configuration</h2>
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>General Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div className="input-group">
            <label className="input-label">Hero Headline</label>
            <input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem' }} value={siteData.settings.heroTitle} onChange={(e) => updateSettings({ heroTitle: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">About Us Description</label>
            <textarea className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', height: '150px', resize: 'none' }} value={siteData.settings.aboutText} onChange={(e) => updateSettings({ aboutText: e.target.value })} />
          </div>
          <div className="responsive-grid" style={{ gap: '2rem' }}>
            <div className="input-group">
              <label className="input-label">Contact Email</label>
              <input type="email" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem' }} value={siteData.settings.contactEmail} onChange={(e) => updateSettings({ contactEmail: e.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Contact Phone</label>
              <input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem' }} value={siteData.settings.contactPhone} onChange={(e) => updateSettings({ contactPhone: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
      <div className="admin-glass-panel" style={{ padding: '3rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#EF4444' }}>Danger Zone</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Restore all original tour packages and images from the PPT assets. This will overwrite current content.</p>
        <button className="btn-outline admin-btn" style={{ borderColor: '#EF4444', color: '#EF4444', padding: '1rem 2rem', cursor: 'pointer' }} onClick={() => resetSiteData()}>Reset Site Data & Images</button>
      </div>
    </div>
  );

  const renderEditor = () => {
    if (editingItem.type === 'team_add') {
      return (
        <div className="admin-editor page-padding" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="content-container" style={{ width: '95%', maxWidth: '800px', paddingTop: '0' }}>
            <motion.div className="admin-glass-panel" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <UserPlus size={28} color="var(--primary-color)" />
                  <h2 className="responsive-hero-title" style={{ fontSize: '2rem', margin: 0 }}>Register New Team Member</h2>
                </div>
                <button className="btn-outline admin-btn" onClick={() => setEditingItem(null)} style={{ border: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleCreateAdmin} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div className="input-group">
                  <label className="input-label" style={{ opacity: 0.7 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input type="email" className="input-field admin-glass-panel" style={{ padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.02)' }} placeholder="admin@happyrides.co.nz" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label" style={{ opacity: 0.7 }}>Initial Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                    <input type="password" className="input-field admin-glass-panel" style={{ padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.02)' }} placeholder="••••••••" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} required />
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}><button className="btn-primary-glass admin-btn w-full" type="submit" disabled={isSubmitting} style={{ padding: '1.2rem', fontSize: '1.1rem', fontWeight: 600 }}>{isSubmitting ? 'Processing...' : 'Add to Admin Team'}</button></div>
              </form>
            </motion.div>
          </div>
        </div>
      );
    }
    const isPackage = editingItem.type === 'package';
    return (
      <div className="admin-editor page-padding" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="content-container" style={{ width: '95%', maxWidth: '800px', paddingTop: '0' }}>
          <motion.div className="admin-glass-panel" style={{ padding: '3rem' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <h2 className="responsive-hero-title">{editingItem.mode === 'add' ? 'Add New' : 'Edit'} {isPackage ? 'Package' : 'Testimonial'}</h2>
              <button className="btn-outline admin-btn" onClick={() => setEditingItem(null)} style={{ border: 'none', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              {isPackage ? (
                <>
                  <div className="input-group"><label className="input-label">Title</label><input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} /></div>
                  <div className="responsive-grid" style={{ gap: '2rem' }}>
                    <div className="input-group"><label className="input-label">Price</label><input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} value={editingItem.price || ''} onChange={(e) => setEditingItem({...editingItem, price: e.target.value})} /></div>
                    <div className="input-group"><label className="input-label">Duration</label><input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} value={editingItem.duration || ''} onChange={(e) => setEditingItem({...editingItem, duration: e.target.value})} /></div>
                  </div>
                  <div className="input-group"><label className="input-label">Description</label><textarea className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', height: '150px', resize: 'none' }} value={editingItem.description || ''} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} /></div>
                </>
              ) : (
                <>
                  <div className="input-group"><label className="input-label">Name</label><input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} value={editingItem.name || ''} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} /></div>
                  <div className="input-group"><label className="input-label">Location</label><input type="text" className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} value={editingItem.location || ''} onChange={(e) => setEditingItem({...editingItem, location: e.target.value})} /></div>
                  <div className="input-group"><label className="input-label">Review Text</label><textarea className="input-field admin-glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', height: '120px', resize: 'none' }} value={editingItem.text || ''} onChange={(e) => setEditingItem({...editingItem, text: e.target.value})} /></div>
                </>
              )}
              <button className="btn-primary-glass admin-btn w-full" style={{ padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem' }} onClick={() => {
                  if (isPackage) { if (editingItem.mode === 'add') addPackage(editingItem.category, editingItem); else updatePackage(editingItem.category, editingItem.id, editingItem); }
                  else { addTestimonial(editingItem); }
                  setEditingItem(null);
                }}><Save size={20} style={{ marginRight: '0.5rem' }} /> Save Changes</button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '140px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderDashboard()}</motion.div>}
          {activeTab === 'packages' && <motion.div key="pkg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderPackages()}</motion.div>}
          {activeTab === 'testimonials' && <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderTestimonials()}</motion.div>}
          {activeTab === 'team' && <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderTeam()}</motion.div>}
          {activeTab === 'settings' && <motion.div key="set" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderSettings()}</motion.div>}
        </AnimatePresence>
      </div>
      <AnimatePresence>{editingItem && renderEditor()}</AnimatePresence>
      <div className="category-nav-wrapper">
        <div className="category-nav" style={{ padding: '0.5rem' }}>
          {adminTabs.map((tab) => (
            <motion.button key={tab.id} className={`category-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </motion.button>
          ))}
          <motion.button className="category-nav-item" style={{ color: '#EF4444' }} onClick={() => logout()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}><span className="nav-icon"><LogOut size={18} /></span><span className="nav-label">Logout</span></motion.button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
