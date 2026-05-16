import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
          <h1 className="responsive-hero-title" style={{ marginBottom: '3rem' }}>Privacy Policy</h1>
          <div className="legal-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>Last updated: May 2026</p>
            
            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Introduction</h3>
            <p>Happy Rides ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Information We Collect</h3>
            <p>We may collect personal information including but not limited to your name, email address, phone number, and pickup/drop-off locations when you make a booking or contact us.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>3. How We Use Your Information</h3>
            <p>We use your information to facilitate your bookings, communicate with you about your travel, and improve our services. We do not sell your personal data to third parties.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Data Security</h3>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.</p>

            <h3 style={{ color: 'white', marginTop: '2.5rem', marginBottom: '1rem' }}>5. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at info@happyrides.co.nz.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
