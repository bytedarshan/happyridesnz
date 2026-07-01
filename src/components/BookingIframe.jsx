import React, { useEffect, useRef } from 'react';

const RESIZER_URL = 'https://6a38cc049dc85.trial.easytaxioffice.com/assets/plugins/iframe-resizer/iframeResizer.min.js';

/**
 * BookingIframe
 * - Embeds the vendor iframe directly (no "open in new tab" button).
 * - Dynamically loads iframeResizer.min.js once per page session,
 *   then calls iFrameResize() so the widget auto-grows as the user
 *   navigates deeper steps.
 * - Has a 500px min-height fallback so the form is always visible
 *   even before the resizer script fires.
 * - All CSS is scoped under hr-booking-widget__ — zero global leakage.
 */
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
        } catch (e) {
          // resizer may throw if the iframe content hasn't loaded the
          // companion script yet — safe to ignore, it will self-init.
        }
      }
    };

    if (window.iFrameResize) {
      // Library already on the page (e.g. component re-mounted)
      initResizer();
    } else {
      // Check for an already-injected but still-loading script tag
      let script = document.querySelector(`script[src="${RESIZER_URL}"]`);
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
    <div className="hr-booking-widget__outer">
      <div className="hr-booking-widget__card">

        {/* Booking form iframe ─────────────────────────────────────────
            • No hardcoded height — iFrameResize controls the height.
            • min-height: 500px ensures the form is visible even before
              the resizer script initialises.
        ──────────────────────────────────────────────────────────────── */}
        <div className="hr-booking-widget__iframe-wrap">
          <iframe
            ref={iframeRef}
            id="eto-iframe-booking"
            src={src}
            allow="geolocation"
            scrolling="no"
            title="Happy Rides Online Booking"
            style={{
              width: '1px',
              minWidth: '100%',
              minHeight: '500px',
              border: 0,
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* ── Fully scoped styles ──────────────────────────────────────── */}
      <style>{`
        .hr-booking-widget__outer {
          width: 100%;
          box-sizing: border-box;
        }

        .hr-booking-widget__card {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
          padding: 0;
          overflow: hidden;
        }

        .hr-booking-widget__iframe-wrap {
          width: 100%;
          /* No fixed height — iFrameResize controls this.
             overflow visible so the widget can grow freely. */
          overflow: visible;
        }

        @media (max-width: 600px) {
          .hr-booking-widget__card {
            border-radius: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingIframe;
