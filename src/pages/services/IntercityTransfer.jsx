import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { useSiteData } from '../../context/SiteContext';

const IntercityTransfer = () => {
  const { siteData } = useSiteData();
  const intercityRoutes = [
    { destination: 'Auckland to Hamilton', sedan: '$280', suv: '$350', peopleMover: '$420', minibus: '$550' },
    { destination: 'Auckland to Rotorua', sedan: '$450', suv: '$580', peopleMover: '$720', minibus: '$900' },
    { destination: 'Auckland to Waitomo', sedan: '$380', suv: '$480', peopleMover: '$600', minibus: '$750' },
    { destination: 'Auckland to Taupo', sedan: '$550', suv: '$700', peopleMover: '$850', minibus: '$1100' },
    { destination: 'Auckland to Tauranga', sedan: '$350', suv: '$450', peopleMover: '$550', minibus: '$700' },
  ];

  const handleBookNow = () => {
    const link = siteData?.settings?.bookingLink || "https://happyrides.trial.easytaxioffice.com/booking";
    window.open(link, "_blank");
  };

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
          <h1 className="responsive-hero-title">Intercity Transfer Services</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            Safe and reliable long-distance travel across the North Island.
          </p>
        </motion.div>

        <div className="admin-glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Navigation size={24} /> Popular Intercity Routes
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="transfers-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#60A5FA' }}>Route Destination</th>
                  <th style={{ textAlign: 'center', padding: '1rem', color: '#60A5FA' }}>Sedan</th>
                  <th style={{ textAlign: 'center', padding: '1rem', color: '#60A5FA' }}>SUV</th>
                  <th style={{ textAlign: 'center', padding: '1rem', color: '#60A5FA' }}>People Mover</th>
                  <th style={{ textAlign: 'center', padding: '1rem', color: '#60A5FA' }}>Minibus</th>
                </tr>
              </thead>
              <tbody>
                {intercityRoutes.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', fontWeight: 700 }}>
                      {row.destination}
                    </td>
                    <td style={{ textAlign: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}>{row.sedan}</td>
                    <td style={{ textAlign: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}>{row.suv}</td>
                    <td style={{ textAlign: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.03)' }}>{row.peopleMover}</td>
                    <td style={{ textAlign: 'center', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                      {row.minibus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking CTA Section */}
        <motion.div 
          className="admin-glass-panel" 
          style={{ padding: '4rem 2rem', textAlign: 'center', marginTop: '2rem' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Schedule Your Long-Distance Ride</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
            Book your intercity travel with ease. Click below to use our secure online booking system.
          </p>
          <motion.button 
            onClick={handleBookNow}
            className="btn-primary-glass"
            style={{ padding: '1rem 3rem', fontSize: '1.1rem', fontWeight: 'bold' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Booking System
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntercityTransfer;
