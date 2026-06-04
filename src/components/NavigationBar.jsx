import React from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import logo from './logo.png';

const NavigationBar = () => {
  const { siteData } = useSiteData();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 1100);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Tours', path: '/tours' },
    { name: 'Activities', path: '/activities' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  if (!siteData) return null;

  return (
    <motion.nav
      className="navbar glass-panel"
      initial={{ y: -60, opacity: 0 }} /* Less drastic initial y */
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ background: 'rgba(255, 255, 255, 0.01)' }}
    >
      <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-icon-bg">
            <img src={siteData.settings.logoImage && siteData.settings.logoImage.startsWith('http') ? siteData.settings.logoImage : `/${siteData.settings.logoImage || 'logo.png'}`} alt="Happy Rides Logo" className="navbar-logo" />
          </div>
          <div className="logo-text-wrapper">
            <h1 className="logo-title">{siteData.settings.siteTitle}</h1>
            <span className="logo-tagline">{siteData.settings.siteTagline}</span>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation - Strictly Hidden on Mobile via React State */}
      {!isMobileView && (
        <div className="nav-menu">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 1 }}
            >
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="nav-actions">
        {!isMobileView && (
          <div className="lang-selector">
            <Globe size={18} />
            <span>EN</span>
          </div>
        )}
        {!isMobileView && (
          <Link to="/contact">
            <motion.button
              className="btn-primary-glass"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 1 }}
            >
              Manage Booking
            </motion.button>
          </Link>
        )}
        
        {/* Mobile Toggle - Force visible on mobile via inline style to bypass CSS bugs */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: isMobileView ? 'block' : 'none' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Redesigned for Professional Liquid Look */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ 
              position: 'absolute',
              top: 'calc(100% + 1rem)',
              left: '5%',
              right: '5%',
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(8px) saturate(150%)',
              WebkitBackdropFilter: 'blur(8px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '2rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 1002,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  padding: '1rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  background: isActive(link.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavigationBar;
