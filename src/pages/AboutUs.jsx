import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';

const AboutUs = () => {
  const { siteData } = useSiteData();
  
  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '100px' }}>
        <motion.div 
          className="section-header" 
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="responsive-hero-title">About Happy Rides</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            {siteData.settings.aboutText}
          </p>
        </motion.div>

        <div className="about-details responsive-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src="/auckland_city.png" alt="Our Story" className="glass-image" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="section-title">Our Story</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
              Happy Rides was founded with a simple mission: to make travel in New Zealand as enjoyable as the destinations themselves. We understand that punctuality and peace of mind are non-negotiable for our clients.
              <br /><br />
              Whether you're a first-time visitor or a regular traveler, our professional drivers and pristine modern fleet are at your service 24/7. We pride ourselves on our fixed-fare policy—no hidden costs, no surge pricing, just honest service.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
