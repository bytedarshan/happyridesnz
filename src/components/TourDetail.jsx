import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';
import { useNavigate } from 'react-router-dom';

const TourDetail = ({ tour, onBack }) => {
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  
  if (!tour) return null;

  const paragraphs = tour.description.split('\n\n');

  return (
    <motion.div 
      className="tour-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="detail-container glass-panel">
        <motion.button 
          className="back-btn btn-outline"
          onClick={onBack}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={18} /> Back to Catalog
        </motion.button>

        <div className="detail-hero">
          <div className="detail-img-wrapper">
            <img src={tour.image} alt={tour.title} className="detail-img" />
            <div className="detail-overlay-gradient"></div>
          </div>
          <div className="detail-title-block">
            <h2 className="detail-title">{tour.title}</h2>
            <div className="detail-meta">
              <span className="meta-item"><Clock size={20} /> {tour.duration}</span>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-main-content">
            <h3>Overview</h3>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            
            <div className="highlights-section">
              <h3>What's Included</h3>
              <ul className="highlights-list">
                <li><CheckCircle size={18} className="text-primary" /> Professional Local Guide</li>
                <li><CheckCircle size={18} className="text-primary" /> Luxury Transport</li>
                <li><CheckCircle size={18} className="text-primary" /> All Entrance Fees</li>
                <li><CheckCircle size={18} className="text-primary" /> Complimentary Bottled Water</li>
              </ul>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="booking-card glass-panel">
              <h4>Ready to Explore?</h4>
              <p>Book this experience today and enjoy the best of New Zealand.</p>

              <motion.button 
                className="btn-primary-glass w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate('/book');
                }}
              >
                Book Now
              </motion.button>
              <p className="sidebar-hint">* Instant confirmation upon booking</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourDetail;
