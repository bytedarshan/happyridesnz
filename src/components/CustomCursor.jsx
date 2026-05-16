import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isNarrow = window.innerWidth <= 1100;
      setIsMobile(isTouch || isNarrow);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.category-nav-item') ||
        e.target.closest('.tour-card') ||
        e.target.closest('.btn-primary-glass')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isMobile) return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: isClicked ? 0.7 : 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: isClicked ? 1.5 : 2.5,
      backgroundColor: 'rgba(96, 165, 250, 0.2)',
      border: '1px solid rgba(96, 165, 250, 0.5)',
      opacity: 0.8,
    }
  };

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        animate={{ 
          x: mousePosition.x - 4, 
          y: mousePosition.y - 4,
          scale: isClicked ? 4 : 1
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }} /* Purely responsive dot */
      />
      <motion.div
        className="custom-cursor-ring"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }} /* Snappier ring */
      />
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="click-splash"
            initial={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'fixed',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              pointerEvents: 'none',
              zIndex: 9999
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
