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
    siteData, admins, user, login, logout, createAdmin, removeAdmin, 
    resetAdminPassword, resetSiteData, updateSettings, addPackage, 
    updatePackage, removePackage, addTestimonial, removeTestimonial
  } = useSiteData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('aucklandCityTours');
  
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const availableAssets = [
    'auckland.jpg', 'auckland_city.png', 'rotorua_geothermal.png', 'nz_landscape.png', 'hero_bg.jpeg', 'logo.png', 'hero.png',
    'tour1.jpeg', 'tour2.jpeg', 'tour3.jpeg', 'tour4.jpeg', 'tour5.jpeg', 'tour6.jpeg', 'tour7.jpeg',
    'image1.jpeg', 'image2.png', 'image3.jpeg', 'image4.jpeg', 'image5.png', 'image6.png', 'image8.png', 'image9.jpeg',
    'image10.png', 'image12.png', 'image13.png', 'image18.png', 'image20.jpeg', 'image21.jpeg', 'image22.jpeg',
    'image27.jpeg', 'image29.png', 'image30.jpeg', 'image31.jpeg', 'image32.jpeg', 'image33.jpeg', 'image34.jpeg',
    'image35.jpeg', 'image36.jpeg', 'image37.jpeg', 'image38.jpeg', 'image39.jpeg', 'image40.jpeg', 'image41.jpeg',
    'image42.jpeg', 'image43.jpeg', 'image44.jpeg', 'image45.jpeg', 'image46.jpeg', 'image47.jpeg', 'image48.jpeg',
    'image49.jpeg', 'image50.jpeg', 'image51.jpeg', 'image52.jpeg', 'image53.jpeg', 'image54.jpeg', 'image55.jpeg',
    'image56.jpeg', 'image57.jpeg', 'image58.jpeg', 'image59.jpeg', 'image60.jpeg', 'image61.jpeg', 'image62.jpeg',
    'image63.jpg', 'image64.jpeg', 'image65.jpeg', 'image66.jpeg', 'image67.jpeg', 'image68.jpeg', 'image69.jpeg',
    'image70.jpeg', 'image71.jpeg', 'image72.jpeg', 'image73.jpeg', 'image74.jpeg', 'image75.jpeg', 'image76.jpeg',
    'image77.jpeg', 'image78.jpeg', 'image79.jpeg', 'image80.jpeg', 'image81.jpeg', 'image82.jpeg', 'image83.jpeg',
    'image84.jpeg', 'image85.jpeg', 'image86.jpeg', 'image87.jpeg', 'image88.jpeg', 'image89.jpeg', 'image93.jpeg', 'image97.png'
  ];

  const getImagePath = (path) => {
    if (!path) return './tour1.jpeg';
    if (path.startsWith('./') || path.startsWith('http')) return path;
    if (path.startsWith('/')) return `.${path}`;
    return `./${path}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try { await login(email, password); } catch (error) { setAuthError('Invalid credentials.'); } finally { setIsSubmitting(false); }
  };

  const adminTabs = [
    { id: 'dashboard', label: 'Stats', icon: <LayoutDashboard size={18} /> },
    { id: 'packages', label: 'Tours', icon: <Package size={18} /> },
    { id: 'testimonials', label: 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'team', label: 'Team', icon: <Users size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={18} /> },
    { id: 'settings', label: 'Global', icon: <Settings size={18} /> }
  ];

  if (!user) {
    return (
      <div className="admin-login-page page-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <motion.div className="admin-glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px', textAlign: 'center' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ marginBottom: '2rem' }}><div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '1.5rem', marginBottom: '1rem' }}><ShieldCheck size={40} color="var(--primary-color)" /></div><h2 className="responsive-hero-title">Secure Admin</h2></div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input type="email" className="input-field admin-glass-panel" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="input-field admin-glass-panel" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {authError && <p style={{ color: '#EF4444' }}>{authError}</p>}
            <button className="btn-primary-glass admin-btn w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Verifying...' : 'Access'}</button>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderPackages = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}><h2 className="responsive-hero-title">Tour Packages</h2><button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'package', mode: 'add', category: selectedCategory })}><Plus size={18} /> New Package</button></div>
      <div className="category-tabs" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem' }}>
        {Object.keys(siteData.packages).map(cat => (
          <button key={cat} className={`pop-tag ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)} style={{ background: selectedCategory === cat ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '0.6rem 1.2rem' }}>{cat.replace(/([A-Z])/g, ' $1').trim()}</button>
        ))}
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {siteData.packages[selectedCategory].map(pkg => (
          <div key={pkg.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}><img src={getImagePath(pkg.image)} alt="" style={{ width: '60px', height: '60px', borderRadius: '1rem', objectFit: 'cover' }} /><div><h4>{pkg.title}</h4><p>{pkg.price} • {pkg.duration}</p></div></div>
            <div style={{ display: 'flex', gap: '1rem' }}><button className="btn-outline admin-btn" onClick={() => setEditingItem({ ...pkg, type: 'package', mode: 'edit', category: selectedCategory })}><Edit3 size={18} /></button><button className="btn-outline admin-btn" style={{ color: '#EF4444' }} onClick={() => removePackage(selectedCategory, pkg.id)}><Trash2 size={18} /></button></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="admin-section">
      <h2 className="responsive-hero-title" style={{ marginBottom: '1rem' }}>Asset Gallery</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>{availableAssets.length} images available in root.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
        {availableAssets.map(asset => (
          <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', textAlign: 'center' }}>
            <img src={getImagePath(asset)} alt={asset} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
            <p style={{ fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.7 }}>{asset}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => {
    const isPackage = editingItem.type === 'package';
    return (
      <div className="admin-editor" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="content-container" style={{ width: '95%', maxWidth: '800px' }}>
          <motion.div className="admin-glass-panel" style={{ padding: '3rem' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}><h2>{editingItem.mode === 'add' ? 'Add' : 'Edit'} {isPackage ? 'Package' : 'Review'}</h2><button className="btn-outline admin-btn" onClick={() => setEditingItem(null)}><X size={24} /></button></div>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {isPackage && (
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={getImagePath(editingItem.image)} alt="" style={{ width: '120px', height: '120px', borderRadius: '1rem', objectFit: 'cover', border: '2px solid var(--primary-color)' }} />
                    <button onClick={() => setIsGalleryOpen(true)} style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer' }}><ImageIcon size={18} /></button>
                  </div>
                  <div style={{ flex: 1 }}><label className="input-label">Title</label><input type="text" className="input-field admin-glass-panel" value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} /></div>
                </div>
              )}
              {!isPackage && <input type="text" className="input-field admin-glass-panel" placeholder="Name" value={editingItem.name || ''} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} />}
              <button className="btn-primary-glass admin-btn w-full" onClick={() => { if (isPackage) { if (editingItem.mode === 'add') addPackage(editingItem.category, editingItem); else updatePackage(editingItem.category, editingItem.id, editingItem); } else { addTestimonial(editingItem); } setEditingItem(null); }}><Save size={20} /> Save Changes</button>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          {isGalleryOpen && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <motion.div className="admin-glass-panel" style={{ width: '100%', maxWidth: '900px', maxHeight: '80vh', overflowY: 'auto', padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}><h3>Choose Image</h3><button onClick={() => setIsGalleryOpen(false)}><X size={20} /></button></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.2rem' }}>
                  {availableAssets.map(asset => (
                    <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: editingItem.image === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { setEditingItem({ ...editingItem, image: asset }); setIsGalleryOpen(false); }}>
                      <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                      <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '0.5rem' }}>{asset}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="admin-page page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '140px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'packages' && <motion.div key="pkg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderPackages()}</motion.div>}
          {activeTab === 'gallery' && <motion.div key="gal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderGallery()}</motion.div>}
          {activeTab === 'dashboard' && <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h2 className="responsive-hero-title">Stats</h2></motion.div>}
          {activeTab === 'settings' && <motion.div key="set" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="btn-outline admin-btn" onClick={() => resetSiteData()}>Reset Data</button></motion.div>}
        </AnimatePresence>
      </div>
      <AnimatePresence>{editingItem && renderEditor()}</AnimatePresence>
      <div className="category-nav-wrapper"><div className="category-nav">{adminTabs.map((tab) => (<button key={tab.id} className={`category-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.icon}<span>{tab.label}</span></button>))}<button className="category-nav-item" onClick={() => logout()}><LogOut size={18} /><span>Logout</span></button></div></div>
    </div>
  );
};

export default Admin;
