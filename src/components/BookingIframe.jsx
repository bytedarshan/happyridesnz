import React, { useEffect, useRef } from 'react';

const RESIZER_URL = 'https://6a38cc049dc85.trial.easytaxioffice.com/assets/plugins/iframe-resizer/iframeResizer.min.js';

const BookingIframe = ({ bookingLink }) => {
  const iframeRef = useRef(null);
  const src = bookingLink || 'https://6a38cc049dc85.trial.easytaxioffice.com/booking?site_key=7e3f3d3085b900d598bc40543d611575';

  useEffect(() => {
    const initResizer = () => {
      if (iframeRef.current && window.iFrameResize) {
        try {
          window.iFrameResize(
            { log: false, targetOrigin: '*', checkOrigin: false },
            iframeRef.current
          );
        } catch (e) { /* safe */ }
      }
    };

    if (window.iFrameResize) {
      initResizer();
    } else {
      let script = document.querySelector('script[src="' + RESIZER_URL + '"]');
      if (!script) {
        script = document.createElement('script');
        script.src = RESIZER_URL;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', initResizer);
    }
  }, [src]);

  return (
    <div className="hr-bw">
      <iframe
        ref={iframeRef}
        id="eto-iframe-booking"
        src={src}
        allow="geolocation"
        scrolling="no"
        title="Happy Rides Online Booking"
        style={{ width: '1px', minWidth: '100%', minHeight: '650px', border: 0, display: 'block' }}
      />
      <style>{`
        .hr-bw {
          width: 100%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 1.5rem;
          box-shadow: 0 24px 60px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BookingIframe;
