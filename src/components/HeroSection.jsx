import { useSiteData } from '../context/SiteContext';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ title, subtitle }) => {
  const { siteData } = useSiteData();
  
  if (!siteData) return null;
  const { settings } = siteData;

  return (
    <section className="hero-section">
      <div className="hero-main-layout">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="hero-title">{title || settings.heroTitle}</h2>
          {(subtitle || settings.heroSubtitle) && (
            <p className="logo-tagline" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', lineHeight: '1.6', opacity: 0.9 }}>
              {subtitle || settings.heroSubtitle}
            </p>
          )}

          <div className="hero-features">
            {[
              settings.heroFeature1,
              settings.heroFeature2,
              settings.heroFeature3
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="feature-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (idx * 0.2) }}
              >
                <Check size={18} className="feature-icon" />
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual-card glass-panel"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img src={settings.heroVisualImage && settings.heroVisualImage.startsWith('http') ? settings.heroVisualImage : `/${settings.heroVisualImage || 'auckland.jpg'}`} alt="New Zealand Landscape" className="visual-image" />
          {/*<div className="visual-overlay glass-panel">
            <h3 className="visual-title">Auckland City Highlights</h3>
            <p className="visual-price">Starting from $85</p>
          </div>*/}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
