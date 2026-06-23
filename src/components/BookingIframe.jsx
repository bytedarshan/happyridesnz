import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

/**
 * BookingIframe — Auto-resizing iframe that avoids double scrollbars.
 * 
 * Strategy: Start at a generous initial height. Every 500ms, try to read
 * the iframe's document scrollHeight directly (works if same-origin) OR
 * listen for postMessage events from the booking software. The iframe
 * itself has overflow hidden and no scrollbar — our outer page scrolls instead.
 */
const BookingIframe = ({ bookingLink }) => {
  const [iframeHeight, setIframeHeight] = useState(() => {
    return window.innerWidth < 768 ? 1320 : 990;
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);
  const pollingRef = useRef(null);

  // Try to read height directly from the iframe DOM (works same-origin)
  const tryReadIframeHeight = () => {
    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const h = Math.max(
          doc.body?.scrollHeight || 0,
          doc.documentElement?.scrollHeight || 0
        );
        if (h > 300) {
          setIframeHeight(Math.round((h + 40) * 1.1)); // Scale by 1.1 (10% increase)
        }
      }
    } catch (e) {
      // Cross-origin: silently ignore — postMessage listener handles this
    }
  };

  // Poll iframe height every 600ms after it loads
  useEffect(() => {
    if (isLoaded) {
      tryReadIframeHeight();
      pollingRef.current = setInterval(tryReadIframeHeight, 600);
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [isLoaded]);

  // Listen for postMessage events from cross-origin booking software
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return;
      let height = null;

      if (typeof event.data === 'string') {
        try {
          const parsed = JSON.parse(event.data);
          height = parsed?.height || parsed?.scrollHeight || parsed?.iframeHeight;
        } catch {
          if (event.data.startsWith('height:')) height = parseInt(event.data.split(':')[1], 10);
          else if (!isNaN(Number(event.data))) height = Number(event.data);
        }
      } else if (typeof event.data === 'object') {
        height = event.data.height || event.data.scrollHeight || event.data.iframeHeight;
      }

      if (height && typeof height === 'number' && height > 300) {
        setIframeHeight(Math.round((height + 40) * 1.1)); // Scale by 1.1 (10% increase)
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update default height on window resize
  useEffect(() => {
    const handleResize = () => {
      setIframeHeight(h => {
        const defaultH = window.innerWidth < 768 ? 1320 : 990;
        return h < defaultH ? defaultH : h;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!bookingLink) {
    return (
      <div style={{
        width: '100%', maxWidth: '1056px', height: '385px', margin: '0 auto',
        background: '#ffffff', borderRadius: '2rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.5, color: '#1e293b'
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
      maxWidth: '1056px',
      height: `${iframeHeight}px`,
      margin: '0 auto',
      background: '#ffffff',
      borderRadius: '2rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'height 0.3s ease-in-out',
    }}>
      {/* Loading overlay */}
      {!isLoaded && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: '#ffffff', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', zIndex: 10, borderRadius: '2rem'
        }}>
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(16, 185, 129, 0.1)',
            borderTop: '3px solid #10b981',
            borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem'
          }} />
          <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
            Loading secure booking software...
          </p>
          <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={bookingLink}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Booking Software"
        onLoad={() => {
          setIsLoaded(true);
          // Give the iframe content time to fully render then read its height
          setTimeout(tryReadIframeHeight, 800);
          setTimeout(tryReadIframeHeight, 2000);
          setTimeout(tryReadIframeHeight, 4000);
        }}
        style={{ border: 'none', width: '100%', height: '100%', overflow: 'hidden', display: 'block' }}
        scrolling="no"
      />
    </div>
  );
};

export default BookingIframe;
