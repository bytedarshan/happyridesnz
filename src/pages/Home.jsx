import React from 'react';
import HeroSection from '../components/HeroSection';
import NavigationBar from '../components/NavigationBar';
import CategoryNav from '../components/CategoryNav';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Clock, Car, MapPin, Home as HomeIcon, Info, Settings, Package } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

const Home = () => {
  const { siteData } = useSiteData();
  
  const homeLinks = [
    { id: 'hero', label: 'Home', icon: <HomeIcon size={18} /> },
    { id: 'about', label: 'About Us', icon: <Info size={18} /> },
    { id: 'services', label: 'Services', icon: <Settings size={18} /> },
    { id: 'packages-brief', label: 'Popular Packages', icon: <Package size={18} /> }
  ];

  return (
    <div className="home-page">
      <NavigationBar />
      
      <div id="hero">
        <HeroSection title={siteData.settings.heroTitle} />
      </div>

      {/* Brief About Us */}
      <section id="about" className="brief-section glass-panel">
        <div className="brief-content">
          <motion.div 
            className="brief-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose Happy Rides?</h2>
            <p>{siteData.settings.aboutText}</p>
            <div className="brief-features">
              <div className="brief-feature-item">
                <Shield className="feature-icon" />
                <span>Professional Drivers</span>
              </div>
              <div className="brief-feature-item">
                <Clock className="feature-icon" />
                <span>Punctuality Guaranteed</span>
              </div>
              <div className="brief-feature-item">
                <Car className="feature-icon" />
                <span>Modern Fleet</span>
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
            <img src="/auckland_city.png" alt="About Us" className="glass-image" />
          </motion.div>
        </div>
      </section>

      {/* Brief Services */}
      <section id="services" className="brief-section">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Premium Services</h2>
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

      {/* Brief Packages */}
      <section id="packages-brief" className="brief-section glass-panel" style={{ background: 'rgba(255, 255, 255, 0.02)', marginBottom: '100px' }}>
        <div className="brief-content">
          <motion.div 
            className="brief-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="/rotorua_geothermal.png" alt="Packages" className="glass-image" />
          </motion.div>
          <motion.div 
            className="brief-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Popular Travel Packages</h2>
            <p>From the geothermal wonders of Rotorua to the magical Shire in Hobbiton, discover our most loved travel experiences. We offer both half-day highlights and multi-day adventures.</p>
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
      </section>

      <CategoryNav links={homeLinks} />
    </div>
  );
};

export default Home;
