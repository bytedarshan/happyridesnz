import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import BookingIframe from '../components/BookingIframe';
import { Shield, Clock, Car, Calendar } from 'lucide-react';

const Book = () => {
  const { siteData } = useSiteData();

  if (!siteData) return null;

  return (
    <div className="page-wrapper">
      <NavigationBar />
      
      <div className="page-padding" style={{ paddingBottom: '100px', paddingTop: '90px', paddingLeft: '1.5%', paddingRight: '1.5%' }}>
        <div style={{ maxWidth: '850px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Header Introduction — Centered and Bold */}
          {/* Header Logo */}
          <motion.div
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/image8.png?v=2" 
              alt="Happy Rides Logo" 
              style={{ height: '160px', maxWidth: '100%', width: 'auto', objectFit: 'contain', padding: '0 1rem' }} 
            />
          </motion.div>

          {/* Booking Widget — Huge, Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ width: '100%' }}
          >
            <BookingIframe bookingLink={siteData.settings.bookingLink} />
          </motion.div>

          {/* Supporting Features Row — 3 Columns below the widget */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { 
                icon: <Shield size={24} />, 
                title: 'Fixed & Transparent Rates', 
                desc: 'No surge pricing, no dynamic multipliers, and absolutely no hidden fees.' 
              },
              { 
                icon: <Clock size={24} />, 
                title: '24/7 Availability & Tracking', 
                desc: 'Airport pick-ups are auto-tracked by flight numbers for punctual arrivals.' 
              },
              { 
                icon: <Car size={24} />, 
                title: 'Certified Professionals', 
                desc: 'All drivers hold passenger endorsements for maximum safety and comfort.' 
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="admin-glass-panel" 
                style={{ 
                  padding: '2rem', 
                  borderRadius: '1.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '1rem',
                  background: 'rgba(59, 130, 246, 0.08)',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Book;
