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
  Users,
  Car
} from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import NavigationBar from '../components/NavigationBar';

const Admin = () => {
  const { 
    siteData, admins, user, login, logout, createAdmin, removeAdmin, 
    resetAdminPassword, resetSiteData, updateSettings, addPackage, 
    updatePackage, removePackage, addTestimonial, removeTestimonial,
    addService, updateService, removeService
  } = useSiteData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('aucklandCityTours');
  const [bottomOffset, setBottomOffset] = useState(32);
  
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Re-sync fleet if missing
  const fleetData = siteData?.settings?.fleet || [
    { id: 'f1', type: 'SEDAN', img: 'image12.png', capacity: '1-3 Passengers' },
    { id: 'f2', type: 'SUV', img: 'image13.png', capacity: '1-4 Passengers' },
    { id: 'f3', type: 'PEOPLE MOVER', img: 'image18.png', capacity: '1-7 Passengers' },
    { id: 'f4', type: 'MINIBUS', img: 'image10.png', capacity: '1-11 Passengers' }
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const footerVisibleHeight = viewportHeight - footerRect.top;
        if (footerVisibleHeight > 0) {
          setBottomOffset(footerVisibleHeight + 20);
        } else {
          setBottomOffset(32);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    if (!path) return '/tour1.jpeg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return path;
    return `/${path}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try { await login(email, password); } catch (error) { setAuthError('Invalid credentials.'); } finally { setIsSubmitting(false); }
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
    { id: 'services', label: 'Services', icon: <Car size={18} /> },
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
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="input-group">
              <label className="input-label" style={{ textAlign: 'left' }}>Admin Email</label>
              <input type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label" style={{ textAlign: 'left' }}>Secure Password</label>
              <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {authError && <p style={{ color: '#EF4444' }}>{authError}</p>}
            <button className="btn-primary-glass admin-btn w-full" type="submit" disabled={isSubmitting} style={{ padding: '1.2rem' }}>{isSubmitting ? 'Verifying...' : 'Access Dashboard'}</button>
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
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{Object.values(siteData.packages).reduce((acc, curr) => acc + curr.length, 0)}</p>
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
        <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'team_add' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserPlus size={18} /> New Admin</button>
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {admins.map(admin => (
          <div key={admin.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20} color={admin.role === 'super_admin' ? '#F59E0B' : 'var(--primary-color)'} /></div>
              <div><h4 style={{ fontSize: '1.1rem' }}>{admin.email}</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{admin.role.replace('_', ' ').toUpperCase()} • Created {new Date(admin.createdAt).toLocaleDateString()}</p></div>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-outline admin-btn" title="Reset Password" onClick={() => resetAdminPassword(admin.email)}><RefreshCw size={16} /></button>
              {admin.email !== user.email && (<button className="btn-outline admin-btn" style={{ color: '#EF4444' }} title="Remove Admin" onClick={() => window.confirm(`Remove ${admin.email}?`) && removeAdmin(admin.email)}><Trash2 size={16} /></button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="responsive-hero-title">Core Services</h2>
        <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'service', mode: 'add' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={18} /> Add Service</button>
      </div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {siteData.services.map(s => (
          <div key={s.id || s.title} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: '2rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{s.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-outline admin-btn" onClick={() => setEditingItem({ ...s, type: 'service', mode: 'edit' })}><Edit3 size={18} /></button>
              <button className="btn-outline admin-btn" style={{ color: '#EF4444' }} onClick={() => removeService(s.id || s.title)}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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

  const renderTestimonials = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}><h2 className="responsive-hero-title">Testimonials</h2><button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'testimonial', mode: 'add' })}><Plus size={18} /> Add Review</button></div>
      <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {siteData.testimonials.map(test => (
          <div key={test.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, paddingRight: '2rem' }}><h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{test.name}</h4><p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{test.location} • {test.rating} Stars</p><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>"{test.text.substring(0, 80)}..."</p></div>
            <button className="btn-outline admin-btn" style={{ color: '#EF4444', flexShrink: 0, width: '45px', height: '45px', padding: 0 }} onClick={() => removeTestimonial(test.id)}><Trash2 size={18} /></button>
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

  const renderSettings = () => (
    <div className="admin-section" style={{ paddingBottom: '5rem' }}>
      <h2 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Site Configuration</h2>
      
      {/* Site Visuals Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ImageIcon size={24} /> Site Visuals & Branding
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <div className="input-group" style={{ textAlign: 'center' }}>
            <label className="input-label">Site Logo</label>
            <div style={{ position: 'relative', width: '100px', margin: '0 auto' }}>
              <img src={getImagePath(siteData.settings.logoImage)} alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', padding: '0.5rem' }} />
              <button onClick={() => setEditingItem({ type: 'global_image', key: 'logoImage' })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
            </div>
          </div>
          <div className="input-group" style={{ textAlign: 'center' }}>
            <label className="input-label">Global Background</label>
            <div style={{ position: 'relative', width: '150px', margin: '0 auto' }}>
              <img src={getImagePath(siteData.settings.heroBgImage)} alt="BG" style={{ width: '140px', height: '80px', objectFit: 'cover', borderRadius: '1rem' }} />
              <button onClick={() => setEditingItem({ type: 'global_image', key: 'heroBgImage' })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
            </div>
          </div>
          <div className="input-group" style={{ textAlign: 'center' }}>
            <label className="input-label">Hero Visual Card</label>
            <div style={{ position: 'relative', width: '150px', margin: '0 auto' }}>
              <img src={getImagePath(siteData.settings.heroVisualImage)} alt="Hero" style={{ width: '140px', height: '80px', objectFit: 'cover', borderRadius: '1rem' }} />
              <button onClick={() => setEditingItem({ type: 'global_image', key: 'heroVisualImage' })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
            </div>
          </div>
          <div className="input-group" style={{ textAlign: 'center' }}>
            <label className="input-label">About Us Brief Image</label>
            <div style={{ position: 'relative', width: '150px', margin: '0 auto' }}>
              <img src={getImagePath(siteData.settings.aboutBriefImage)} alt="About" style={{ width: '140px', height: '80px', objectFit: 'cover', borderRadius: '1rem' }} />
              <button onClick={() => setEditingItem({ type: 'global_image', key: 'aboutBriefImage' })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
            </div>
          </div>
          <div className="input-group" style={{ textAlign: 'center' }}>
            <label className="input-label">Packages Brief Image</label>
            <div style={{ position: 'relative', width: '150px', margin: '0 auto' }}>
              <img src={getImagePath(siteData.settings.packagesBriefImage)} alt="Pkg" style={{ width: '140px', height: '80px', objectFit: 'cover', borderRadius: '1rem' }} />
              <button onClick={() => setEditingItem({ type: 'global_image', key: 'packagesBriefImage' })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Fleet Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Car size={24} /> Professional Fleet
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {fleetData.map((v, i) => (
            <div key={v.id || i} className="admin-glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <img src={getImagePath(v.img)} alt="" style={{ width: '80px', height: '60px', borderRadius: '1rem', objectFit: 'contain', background: 'rgba(255,255,255,0.05)' }} />
                  <button onClick={() => setEditingItem({ type: 'fleet_image', index: i })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={12} /></button>
                </div>
                <div style={{ flex: 1 }}>
                  <input type="text" className="input-field" style={{ fontSize: '0.9rem', padding: '0.5rem' }} value={v.type} onChange={(e) => {
                    const newFleet = [...fleetData];
                    newFleet[i] = { ...newFleet[i], type: e.target.value };
                    updateSettings({ fleet: newFleet });
                  }} placeholder="Vehicle Type" />
                </div>
              </div>
              <div className="input-group">
                <input type="text" className="input-field" style={{ fontSize: '0.8rem', padding: '0.5rem' }} value={v.capacity} onChange={(e) => {
                  const newFleet = [...fleetData];
                  newFleet[i] = { ...newFleet[i], capacity: e.target.value };
                  updateSettings({ fleet: newFleet });
                }} placeholder="Capacity Label" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branding Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Settings size={24} /> Branding & Identity
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div className="input-group">
            <label className="input-label">Site Name (Title)</label>
            <input type="text" className="input-field" value={siteData.settings.siteTitle} onChange={(e) => updateSettings({ siteTitle: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Slogan (Tagline)</label>
            <input type="text" className="input-field" value={siteData.settings.siteTagline} onChange={(e) => updateSettings({ siteTagline: e.target.value })} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ImageIcon size={24} /> Hero Section
        </h3>
        <div style={{ display: 'grid', gap: '3rem' }}>
          <div className="input-group">
            <label className="input-label">Main Hero Headline</label>
            <textarea className="input-field" style={{ height: '100px' }} value={siteData.settings.heroTitle} onChange={(e) => updateSettings({ heroTitle: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Hero Subtitle / Description</label>
            <textarea className="input-field" style={{ height: '150px' }} value={siteData.settings.heroSubtitle} onChange={(e) => updateSettings({ heroSubtitle: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div className="input-group"><label className="input-label">Feature 1</label><input type="text" className="input-field" value={siteData.settings.heroFeature1} onChange={(e) => updateSettings({ heroFeature1: e.target.value })} /></div>
            <div className="input-group"><label className="input-label">Feature 2</label><input type="text" className="input-field" value={siteData.settings.heroFeature2} onChange={(e) => updateSettings({ heroFeature2: e.target.value })} /></div>
            <div className="input-group"><label className="input-label">Feature 3</label><input type="text" className="input-field" value={siteData.settings.heroFeature3} onChange={(e) => updateSettings({ heroFeature3: e.target.value })} /></div>
          </div>
        </div>
      </div>

      {/* Booking Integration */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <RefreshCw size={24} /> Booking Integration
        </h3>
        <div className="input-group">
          <label className="input-label">Booking Software URL (Iframe Link)</label>
          <input type="text" className="input-field" placeholder="https://booking-software.com/your-id" value={siteData.settings.bookingLink || ''} onChange={(e) => updateSettings({ bookingLink: e.target.value })} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>This link will be used in the frames across Home, Airport Transfer, and Intercity Transfer pages.</p>
        </div>
      </div>

      {/* Home Page Content */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LayoutDashboard size={24} /> Home Page Sections
        </h3>
        <div style={{ display: 'grid', gap: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="input-group"><label className="input-label">"Why Us" Title</label><input type="text" className="input-field" value={siteData.settings.homeWhyTitle} onChange={(e) => updateSettings({ homeWhyTitle: e.target.value })} /></div>
            <div className="input-group"><label className="input-label">"Why Us" Text</label><textarea className="input-field" style={{ height: '120px' }} value={siteData.settings.homeWhyText} onChange={(e) => updateSettings({ homeWhyText: e.target.value })} /></div>
          </div>
          <div className="input-group"><label className="input-label">Services Section Title</label><input type="text" className="input-field" value={siteData.settings.homeServicesTitle} onChange={(e) => updateSettings({ homeServicesTitle: e.target.value })} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="input-group"><label className="input-label">Packages Title</label><input type="text" className="input-field" value={siteData.settings.homePackagesTitle} onChange={(e) => updateSettings({ homePackagesTitle: e.target.value })} /></div>
            <div className="input-group"><label className="input-label">Packages Brief</label><textarea className="input-field" style={{ height: '120px' }} value={siteData.settings.homePackagesText} onChange={(e) => updateSettings({ homePackagesText: e.target.value })} /></div>
          </div>
        </div>
      </div>

      {/* About Us Content */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <RefreshCw size={24} /> About Us Page
        </h3>
        <div style={{ display: 'grid', gap: '3rem' }}>
          <div className="input-group"><label className="input-label">Main Heading</label><input type="text" className="input-field" value={siteData.settings.aboutTitle} onChange={(e) => updateSettings({ aboutTitle: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Story Section Title</label><input type="text" className="input-field" value={siteData.settings.aboutStoryTitle} onChange={(e) => updateSettings({ aboutStoryTitle: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Our Story Detailed Text</label><textarea className="input-field" style={{ height: '250px' }} value={siteData.settings.aboutStoryText} onChange={(e) => updateSettings({ aboutStoryText: e.target.value })} /></div>
        </div>
      </div>

      {/* Contact & Footer Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mail size={24} /> Contact & Footer
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div className="input-group"><label className="input-label">Contact Email</label><input type="email" className="input-field" value={siteData.settings.contactEmail} onChange={(e) => updateSettings({ contactEmail: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Contact Phone</label><input type="text" className="input-field" value={siteData.settings.contactPhone} onChange={(e) => updateSettings({ contactPhone: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Physical Address</label><input type="text" className="input-field" value={siteData.settings.contactAddress} onChange={(e) => updateSettings({ contactAddress: e.target.value })} /></div>
        </div>
        <div className="input-group" style={{ marginBottom: '3rem' }}>
          <label className="input-label">Footer Description Paragraph</label>
          <textarea className="input-field" style={{ height: '120px' }} value={siteData.settings.footerDesc} onChange={(e) => updateSettings({ footerDesc: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          <div className="input-group"><label className="input-label">Instagram URL</label><input type="text" className="input-field" value={siteData.settings.instagramUrl} onChange={(e) => updateSettings({ instagramUrl: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">WhatsApp Number</label><input type="text" className="input-field" value={siteData.settings.whatsappNumber} onChange={(e) => updateSettings({ whatsappNumber: e.target.value })} /></div>
        </div>
      </div>

      <div className="admin-glass-panel" style={{ padding: '3rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#EF4444' }}>Danger Zone</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Warning: Resetting data will wipe all custom text and revert to defaults.</p>
        <button className="btn-outline admin-btn" style={{ borderColor: '#EF4444', color: '#EF4444' }} onClick={() => resetSiteData()}>Reset Data</button>
      </div>
    </div>
  );

  const renderEditor = () => {
    if (editingItem.type === 'team_add') {
      return (
        <div className="admin-editor" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="content-container" style={{ width: '95%', maxWidth: '800px' }}>
            <motion.div className="admin-glass-panel" style={{ padding: '2.5rem' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}><h2>New Admin</h2><button className="btn-outline admin-btn" onClick={() => setEditingItem(null)}><X size={20} /></button></div>
              <form onSubmit={handleCreateAdmin} style={{ display: 'grid', gap: '2rem' }}>
                <div className="input-group"><label className="input-label">Email Address</label><input type="email" className="input-field" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} required /></div>
                <div className="input-group"><label className="input-label">Password</label><input type="password" className="input-field" value={newAdminPassword} onChange={(e) => setNewAdminPassword(e.target.value)} required /></div>
                <button className="btn-primary-glass admin-btn w-full" type="submit" disabled={isSubmitting} style={{ padding: '1.2rem' }}>{isSubmitting ? 'Processing...' : 'Register Admin'}</button>
              </form>
            </motion.div>
          </div>
        </div>
      );
    }

    if (editingItem.type === 'global_image') {
      return (
        <div className="admin-editor" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="content-container" style={{ width: '95%', maxWidth: '900px' }}>
            <motion.div className="admin-glass-panel" style={{ padding: '3rem', maxHeight: '80vh', overflowY: 'auto' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <h2>Select Image for {editingItem.key.replace(/([A-Z])/g, ' $1').trim()}</h2>
                <button className="btn-outline admin-btn" onClick={() => setEditingItem(null)}><X size={24} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                {availableAssets.map(asset => (
                  <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: siteData.settings[editingItem.key] === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { updateSettings({ [editingItem.key]: asset }); setEditingItem(null); }}>
                    <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                    <p style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '0.5rem' }}>{asset}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    if (editingItem.type === 'fleet_image') {
      return (
        <div className="admin-editor" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="content-container" style={{ width: '95%', maxWidth: '900px' }}>
            <motion.div className="admin-glass-panel" style={{ padding: '3rem', maxHeight: '80vh', overflowY: 'auto' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <h2>Select Vehicle Image</h2>
                <button className="btn-outline admin-btn" onClick={() => setEditingItem(null)}><X size={24} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                {availableAssets.map(asset => (
                  <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: fleetData[editingItem.index].img === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { 
                    const newFleet = [...fleetData];
                    newFleet[editingItem.index] = { ...newFleet[editingItem.index], img: asset };
                    updateSettings({ fleet: newFleet });
                    setEditingItem(null); 
                  }}>
                    <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                    <p style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '0.5rem' }}>{asset}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    const isPackage = editingItem.type === 'package';
    const isService = editingItem.type === 'service';

    return (
      <div className="admin-editor" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="content-container" style={{ width: '95%', maxWidth: '800px' }}>
          <motion.div className="admin-glass-panel" style={{ padding: '3rem' }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
              <h2>{editingItem.mode === 'add' ? 'Add' : 'Edit'} {isPackage ? 'Package' : isService ? 'Service' : 'Review'}</h2>
              <button className="btn-outline admin-btn" onClick={() => setEditingItem(null)}><X size={24} /></button>
            </div>
            <div style={{ grid: 'grid', gap: '2rem' }}>
              {isPackage && (
                <div style={{ display: 'grid', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={getImagePath(editingItem.image)} alt="" style={{ width: '120px', height: '120px', borderRadius: '1.5rem', objectFit: 'cover', border: '2px solid var(--primary-color)' }} />
                      <button onClick={() => setIsGalleryOpen(true)} style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}><ImageIcon size={18} /></button>
                    </div>
                    <div style={{ flex: 1 }} className="input-group"><label className="input-label">Tour Title</label><input type="text" className="input-field" value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="input-group"><label className="input-label">Price Label</label><input type="text" className="input-field" value={editingItem.price || ''} onChange={(e) => setEditingItem({...editingItem, price: e.target.value})} /></div>
                    <div className="input-group"><label className="input-label">Duration</label><input type="text" className="input-field" value={editingItem.duration || ''} onChange={(e) => setEditingItem({...editingItem, duration: e.target.value})} /></div>
                  </div>
                  <div className="input-group"><label className="input-label">Description</label><textarea className="input-field" style={{ height: '150px' }} value={editingItem.description || ''} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} /></div>
                </div>
              )}
              {isService && (
                <div style={{ display: 'grid', gap: '2rem' }}>
                  <div className="input-group"><label className="input-label">Service Title</label><input type="text" className="input-field" value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} /></div>
                  <div className="input-group"><label className="input-label">Description</label><textarea className="input-field" style={{ height: '150px' }} value={editingItem.desc || ''} onChange={(e) => setEditingItem({...editingItem, desc: e.target.value})} /></div>
                </div>
              )}
              {!isPackage && !isService && (
                <div style={{ display: 'grid', gap: '2rem' }}>
                  <div className="input-group"><label className="input-label">Guest Name</label><input type="text" className="input-field" value={editingItem.name || ''} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} /></div>
                  <div className="input-group"><label className="input-label">Review Content</label><textarea className="input-field" style={{ height: '150px' }} value={editingItem.text || ''} onChange={(e) => setEditingItem({...editingItem, text: e.target.value})} /></div>
                </div>
              )}
              
              <button className="btn-primary-glass admin-btn w-full" style={{ marginTop: '2rem' }} onClick={() => { 
                if (isPackage) { 
                  if (editingItem.mode === 'add') addPackage(editingItem.category, editingItem); 
                  else updatePackage(editingItem.category, editingItem.id, editingItem); 
                } else if (isService) {
                  if (editingItem.mode === 'add') addService(editingItem);
                  else updateService(editingItem.id || editingItem.title, editingItem);
                } else { 
                  if (editingItem.mode === 'add') addTestimonial(editingItem);
                  else alert("Editing testimonials is currently read/remove only.");
                } 
                setEditingItem(null); 
              }}>
                <Save size={20} /> Save Changes
              </button>
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
          {activeTab === 'dashboard' && <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderDashboard()}</motion.div>}
          {activeTab === 'packages' && <motion.div key="pkg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderPackages()}</motion.div>}
          {activeTab === 'services' && <motion.div key="svc" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderServices()}</motion.div>}
          {activeTab === 'testimonials' && <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTestimonials()}</motion.div>}
          {activeTab === 'team' && <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTeam()}</motion.div>}
          {activeTab === 'gallery' && <motion.div key="gal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderGallery()}</motion.div>}
          {activeTab === 'settings' && <motion.div key="set" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderSettings()}</motion.div>}
        </AnimatePresence>
      </div>
      <AnimatePresence>{editingItem && renderEditor()}</AnimatePresence>
      <div className="category-nav-wrapper" style={{ bottom: `${bottomOffset}px`, position: 'fixed' }}><div className="category-nav">{adminTabs.map((tab) => (<button key={tab.id} className={`category-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}><span className="nav-icon">{tab.icon}</span><span className="nav-label">{tab.label}</span></button>))}<button className="category-nav-item" onClick={() => logout()}><span className="nav-icon"><LogOut size={18} /></span><span className="nav-label">Logout</span></button></div></div>
    </div>
  );
};

export default Admin;
