import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

import { useSiteData } from '../context/SiteContext';

const Contact = () => {
  const { siteData } = useSiteData();
  const { contactEmail, contactPhone, contactAddress, whatsappNumber } = siteData.settings;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    // Vite Environment Variables config (with fallback credentials for Vercel deployment)
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_sf4iz6k';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_dpv6xco';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'RLzbxoznPYKlJ0OWM';

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        submitting: false,
        success: false,
        error: "Email service is temporarily unavailable. Please contact us directly at info@happyrides.co.nz"
      });
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Happy Rides NZ Admin"
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("EmailJS sending error:", err);
      setStatus({ 
        submitting: false, 
        success: false, 
        error: err.text || "Message sending failed. Please check your network connection or try again."
      });
    }
  };

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
          <h1 className="responsive-hero-title">{siteData.settings.contactHeadline || "Get In Touch"}</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            {siteData.settings.contactSubline || "Have questions or want to book a custom tour? We're here to help."}
          </p>
        </motion.div>

        <div className="contact-layout responsive-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href={`mailto:${contactEmail}`}
              className="info-item glass-panel" 
              style={{ 
                padding: '2rem', 
                marginBottom: '1.5rem', 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><Mail /></div>
              <div>
                <h4 style={{ margin: 0 }}>Email Us</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{contactEmail}</p>
              </div>
            </a>
            <a 
              href={`https://wa.me/${(whatsappNumber || '64212440244').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="info-item glass-panel" 
              style={{ 
                padding: '2rem', 
                marginBottom: '1.5rem', 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer'
              }}
            >
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><MessageSquare /></div>
              <div>
                <h4 style={{ margin: 0 }}>WhatsApp</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{contactPhone}</p>
              </div>
            </a>
            <div className="info-item glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ color: 'var(--primary-color)' }}><MapPin /></div>
              <div>
                <h4 style={{ margin: 0 }}>Visit Us</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>{contactAddress}</p>
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
            <form onSubmit={handleSubmit}>
              <div className="responsive-grid" style={{ gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field glass-panel" 
                    style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} 
                    placeholder="John Doe" 
                    maxLength={100}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field glass-panel" 
                    style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem' }} 
                    placeholder="john@example.com" 
                    maxLength={254}
                    required
                  />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label className="input-label">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field glass-panel" 
                  style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', height: '150px', resize: 'none' }} 
                  placeholder="How can we help you?"
                  maxLength={2000}
                  required
                ></textarea>
              </div>

              {/* Submission Status Outputs */}
              {status.success && (
                <div style={{ color: '#10B981', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  ✓ Your message has been sent successfully! We will get back to you shortly.
                </div>
              )}
              {status.error && (
                <div style={{ color: '#EF4444', fontSize: '0.9rem', fontWeight: 500, marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  ⚠ {status.error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status.submitting}
                className="btn-primary-glass" 
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '1rem', 
                  padding: '1.2rem',
                  cursor: status.submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {status.submitting ? (
                  <>
                    <div className="premium-loader" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
