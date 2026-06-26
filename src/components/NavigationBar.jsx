import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import logo from './logo.png';

const NavigationBar = () => {
  const { siteData } = useSiteData();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 1100);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Tours', path: '/tours' },
    { name: 'Activities', path: '/activities' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  if (!siteData) return null;

  return (
    <motion.nav
      className={`navbar glass-panel ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }} /* Less drastic initial y */
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/image8.png?v=2" alt="Happy Rides Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
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
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px) saturate(120%)',
              WebkitBackdropFilter: 'blur(16px) saturate(120%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '2rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 1002,
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  padding: '1rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  background: isActive(link.path) ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
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
