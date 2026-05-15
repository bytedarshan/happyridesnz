import React from 'react';
import NavigationBar from './NavigationBar';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import tour1 from '../assets/auckland.jpg';

const HeroSection = ({ title }) => {
  return (
    <section className="hero-section">
      <div className="hero-main-layout">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="hero-title">{title || "Your Premium Getaway to New Zealand - Search, Compare & Save"}</h2>

          <div className="hero-features">
            {[
              "Professional Drivers",
              "24/7 Service",
              "Luxury Fleet"
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
          <img src={tour1} alt="New Zealand Landscape" className="visual-image" />
          <div className="visual-overlay glass-panel">
            <h3 className="visual-title">Auckland City Highlights</h3>
            <p className="visual-price">Starting from $85</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
