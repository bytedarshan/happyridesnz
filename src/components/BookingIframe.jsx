import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

const BookingIframe = ({ bookingLink }) => {
  const [iframeHeight, setIframeHeight] = useState(() => {
    // Initial dynamic default heights based on screen size
    return window.innerWidth < 768 ? 1100 : 850;
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasReceivedMessage, setHasReceivedMessage] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Handle responsive default height updates when window resizes
    // (Only if we haven't received an explicit height postMessage from the iframe)
    const handleResize = () => {
      if (!hasReceivedMessage) {
        setIframeHeight(window.innerWidth < 768 ? 1100 : 850);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasReceivedMessage]);

  useEffect(() => {
    // Listen for height/resize postMessage events from the embedded booking software
    const handleMessage = (event) => {
      // Security/Sanity Check: ensure event has valid data
      if (!event.data) return;

      let height = null;

      // 1. Try parsing JSON if stringified
      if (typeof event.data === 'string') {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && typeof parsed === 'object') {
            height = parsed.height || parsed.scrollHeight || parsed.data?.height || parsed.iframeHeight;
          }
        } catch (e) {
          // Not a JSON string - parse common format strings
          if (event.data.startsWith('height:')) {
            const h = parseInt(event.data.split(':')[1], 10);
            if (!isNaN(h)) height = h;
          } else if (event.data.startsWith('resize:')) {
            const h = parseInt(event.data.split(':')[1], 10);
            if (!isNaN(h)) height = h;
          } else if (!isNaN(Number(event.data))) {
            height = Number(event.data);
          }
        }
      } 
      // 2. Handle object messages directly
      else if (typeof event.data === 'object') {
        height = event.data.height || event.data.scrollHeight || event.data.iframeHeight || (event.data.data && event.data.data.height);
      }

      // If we got a valid height, update our state
      if (height && typeof height === 'number' && height > 200) {
        setIframeHeight(height);
        setHasReceivedMessage(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!bookingLink) {
    return (
      <div style={{ 
        width: '100%',
        maxWidth: '960px',
        height: '350px',
        margin: '0 auto',
        background: '#ffffff', 
        borderRadius: '2rem', 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        color: '#1e293b'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Clock size={48} style={{ marginBottom: '1rem', color: 'var(--primary-color)' }} />
          <p style={{ fontWeight: 600 }}>Booking Software Frame Placeholder</p>
          <p style={{ fontSize: '0.8rem' }}>(Iframe link to be provided in Admin)</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '960px',
      height: `${iframeHeight}px`, 
      margin: '0 auto',
      background: '#ffffff', 
      borderRadius: '2rem', 
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'height 0.4s ease-in-out', // Smooth transition when height changes dynamically
    }}>
      {/* Sleek dynamic loader */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          borderRadius: '2rem'
        }}>
          <div className="premium-loader" style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(16, 185, 129, 0.1)',
            borderTop: '3px solid var(--primary-color, #10b981)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
            Loading secure booking software...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <iframe 
        ref={iframeRef}
        src={bookingLink} 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        title="Booking Software"
        onLoad={() => setIsLoaded(true)}
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        // 'scrolling="no"' is deprecated but still respected by many older frame renderers
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default BookingIframe;
