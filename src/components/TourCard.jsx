import React, { useRef } from 'react';
import { Clock } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour, onClick }) => {
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const isAucklandCityTour = tour.id && tour.id.startsWith('act-');

  const handleCardClick = (e) => {
    if (isAucklandCityTour) {
      navigate('/book');
    } else {
      onClick(e);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const paragraphs = tour.description.split('\n\n');

  return (
    <motion.div 
      ref={cardRef}
      className="tour-card glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        cursor: 'pointer'
      }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="tour-img-container">
        <img src={tour.image} alt={tour.title} className="tour-img" />
      </div>
      
      <div className="tour-content">
        <h3 className="tour-title">{tour.title}</h3>
        
        <div className="tour-duration">
          <Clock size={16} />
          {tour.duration}
        </div>

        <div className="tour-description">
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        <div className="tour-footer">
          {/* View Details button - commented out for Auckland City Tour cards because they redirect straight to booking */}
          {!isAucklandCityTour ? (
            <motion.button 
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          ) : (
            /* Commented out View Details code to preserve it:
            <motion.button 
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
            */
            null
          )}

          {/* Book Now button - commented out for Auckland City Tour cards because they redirect straight to booking */}
          {!isAucklandCityTour ? (
            <motion.button 
              className="btn-primary-glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/book');
              }}
            >
              Book Now
            </motion.button>
          ) : (
            /* Commented out Book Now code to preserve it:
            <motion.button 
              className="btn-primary-glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/book');
              }}
            >
              Book Now
            </motion.button>
            */
            null
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
