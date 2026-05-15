import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { Plane, Building, Users, Map, Clock, Shield, Car } from 'lucide-react';

const Services = () => {
  const { siteData } = useSiteData();
  
  const icons = [<Plane size={40} />, <Building size={40} />, <Users size={40} />, <Map size={40} />, <Clock size={40} />, <Shield size={40} />];
  
  const allServices = siteData.services.map((s, i) => ({
    ...s,
    icon: icons[i] || <Car size={40} />
  }));

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
          <h1 className="responsive-hero-title">Our Premium Services</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            Tailored transport solutions to meet every travel need.
          </p>
        </motion.div>

        <div className="services-grid responsive-grid">
          {allServices.map((s, i) => (
            <motion.div 
              key={i}
              className="service-card glass-panel"
              style={{ padding: '3rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="service-icon" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{s.icon}</div>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
