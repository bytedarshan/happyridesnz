import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CategoryNav = ({ links }) => {
  const [activeId, setActiveId] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Fixed navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Liquid Arrival Bounce
      element.classList.remove('section-bounce-arrival');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('section-bounce-arrival');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const link of links) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  return (
    <motion.div 
      className="category-nav-wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      <div className="category-nav">
        {links.map((link) => (
          <motion.button 
            key={link.id}
            className={`category-nav-item ${activeId === link.id ? 'active' : ''}`}
            onClick={() => scrollToSection(link.id)}
            whileHover={{ scale: 1.12, y: -6 }}
            whileTap={{ scale: 0.9, rotate: Math.random() > 0.5 ? 2 : -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 1 }} /* Controlled premium bounce */
          >
            {link.icon && <span className="nav-icon">{link.icon}</span>}
            <span className="nav-label">{link.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryNav;
