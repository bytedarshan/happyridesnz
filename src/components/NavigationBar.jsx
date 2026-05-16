import React from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import logo from './logo.png';

const NavigationBar = () => {
  const { siteData } = useSiteData();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Packages', path: '/packages' },
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
    >
      <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-icon-bg">
            <img src={`/${siteData.settings.logoImage || 'logo.png'}`} alt="Happy Rides Logo" className="navbar-logo" />
          </div>
          <div className="logo-text-wrapper">
            <h1 className="logo-title">{siteData.settings.siteTitle}</h1>
            <span className="logo-tagline">{siteData.settings.siteTagline}</span>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
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

      <div className="nav-actions">
        <div className="lang-selector">
          <Globe size={18} />
          <span>EN</span>
        </div>
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
        
        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav glass-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
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
