import { useSiteData } from '../context/SiteContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { siteData } = useSiteData();

  if (!siteData) return null;

  const { settings } = siteData;

  return (
    <footer className="footer footer-static" style={{ borderRadius: '2rem 2rem 0 0', marginTop: '2rem' }}>
      <div className="footer-content">
        <div className="footer-section footer-info">
          <div className="logo-container" style={{ marginBottom: '1.5rem' }}>
            <img src={`/${settings.logoImage || 'logo.png'}`} alt="Happy Rides Logo" className="navbar-logo" />
            <div className="logo-text-wrapper">
              <h1 className="logo-title">{settings.siteTitle}</h1>
              <span className="logo-tagline">{settings.siteTagline}</span>
            </div>
          </div>
          <p>{settings.footerDesc}</p>
          
          <div className="social-links" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
            {settings.instagramUrl && (
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link-static"
                style={{ color: 'white', opacity: 0.8 }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            )}
            {settings.whatsappNumber && (
              <a 
                href={`https://wa.me/${settings.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link-static"
                style={{ color: 'white', opacity: 0.8 }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
              </a>
            )}
          </div>
        </div>

        <div className="footer-section" style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#60A5FA', fontSize: '1.5rem', marginBottom: '2rem' }}>Quick Links</h4>
          <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <li><a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.2rem' }}>Home</a></li>
            <li><a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.2rem' }}>About Us</a></li>
            <li><a href="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.2rem' }}>Services</a></li>
            <li><a href="/packages" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '1.2rem' }}>Popular Packages</a></li>
          </ul>
        </div>

        <div className="footer-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'white', fontSize: '1.4rem' }}>
            <Mail size={28} style={{ opacity: 0.8 }} />
            <span>{settings.contactEmail}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'white', fontSize: '1.4rem' }}>
            <Phone size={28} style={{ opacity: 0.8 }} />
            <span>{settings.contactPhone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'white', fontSize: '1.4rem' }}>
            <MapPin size={28} style={{ opacity: 0.8 }} />
            <span>{settings.contactAddress}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ flexDirection: 'column', gap: '1.5rem', padding: '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: 'white' }}>&copy; {new Date().getFullYear()} {settings.siteTitle}. All Rights Reserved.</p>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              border: '2px solid #EF4444', 
              background: 'transparent', 
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="3" fill="none"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', opacity: 0.9 }}>
          {/* Mock Payment Icons based on Screenshot 4 */}
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="20" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" height="15" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="25" /></div>
          <div style={{ background: 'white', padding: '0.4rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center' }}><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" height="20" /></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
