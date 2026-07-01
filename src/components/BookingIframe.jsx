import React from 'react';
import { Calendar, ShieldCheck, Sparkles, ExternalLink, Car, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingIframe = ({ bookingLink }) => {
  const handleOpenBooking = () => {
    if (bookingLink) {
      window.open(bookingLink, '_blank', 'noopener,noreferrer');
    }
  };

  const steps = [
    {
      icon: <Car size={24} style={{ color: 'var(--primary-color)' }} />,
      title: "1. Select Ride Details",
      desc: "Enter your pickup location, destination, date, and choose your preferred vehicle type."
    },
    {
      icon: <Calculator size={24} style={{ color: '#F59E0B' }} />,
      title: "2. Get Instant Quote",
      desc: "Our booking software calculates the transparent, fixed pricing with no hidden fees."
    },
    {
      icon: <ShieldCheck size={24} style={{ color: '#10B981' }} />,
      title: "3. Secure & Confirm",
      desc: "Complete your booking safely and receive an instant confirmation email."
    }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px) saturate(120%)',
      WebkitBackdropFilter: 'blur(16px) saturate(120%)',
      borderRadius: '2.5rem',
      border: '1px solid rgba(255, 255, 255, 0.7)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      padding: '3rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }}>
      {/* Visual background details */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-150px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.08)', padding: '0.6rem 1.2rem', borderRadius: '100px', marginBottom: '1.5rem' }}
        >
          <Sparkles size={16} style={{ color: 'var(--primary-color)' }} />
          <span style={{ color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Official Booking System
          </span>
        </motion.div>

        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', lineHeight: '1.2' }}>
          Ready to Book Your Ride?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '620px', margin: '0 auto 2.5rem' }}>
          Open our secure booking portal to reserve airport transfers, private tours, or intercity transfers. Calculate your fixed rates instantly.
        </p>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
              }}>
                {step.icon}
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{step.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={handleOpenBooking}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, #1D4ED8 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '100px',
            padding: '1.2rem 2.8rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)',
            transition: 'all 0.3s ease'
          }}
        >
          Book Online Now <ExternalLink size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default BookingIframe;
