import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SliderSection = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calculate scroll distance based on 3 items + gaps
      // card width (320) + gap (2.5rem = 40px) = 360px per item
      const itemWidth = 320 + 40; 
      const scrollAmount = itemWidth * 3; // Scroll exactly 3 items

      const targetScroll = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="slider-container">
      <button 
        className="slider-nav-btn prev" 
        onClick={() => scroll('left')}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      
      <motion.div 
        ref={scrollRef}
        className="cards-slider"
      >
        {children}
      </motion.div>

      <button 
        className="slider-nav-btn next" 
        onClick={() => scroll('right')}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default SliderSection;
