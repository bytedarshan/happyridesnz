import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '100px' }}>
        <motion.div 
          className="admin-glass-panel" 
          style={{ padding: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Terms of Service</h1>
          <div className="legal-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Last updated: May 2026</p>
            
            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Agreement to Terms</h3>
            <p>By accessing or using Happy Rides services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Booking & Cancellation</h3>
            <p>Bookings are subject to availability. Cancellations made within 24 hours of the scheduled service may incur a cancellation fee.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Bookings & Payment</h3>
            <p>Payments are processed according to the official quotes provided at the time of booking. All payments must be made in full before or at the time of service unless otherwise agreed.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Passenger Conduct</h3>
            <p>We reserve the right to refuse service to any person who is disruptive, intoxicated, or poses a safety risk to our drivers or other passengers.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>5. Limitation of Liability</h3>
            <p>Happy Rides is not liable for delays caused by traffic, weather, or other circumstances beyond our reasonable control.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
