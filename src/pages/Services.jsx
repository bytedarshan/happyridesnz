import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { Plane, Building, Users, Map, Clock, Shield } from 'lucide-react';

const Services = () => {
  const allServices = [
    { icon: <Plane size={40} />, title: 'Airport Transfers', desc: 'Reliable and punctual transfers to and from all major airports. We monitor your flight to ensure we are there when you land.' },
    { icon: <Building size={40} />, title: 'Corporate Travel', desc: 'Discreet and professional transport for business professionals. Priority bookings and dedicated accounts available.' },
    { icon: <Users size={40} />, title: 'Group Transfers', desc: 'Spacious vehicles perfect for families or large groups. Ideal for events, weddings, and group tours.' },
    { icon: <Map size={40} />, title: 'Custom Tours', desc: 'Tailor-made itineraries to explore New Zealand at your own pace. Choose your destinations and we handle the rest.' },
    { icon: <Clock size={40} />, title: '24/7 Availability', desc: 'We operate around the clock. Day or night, Happy Rides is just a booking away.' },
    { icon: <Shield size={40} />, title: 'Safety First', desc: 'Our vehicles undergo regular safety inspections, and our drivers are fully vetted and professionally trained.' },
  ];

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
