import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { motion } from 'framer-motion';
import { Plane, MapPin, Clock } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

const AirportTransfer = () => {
  const { siteData } = useSiteData();
  
  const airportToAuckland = [
    { destination: 'Auckland CBD' },
    { destination: 'Parnell / Newmarket' },
    { destination: 'Ponsonby / Grey Lynn' },
    { destination: 'Mission Bay / St Heliers' },
    { destination: 'North Shore (Lower)' },
  ];

  const aucklandToAirport = [
    { source: 'Auckland CBD' },
    { source: 'Parnell / Newmarket' },
    { source: 'Ponsonby / Grey Lynn' },
    { source: 'Mission Bay / St Heliers' },
    { source: 'North Shore (Lower)' },
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTable = (data, title, isAirportToCity) => (
    <div className="admin-glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAirportToCity ? <Plane size={24} /> : <MapPin size={24} />} {title}
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="transfers-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', color: '#60A5FA' }}>
                {isAirportToCity ? 'To Destination' : 'From Source'}
              </th>
              <th style={{ textAlign: 'right', padding: '1rem', color: '#60A5FA', paddingRight: '2rem' }}>
                Booking Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', fontWeight: 700 }}>
                  {isAirportToCity ? row.destination : row.source}
                </td>
                <td style={{ textAlign: 'right', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', paddingRight: '2rem' }}>
                  <motion.button 
                    onClick={scrollToBooking}
                    className="btn-primary-glass"
                    style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '100px' }}>
        <motion.div 
          className="section-header" 
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="responsive-hero-title">Airport Transfer Services</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            Luxury door-to-door transfers with fixed pricing and 24/7 reliability.
          </p>
        </motion.div>

        {renderTable(airportToAuckland, "Airport to Auckland CBD", true)}
        {renderTable(aucklandToAirport, "Auckland City to Airport", false)}

        {/* Booking Frame Section */}
        <motion.div 
          id="booking-section"
          className="admin-glass-panel" 
          style={{ padding: '3rem', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Book Your Transfer Online</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            Use our secure booking software below to schedule your ride instantly. Select your date, time, and vehicle type to get started.
          </p>
          <div style={{ 
            width: '100%', 
            height: '600px', 
            background: 'rgba(255,255,255,0.02)', 
            borderRadius: '1.5rem', 
            border: siteData.settings.bookingLink ? 'none' : '2px dashed rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {siteData.settings.bookingLink ? (
              <iframe src={siteData.settings.bookingLink} width="100%" height="100%" frameBorder="0" title="Booking Software"></iframe>
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <Clock size={48} style={{ marginBottom: '1rem' }} />
                <p>Booking Software Frame Placeholder</p>
                <p style={{ fontSize: '0.8rem' }}>(Iframe link to be provided in Admin)</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AirportTransfer;
