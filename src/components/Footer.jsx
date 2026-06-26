import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';

const Footer = () => {
  const { siteData } = useSiteData();

  if (!siteData) return null;

  const { settings } = siteData;

  return (
    <footer className="footer footer-static">
      <div className="footer-row">
        {/* Left: Rights Reserved */}
        <p className="footer-left">
          &copy; {new Date().getFullYear()} {settings.siteTitle}. All Rights Reserved.
        </p>

        {/* Center: Legal Links */}
        <div className="footer-center">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>

        {/* Right: Payment Modes */}
        <div className="footer-right">
          <div className="payment-logo-wrapper">
            <img src="/visa_logo.png" alt="Visa" height="15" />
          </div>
          <div className="payment-logo-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="15" />
          </div>
          <div className="payment-logo-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" height="12" />
          </div>
          <div className="payment-logo-wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="12" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

