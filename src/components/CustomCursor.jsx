import React from 'react';
import './CustomCursor.css';

// Custom cursor is disabled as per user request to restore the default browser cursor.
const CustomCursor = () => {
  /*
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
  */

  return null;
};

export default CustomCursor;
