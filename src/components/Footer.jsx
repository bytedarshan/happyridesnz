import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { siteData } = useSiteData();

  if (!siteData) return null;

  const { settings } = siteData;

  return (
    <footer className="footer footer-static" style={{ borderRadius: '2rem 2rem 0 0', marginTop: '2rem', background: '#121212' }}>
      <div className="footer-content">
        <div className="footer-section footer-info">
          <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
            <img src="/image8.png?v=2" alt="Happy Rides Logo" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p>{settings.footerDesc}</p>
          
          <div className="social-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {settings.instagramUrl && (
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem' }}
              >
                <div className="social-link-static" style={{ display: 'flex' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <span>Follow on Instagram</span>
              </a>
            )}
            {settings.whatsappNumber && (
              <a 
                href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem' }}
              >
                <div className="social-link-static" style={{ display: 'flex' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                </div>
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>


        <div className="footer-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <h4 style={{ color: 'var(--primary-color)', fontSize: '1rem', marginBottom: '0.5rem' }}>Contact Us</h4>
          <a href={`mailto:${settings.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '0.9rem', textDecoration: 'none' }}>
            <Mail size={18} style={{ opacity: 0.8, color: 'var(--primary-color)' }} />
            <span>{settings.contactEmail}</span>
          </a>
          <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '0.9rem', textDecoration: 'none' }}>
            <Phone size={18} style={{ opacity: 0.8, color: 'var(--primary-color)' }} />
            <span>{settings.contactPhone}</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '0.9rem' }}>
            <MapPin size={18} style={{ opacity: 0.8, color: 'var(--primary-color)' }} />
            <span>{settings.contactAddress}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ flexDirection: 'column', gap: '1.5rem', padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>&copy; {new Date().getFullYear()} {settings.siteTitle}. All Rights Reserved.</p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="admin-btn"
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              border: '1px solid rgba(255,255,255,0.15)', 
              background: 'rgba(255,255,255,0.08)', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="3" fill="none"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', opacity: 0.9 }}>
          {/* Payment Icons: VISA, Mastercard, Amex, PayPal */}
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="/visa_logo.png" alt="Visa" height="25" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="25" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" height="20" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="20" /></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
