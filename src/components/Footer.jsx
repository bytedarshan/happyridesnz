import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {

  return (
    <footer className="footer footer-static" style={{ borderRadius: '2rem 2rem 0 0', marginTop: '4rem' }}>
      <div className="footer-content">
        <div className="footer-section footer-info">
          <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Happy Rides Logo" className="navbar-logo" />
            <div className="logo-text-wrapper">
              <h1 className="logo-title">Happy Rides</h1>
              <span className="logo-tagline">Enjoy the journey. Love the ride</span>
            </div>
          </div>
          <p>Your premium gateway to exploring the stunning landscapes and vibrant culture of New Zealand. We provide curated tours and professional transfer services.</p>
          
          <div className="social-links" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
            <a 
              href="https://www.instagram.com/happyridesnz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link-static"
              style={{ color: 'white', opacity: 0.8 }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href="https://wa.me/64212440244" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link-static"
              style={{ color: 'white', opacity: 0.8 }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</li>
            <li onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About Us</li>
            <li onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Services</li>
            <li onClick={() => document.getElementById('packages-brief')?.scrollIntoView({ behavior: 'smooth' })}>Popular Packages</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> info@happyrides.co.nz</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> +64 21 244 0244</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Auckland, New Zealand</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Happy Rides NZ. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
