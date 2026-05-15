import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
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
          <h1 className="responsive-hero-title">Get In Touch</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            Have questions or want to book a custom tour? We're here to help.
          </p>
        </motion.div>

        <div className="contact-layout responsive-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="info-item glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><Mail /></div>
              <div>
                <h4 style={{ margin: 0 }}>Email Us</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>info@happyrides.co.nz</p>
              </div>
            </div>
            <div className="info-item glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><Phone /></div>
              <div>
                <h4 style={{ margin: 0 }}>Call Us</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>+64 21 244 0244</p>
              </div>
            </div>
            <div className="info-item glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><MapPin /></div>
              <div>
                <h4 style={{ margin: 0 }}>Visit Us</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Auckland, New Zealand</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form glass-panel"
            style={{ padding: '3rem' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="responsive-grid" style={{ gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="input-field glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} placeholder="John Doe" />
              </div>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input type="email" className="input-field glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} placeholder="john@example.com" />
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <label className="input-label">Message</label>
              <textarea className="input-field glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', height: '150px', resize: 'none' }} placeholder="How can we help you?"></textarea>
            </div>
            <button className="btn-primary-glass" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.2rem' }}>
              <Send size={18} /> Send Message
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
