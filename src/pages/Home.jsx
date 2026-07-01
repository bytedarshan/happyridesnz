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

  const whyChooseDetails = [
    {
      title: "Fixed & Transparent Pricing",
      desc: "Competitive rates with no unexpected costs or hidden fees"
    },
    {
      title: "Extensive Coverage Across the North Island",
      desc: "Reliable transportation to and from all major destinations"
    },
    {
      title: "Punctual & Professional Service",
      desc: "Commitment to timely pickups and drop-offs, ensuring a stress-free experience"
    },
    {
      title: "Exceptional Customer Care",
      desc: "Courteous and experienced drivers dedicated to customer satisfaction"
    },
    {
      title: "Licensed & Certified",
      desc: "Fully licensed drivers with Passenger Endorsement certification for peace of mind"
    }
  ];

  return (
    <div className="home-page">
      <NavigationBar />
      
      <div id="hero">
        <HeroSection />
      </div>



      {/* Vehicle Fleet Section */}
      <section id="fleet" className="brief-section glass-panel" style={{ margin: '4rem 8%', padding: '5rem 3rem' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Professional Fleet</h2>
        <div 
          className="fleet-container" 
          style={{ 
            '--fleet-cols': siteData.settings.fleetColumns || 5 
          }}
        >
          {(siteData.settings.fleet || []).map((v, i) => (
            <motion.div 
              key={v.id || i} 
              className="admin-glass-panel fleet-card" 
              whileHover={{ scale: 1.05 }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '1.2rem', overflow: 'hidden', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.03)' }}>
                <img src={v.img && v.img.startsWith('http') ? v.img : `/${v.img}`} alt={v.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0rem' }}>{v.type}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brief About Us */}
      {/* Why Choose Us Section */}
      <section id="why-choose-us" style={{ padding: '6rem 8%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            Why Choose Us
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.8rem 0' }}>
            <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
              <path d="M4 6C15 6 18 2 30 2C42 2 45 6 56 6" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>
            We are innovative and passionate about the work we do.
          </p>
        </div>

        <div className="why-choose-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem', width: '100%', maxWidth: '1200px' }}>
          {whyChooseDetails.map((item, idx) => (
            <motion.div
              key={idx}
              className="admin-glass-panel"
              style={{
                flex: '1 1 calc(33.333% - 2.5rem)',
                minWidth: 'min(320px, 100%)',
                maxWidth: '380px',
                padding: '3rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.2rem',
                borderRadius: '2rem',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px) saturate(120%)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                background: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(0, 0, 0, 0.12)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.3' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
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
            <img src={siteData.settings.packagesBriefImage && siteData.settings.packagesBriefImage.startsWith('http') ? siteData.settings.packagesBriefImage : `/${siteData.settings.packagesBriefImage || 'rotorua_geothermal.png'}`} alt="Packages" className="glass-image" />
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
