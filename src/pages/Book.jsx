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
      
      <div className="content-container page-padding" style={{ paddingBottom: '100px', paddingTop: '140px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Header Introduction — Centered and Bold */}
          <motion.div
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.09)',
              color: '#2563EB',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.45rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              width: 'fit-content'
            }}>
              <Calendar size={14} /> Official Booking System
            </div>

            <h1 className="responsive-hero-title" style={{ margin: 0, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 850, lineHeight: 1.1, color: '#0f172a' }}>
              Secure Your Transfer
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>
              Calculate transparent, fixed-fare quotes instantly and confirm your private transfers or sightseeing packages in real-time.
            </p>
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
