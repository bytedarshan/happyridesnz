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
  Car,
  MapPin
} from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import NavigationBar from '../components/NavigationBar';
import { uploadToCloudinary } from '../utils/cloudinary';
import cloudinaryMapping from '../../cloudinary_mapping.json';

const Admin = () => {
  const { 
    siteData, admins, user, login, logout, createAdmin, removeAdmin, 
    resetAdminPassword, resetSiteData, updateSettings, addPackage, 
    updatePackage, removePackage, addTestimonial, removeTestimonial,
    addService, updateService, removeService, syncNewDefaults
  } = useSiteData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedTourCategory, setSelectedTourCategory] = useState('aucklandCityTours');
  const [selectedActivityCategory, setSelectedActivityCategory] = useState('aucklandActivities');
  const [bottomOffset, setBottomOffset] = useState(32);
  
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e, onUploadSuccess) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onUploadSuccess(url);
    } catch (err) {
      alert('Error uploading image to Cloudinary: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Re-sync fleet if missing
  const fleetData = siteData?.settings?.fleet || [
    { id: 'f1', type: 'SEDAN', img: 'image12.png', capacity: '1-3 Passengers' },
    { id: 'f2', type: 'SUV', img: 'image13.png', capacity: '1-4 Passengers' },
    { id: 'f3', type: 'PEOPLE MOVER', img: 'image18.png', capacity: '1-7 Passengers' },
    { id: 'f4', type: 'MINIBUS', img: 'image10.png', capacity: '1-11 Passengers' }
  ];

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get all migrated Cloudinary URLs from mapping
  const migratedAssets = React.useMemo(() => {
    try {
      return Object.values(cloudinaryMapping);
    } catch (e) {
      return [];
    }
  }, []);

  // Merge migrated assets with custom uploaded assets saved in Firestore settings
  const galleryImages = React.useMemo(() => {
    const customImages = siteData?.settings?.galleryImages || [];
    return Array.from(new Set([...migratedAssets, ...customImages]));
  }, [siteData, migratedAssets]);

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
    { id: 'tours', label: 'Tours', icon: <Package size={18} /> },
    { id: 'activities', label: 'Activities', icon: <MapPin size={18} /> },
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
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '1.5rem', marginBottom: '1rem' }}><ShieldCheck size={40} color="var(--primary-color)" /></div>
            <h2 className="responsive-hero-title">Secure Admin</h2>
            <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>v2.1 - Login Required</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label" style={{ textAlign: 'left' }}>Admin Email</label>
              <input type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label className="input-label" style={{ textAlign: 'left' }}>Secure Password</label>
              <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {authError && <p style={{ color: '#EF4444', fontSize: '0.9rem' }}>{authError}</p>}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={{ 
                padding: '1rem', 
                background: '#3B82F6', 
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'block',
                marginTop: '1rem',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
              }}
            >
              {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderDashboard = () => {
    const toursCount = (siteData.packages.aucklandCityTours || []).length + 
                       (siteData.packages.intercityTours || []).length + 
                       (siteData.packages.rotoruaTours || []).length + 
                       (siteData.packages.paihiaTours || []).length;
                       
    const activitiesCount = (siteData.packages.aucklandActivities || []).length + 
                            (siteData.packages.rotoruaActivities || []).length + 
                            (siteData.packages.paihiaActivities || []).length;

    return (
      <div className="admin-section">
        <h2 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Site Performance</h2>
        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div className="admin-glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <Package size={32} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
            <h3>Active Tours</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{toursCount}</p>
          </div>
          <div className="admin-glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <MapPin size={32} color="#38BDF8" style={{ marginBottom: '1rem' }} />
            <h3>Active Activities</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{activitiesCount}</p>
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
  };

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

  const renderTours = () => {
    const tourCategories = ['aucklandCityTours', 'intercityTours', 'rotoruaTours', 'paihiaTours'];
    return (
      <div className="admin-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <h2 className="responsive-hero-title">Manage Tours</h2>
          <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'package', mode: 'add', category: selectedTourCategory })}>
            <Plus size={18} /> New Tour
          </button>
        </div>
        <div className="category-tabs" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem' }}>
          {tourCategories.map(cat => (
            <button 
              key={cat} 
              className={`pop-tag ${selectedTourCategory === cat ? 'active' : ''}`} 
              onClick={() => setSelectedTourCategory(cat)} 
              style={{ background: selectedTourCategory === cat ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '0.6rem 1.2rem' }}
            >
              {cat === 'intercityTours' ? 'Waitomo & Hobbiton (Intercity)' : cat.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {siteData.packages[selectedTourCategory]?.map(pkg => (
            <div key={pkg.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <img src={getImagePath(pkg.image)} alt="" style={{ width: '60px', height: '60px', borderRadius: '1rem', objectFit: 'cover' }} />
                <div>
                  <h4>{pkg.title}</h4>
                  <p>{pkg.price} • {pkg.duration}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-outline admin-btn" onClick={() => setEditingItem({ ...pkg, type: 'package', mode: 'edit', category: selectedTourCategory })}>
                  <Edit3 size={18} />
                </button>
                <button className="btn-outline admin-btn" style={{ color: '#EF4444' }} onClick={() => removePackage(selectedTourCategory, pkg.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActivities = () => {
    const activityCategories = ['aucklandActivities', 'rotoruaActivities', 'paihiaActivities'];
    return (
      <div className="admin-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <h2 className="responsive-hero-title">Manage Activities</h2>
          <button className="btn-primary-glass admin-btn" onClick={() => setEditingItem({ type: 'package', mode: 'add', category: selectedActivityCategory })}>
            <Plus size={18} /> New Activity
          </button>
        </div>
        <div className="category-tabs" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem' }}>
          {activityCategories.map(cat => (
            <button 
              key={cat} 
              className={`pop-tag ${selectedActivityCategory === cat ? 'active' : ''}`} 
              onClick={() => setSelectedActivityCategory(cat)} 
              style={{ background: selectedActivityCategory === cat ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)', border: 'none', padding: '0.6rem 1.2rem' }}
            >
              {cat.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {siteData.packages[selectedActivityCategory]?.map(pkg => (
            <div key={pkg.id} className="admin-glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <img src={getImagePath(pkg.image)} alt="" style={{ width: '60px', height: '60px', borderRadius: '1rem', objectFit: 'cover' }} />
                <div>
                  <h4>{pkg.title}</h4>
                  <p>{pkg.price} • {pkg.duration}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-outline admin-btn" onClick={() => setEditingItem({ ...pkg, type: 'package', mode: 'edit', category: selectedActivityCategory })}>
                  <Edit3 size={18} />
                </button>
                <button className="btn-outline admin-btn" style={{ color: '#EF4444' }} onClick={() => removePackage(selectedActivityCategory, pkg.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const currentCustom = siteData?.settings?.galleryImages || [];
      const newCustom = Array.from(new Set([...currentCustom, url]));
      await updateSettings({ galleryImages: newCustom });
      alert('Custom image uploaded to Cloudinary and added to your media gallery successfully!');
    } catch (err) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const renderGallery = () => (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="responsive-hero-title">Cloudinary Media Gallery</h2>
        <div>
          <input 
            type="file" 
            id="cloudinary-gallery-direct-upload" 
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={handleGalleryUpload}
          />
          <label 
            htmlFor="cloudinary-gallery-direct-upload" 
            className="btn-primary-glass admin-btn" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '0.8rem 1.8rem' }}
          >
            {isUploading ? (
              <>
                <div className="premium-loader" style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Upload New Image</span>
              </>
            )}
          </label>
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
        {galleryImages.length} persistent Cloudinary CDN assets are connected and fully managed.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem' }}>
        {galleryImages.map((asset, index) => {
          let displayName = 'Custom Upload';
          try {
            if (asset.includes('/happyrides/')) {
              displayName = asset.split('/happyrides/')[1].split('.')[0] + '.' + asset.split('.').pop();
            } else {
              displayName = asset.split('/').pop().split('?')[0];
              if (displayName.length > 25) {
                displayName = displayName.substring(0, 15) + '...' + displayName.substring(displayName.length - 7);
              }
            }
          } catch (e) {}

          return (
            <div key={asset + index} className="admin-glass-panel" style={{ padding: '0.8rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' }}>
              <div style={{ width: '100%', height: '110px', borderRadius: '0.8rem', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: '0.8rem' }}>
                <p style={{ fontSize: '0.7rem', opacity: 0.8, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%', marginBottom: '0.4rem' }}>{displayName}</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(asset);
                    alert('Cloudinary CDN link copied to clipboard!');
                  }}
                  className="btn-outline" 
                  style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', width: '100%' }}
                >
                  Copy URL
                </button>
              </div>
            </div>
          );
        })}
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

      {/* City Tour Visuals Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MapPin size={24} /> City Tour Visuals
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem' }}>
          {[
            { label: 'Auckland', key: 'cityAucklandImage' },
            { label: 'Waitomo', key: 'cityWaitomoImage' },
            { label: 'Hobbiton', key: 'cityHobbitonImage' },
            { label: 'Rotorua', key: 'cityRotoruaImage' },
            { label: 'Paihia', key: 'cityPaihiaImage' }
          ].map(city => (
            <div key={city.key} className="input-group" style={{ textAlign: 'center' }}>
              <label className="input-label">{city.label}</label>
              <div style={{ position: 'relative', width: '140px', margin: '0 auto' }}>
                <img src={getImagePath(siteData.settings[city.key])} alt={city.label} style={{ width: '130px', height: '80px', objectFit: 'cover', borderRadius: '1rem' }} />
                <button onClick={() => setEditingItem({ type: 'global_image', key: city.key })} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={14} /></button>
              </div>
            </div>
          ))}
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
                  <div style={{ width: '80px', height: '50px', borderRadius: '0.8rem', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                    <img src={getImagePath(v.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
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
          <div className="input-group"><label className="input-label">Brief Description / Tagline</label><textarea className="input-field" style={{ height: '100px' }} value={siteData.settings.aboutText || ''} onChange={(e) => updateSettings({ aboutText: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Story Section Title</label><input type="text" className="input-field" value={siteData.settings.aboutStoryTitle} onChange={(e) => updateSettings({ aboutStoryTitle: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Our Story Detailed Text</label><textarea className="input-field" style={{ height: '250px' }} value={siteData.settings.aboutStoryText} onChange={(e) => updateSettings({ aboutStoryText: e.target.value })} /></div>
        </div>
      </div>

      {/* Services Page Configuration */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Car size={24} /> Services Page
        </h3>
        <div style={{ display: 'grid', gap: '3rem' }}>
          <div className="input-group"><label className="input-label">Services Page Headline</label><input type="text" className="input-field" value={siteData.settings.servicesHeadline || ''} onChange={(e) => updateSettings({ servicesHeadline: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Services Page Subtitle / Brief</label><textarea className="input-field" style={{ height: '100px' }} value={siteData.settings.servicesSubline || ''} onChange={(e) => updateSettings({ servicesSubline: e.target.value })} /></div>
        </div>
      </div>

      {/* Testimonials Page Configuration */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MessageSquare size={24} /> Testimonials Page
        </h3>
        <div style={{ display: 'grid', gap: '3rem' }}>
          <div className="input-group"><label className="input-label">Testimonials Page Headline</label><input type="text" className="input-field" value={siteData.settings.testimonialsHeadline || ''} onChange={(e) => updateSettings({ testimonialsHeadline: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Testimonials Page Subtitle / Brief</label><textarea className="input-field" style={{ height: '100px' }} value={siteData.settings.testimonialsSubline || ''} onChange={(e) => updateSettings({ testimonialsSubline: e.target.value })} /></div>
        </div>
      </div>

      {/* Contact & Footer Section */}
      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mail size={24} /> Contact & Footer
        </h3>
        <div style={{ display: 'grid', gap: '3rem', marginBottom: '3rem' }}>
          <div className="input-group"><label className="input-label">Contact Page Headline</label><input type="text" className="input-field" value={siteData.settings.contactHeadline || ''} onChange={(e) => updateSettings({ contactHeadline: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Contact Page Subtitle / Brief</label><textarea className="input-field" style={{ height: '100px' }} value={siteData.settings.contactSubline || ''} onChange={(e) => updateSettings({ contactSubline: e.target.value })} /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div className="input-group"><label className="input-label">Contact Email</label><input type="email" className="input-field" value={siteData.settings.contactEmail} onChange={(e) => updateSettings({ contactEmail: e.target.value })} /></div>
          <div className="input-group"><label className="input-label">Contact Phone (Display)</label><input type="text" className="input-field" value={siteData.settings.contactPhone} onChange={(e) => updateSettings({ contactPhone: e.target.value })} /></div>
          <div className="input-group">
            <label className="input-label">WhatsApp Number</label>
            <input type="text" className="input-field" placeholder="e.g. 64212440244" value={siteData.settings.whatsappNumber || ''} onChange={(e) => updateSettings({ whatsappNumber: e.target.value })} />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Format: +64 21... (Spaces and + are now automatically handled)</p>
          </div>
          <div className="input-group"><label className="input-label">Physical Address</label><input type="text" className="input-field" value={siteData.settings.contactAddress} onChange={(e) => updateSettings({ contactAddress: e.target.value })} /></div>
        </div>
        <div className="input-group" style={{ marginBottom: '3rem' }}>
          <label className="input-label">Footer Description Paragraph</label>
          <textarea className="input-field" style={{ height: '120px' }} value={siteData.settings.footerDesc} onChange={(e) => updateSettings({ footerDesc: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          <div className="input-group"><label className="input-label">Instagram URL</label><input type="text" className="input-field" value={siteData.settings.instagramUrl} onChange={(e) => updateSettings({ instagramUrl: e.target.value })} /></div>
        </div>
      </div>

      <div className="admin-glass-panel" style={{ padding: '3rem', marginBottom: '3rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#3B82F6' }}>Maintenance & Updates</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Only add new tours and services that were recently added to the system. This will NOT affect your existing photos or descriptions.</p>
        <button className="btn-primary-glass admin-btn" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', borderColor: 'rgba(59, 130, 246, 0.3)' }} onClick={() => syncNewDefaults()}>
          <RefreshCw size={18} /> Sync New Tours
        </button>
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
              
              {/* Premium Cloudinary Upload Box */}
              <div className="admin-glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.02)', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1.5rem' }}>
                <input 
                  type="file" 
                  id="cloudinary-global-upload" 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => {
                    updateSettings({ [editingItem.key]: url });
                    setEditingItem(null);
                  })}
                />
                <label 
                  htmlFor="cloudinary-global-upload" 
                  className="btn-primary-glass admin-btn" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem 2rem' }}
                >
                  {isUploading ? (
                    <>
                      <div className="premium-loader" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={18} />
                      <span>Upload Custom Image from Computer</span>
                    </>
                  )}
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Upload custom branding photo directly to your secure Cloudinary account.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                {galleryImages.map((asset, index) => {
                  let displayName = 'Image ' + (index + 1);
                  try {
                    if (asset.includes('/happyrides/')) displayName = asset.split('/happyrides/')[1].split('.')[0];
                  } catch (e) {}

                  return (
                    <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: siteData.settings[editingItem.key] === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { updateSettings({ [editingItem.key]: asset }); setEditingItem(null); }}>
                      <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                      <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '0.5rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{displayName}</p>
                    </div>
                  );
                })}
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
              
              {/* Premium Cloudinary Upload Box */}
              <div className="admin-glass-panel" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.02)', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '1.5rem' }}>
                <input 
                  type="file" 
                  id="cloudinary-fleet-upload" 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => {
                    const newFleet = [...fleetData];
                    newFleet[editingItem.index] = { ...newFleet[editingItem.index], img: url };
                    updateSettings({ fleet: newFleet });
                    setEditingItem(null);
                  })}
                />
                <label 
                  htmlFor="cloudinary-fleet-upload" 
                  className="btn-primary-glass admin-btn" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem 2rem' }}
                >
                  {isUploading ? (
                    <>
                      <div className="premium-loader" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={18} />
                      <span>Upload Custom Vehicle Photo</span>
                    </>
                  )}
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>Upload high-resolution vehicle photos directly to your fleet visual database.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
                {galleryImages.map((asset, index) => {
                  let displayName = 'Image ' + (index + 1);
                  try {
                    if (asset.includes('/happyrides/')) displayName = asset.split('/happyrides/')[1].split('.')[0];
                  } catch (e) {}

                  return (
                    <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: fleetData[editingItem.index].img === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { 
                      const newFleet = [...fleetData];
                      newFleet[editingItem.index] = { ...newFleet[editingItem.index], img: asset };
                      updateSettings({ fleet: newFleet });
                      setEditingItem(null); 
                    }}>
                      <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                      <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '0.5rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{displayName}</p>
                    </div>
                  );
                })}
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
                      <button onClick={() => setIsGalleryOpen(true)} style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--primary-color)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} title="Choose from Gallery"><ImageIcon size={18} /></button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <div className="input-group"><label className="input-label">Tour Title</label><input type="text" className="input-field" value={editingItem.title || ''} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} /></div>
                      
                      {/* Cloudinary File Upload Integration */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input 
                          type="file" 
                          id="cloudinary-package-upload" 
                          style={{ display: 'none' }} 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, (url) => {
                            setEditingItem({ ...editingItem, image: url });
                          })}
                        />
                        <label 
                          htmlFor="cloudinary-package-upload" 
                          className="btn-outline admin-btn" 
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                        >
                          {isUploading ? (
                            <>
                              <div className="premium-loader" style={{ width: '12px', height: '12px', border: '1.5px solid rgba(255,255,255,0.2)', borderTop: '1.5px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon size={14} />
                              <span>Upload Photo</span>
                            </>
                          )}
                        </label>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Secure Cloudinary Upload</span>
                      </div>
                    </div>
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
                  {galleryImages.map((asset, index) => {
                    let displayName = 'Image ' + (index + 1);
                    try {
                      if (asset.includes('/happyrides/')) displayName = asset.split('/happyrides/')[1].split('.')[0];
                    } catch (e) {}

                    return (
                      <div key={asset} className="admin-glass-panel" style={{ padding: '0.5rem', cursor: 'pointer', border: editingItem.image === asset ? '2px solid var(--primary-color)' : 'none' }} onClick={() => { setEditingItem({ ...editingItem, image: asset }); setIsGalleryOpen(false); }}>
                        <img src={getImagePath(asset)} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '0.8rem' }} />
                        <p style={{ fontSize: '0.6rem', textAlign: 'center', marginTop: '0.5rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{displayName}</p>
                      </div>
                    );
                  })}
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
          {activeTab === 'tours' && <motion.div key="tours" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTours()}</motion.div>}
          {activeTab === 'activities' && <motion.div key="activities" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderActivities()}</motion.div>}
          {activeTab === 'services' && <motion.div key="svc" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderServices()}</motion.div>}
          {activeTab === 'testimonials' && <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTestimonials()}</motion.div>}
          {activeTab === 'team' && <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTeam()}</motion.div>}
          {activeTab === 'gallery' && <motion.div key="gal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderGallery()}</motion.div>}
          {activeTab === 'settings' && <motion.div key="set" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderSettings()}</motion.div>}
        </AnimatePresence>
      </div>
      <AnimatePresence>{editingItem && renderEditor()}</AnimatePresence>
      <motion.div 
        className="category-nav-wrapper" 
        style={{ bottom: `${bottomOffset}px`, position: 'fixed' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          y: { type: 'spring', stiffness: 260, damping: 20, delay: 0.3 },
          opacity: { duration: 0.3 },
          bottom: { duration: 0 }
        }}
      >
        <div className="category-nav">
          {adminTabs.map((tab) => (
            <button key={tab.id} className={`category-nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
          <button className="category-nav-item" onClick={() => logout()}>
            <span className="nav-icon"><LogOut size={18} /></span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
