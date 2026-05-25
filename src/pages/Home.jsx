import React from 'react';
import HeroSection from '../components/HeroSection';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Clock, Car, MapPin, Home as HomeIcon, Info, Settings, Package, Calendar } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

const Home = () => {
  const { siteData } = useSiteData();
  
  if (!siteData) return null;

  return (
    <div className="home-page">
      <NavigationBar />
      
      <div id="hero">
        <HeroSection 
          title={siteData.settings.heroTitle} 
          subtitle={siteData.settings.heroSubtitle}
        />
      </div>

      {/* Booking Frame Section */}
      <section id="booking" className="brief-section" style={{ padding: '4rem 8%' }}>
        <motion.div 
          className="admin-glass-panel" 
          style={{ padding: '3rem', textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Instant Online Booking</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            Ready to ride? Use our integrated booking platform below to secure your transfer or tour in seconds.
          </p>
          <div style={{ 
            width: '100%', 
            height: '500px', 
            background: 'rgba(255,255,255,0.02)', 
            borderRadius: '2.5rem', 
            border: siteData.settings.bookingLink ? 'none' : '2px dashed rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {siteData.settings.bookingLink ? (
              <iframe src={siteData.settings.bookingLink} width="100%" height="100%" frameBorder="0" title="Booking Software"></iframe>
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <Clock size={48} style={{ marginBottom: '1rem' }} />
                <p>Booking Software Frame Placeholder</p>
                <p style={{ fontSize: '0.8rem' }}>(Iframe link to be provided in Admin)</p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Vehicle Fleet Section */}
      <section id="fleet" className="brief-section glass-panel" style={{ margin: '4rem 8%', padding: '5rem 3rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Professional Fleet</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {(siteData.settings.fleet || []).map((v, i) => (
            <motion.div 
              key={v.id || i} 
              className="admin-glass-panel" 
              style={{ padding: '1.5rem', textAlign: 'center', overflow: 'hidden' }}
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '1.2rem', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                <img src={`/${v.img}`} alt={v.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{v.type}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{v.capacity}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brief About Us */}
      <section id="about" className="brief-section glass-panel">
        <div className="brief-content">
          <motion.div 
            className="brief-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{siteData.settings.homeWhyTitle}</h2>
            <p>{siteData.settings.homeWhyText}</p>
            <div className="brief-features">
              <div className="brief-feature-item">
                <Shield className="feature-icon" />
                <span>{siteData.settings.heroFeature1}</span>
              </div>
              <div className="brief-feature-item">
                <Clock className="feature-icon" />
                <span>{siteData.settings.heroFeature2}</span>
              </div>
              <div className="brief-feature-item">
                <Car className="feature-icon" />
                <span>{siteData.settings.heroFeature3}</span>
              </div>
            </div>
            <Link to="/about" className="btn-primary-glass" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'none' }}>
              Learn More About Us
            </Link>
          </motion.div>
          <motion.div 
            className="brief-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img src={`/${siteData.settings.aboutBriefImage || 'auckland_city.png'}`} alt="About Us" className="glass-image" />
          </motion.div>
        </div>
      </section>

      {/* Brief Services */}
      <section id="services" className="brief-section">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{siteData.settings.homeServicesTitle}</h2>
        <div className="services-brief-grid">
          {[
            { title: 'Airport Transfers', icon: <Clock />, desc: 'Seamless door-to-door transfers from Auckland Airport to the CBD and beyond.' },
            { title: 'City Highlights', icon: <MapPin />, desc: 'Explore the vibrant spirit of Auckland through our curated city tours.' },
            { title: 'Intercity Tours', icon: <Car />, desc: 'Extending our services far beyond the city limits to Waitomo, Hobbiton, and more.' }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              className="service-brief-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/services" className="btn-primary-glass" style={{ textDecoration: 'none' }}>
            Explore All Services
          </Link>
        </div>
      </section>

      {/* Brief Packages 
      <section id="packages-brief" className="brief-section glass-panel" style={{ background: 'rgba(255, 255, 255, 0.02)', marginBottom: '100px' }}>
        <div className="brief-content">
          <motion.div 
            className="brief-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={`/${siteData.settings.packagesBriefImage || 'rotorua_geothermal.png'}`} alt="Packages" className="glass-image" />
          </motion.div>
          <motion.div 
            className="brief-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{siteData.settings.homePackagesTitle}</h2>
            <p>{siteData.settings.homePackagesText}</p>
            <div className="popular-tags">
              <span className="pop-tag">Auckland City</span>
              <span className="pop-tag">Rotorua Geothermal</span>
              <span className="pop-tag">Waitomo Caves</span>
              <span className="pop-tag">Bay of Islands</span>
            </div>
            <Link to="/packages" className="btn-primary-glass" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'none' }}>
              View All Packages
            </Link>
          </motion.div>
        </div>
      </section>*/}

    </div>
  );
};

export default Home;
