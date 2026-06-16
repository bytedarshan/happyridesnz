import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import { motion } from 'framer-motion';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { 
  aucklandCityTours, 
  aucklandActivities, 
  intercityTours, 
  rotoruaTours, 
  rotoruaActivities, 
  paihiaTours, 
  paihiaActivities 
} from '../../data/mockData';

import { useSiteData } from '../../context/SiteContext';

const CityTours = () => {
  const { siteData } = useSiteData();
  
  if (!siteData) return null;

  const pkgs = siteData.packages || {};
  const cities = [
    { name: 'Auckland', desc: 'The "City of Sails," Auckland is a vibrant metropolitan area built on a volcanic field. Explore its stunning harbors, iconic Sky Tower, and lush parklands.', tours: pkgs.aucklandCityTours || aucklandCityTours, activities: pkgs.aucklandActivities || aucklandActivities, image: siteData.settings.cityAucklandImage || 'auckland_city.png' },
    { name: 'Waitomo', desc: 'Journey to the glowing depths of the Waitomo caves. Experience thousands of tiny glowworms lighting up the limestone caverns like a starry night sky.', tours: (pkgs.intercityTours || intercityTours).filter(t => t.title.toLowerCase().includes('waitomo') || t.description.toLowerCase().includes('waitomo')), image: siteData.settings.cityWaitomoImage || 'image81.jpeg' },
    { name: 'Hobbiton', desc: 'Step into the magical Shire. Experience the actual film location from The Lord of the Rings and The Hobbit, complete with Hobbit Holes and the Green Dragon Inn.', tours: (pkgs.intercityTours || intercityTours).filter(t => t.title.toLowerCase().includes('hobbiton') || t.title.toLowerCase().includes('hobbit') || t.description.toLowerCase().includes('hobbiton')), image: siteData.settings.cityHobbitonImage || 'tour1.jpeg' },
    { name: 'Rotorua', desc: 'The heart of New Zealand\'s geothermal activity and Māori culture. Witness bubbling mud pools, shooting geysers, and serene lakes.', tours: pkgs.rotoruaTours || rotoruaTours, activities: pkgs.rotoruaActivities || rotoruaActivities, image: siteData.settings.cityRotoruaImage || 'rotorua_geothermal.png' },
    { name: 'Paihia (Bay of Islands)', desc: 'The gateway to the Bay of Islands, known for its historic Treaty Grounds, turquoise waters, and abundant marine life.', tours: pkgs.paihiaTours || paihiaTours, activities: pkgs.paihiaActivities || paihiaActivities, image: siteData.settings.cityPaihiaImage || 'tour2.jpeg' },
  ];

  const renderCitySection = (city, index) => (
    <motion.div 
      key={index} 
      className="admin-glass-panel" 
      style={{ padding: '3rem', marginBottom: '6rem' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
        <div className="city-info">
          <div style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', marginBottom: '2rem', aspectSRatio: '4/3' }}>
            <img src={city.image && city.image.startsWith('http') ? city.image : `/${city.image}`} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{city.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>{city.desc}</p>
        </div>

        <div className="city-tables">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MapPin size={24} /> Tour & Activity Overview
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="transfers-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#60A5FA' }}>Experience</th>
                  <th style={{ textAlign: 'center', padding: '1rem', color: '#60A5FA' }}>Duration</th>
                  <th style={{ textAlign: 'right', padding: '1rem', color: '#60A5FA' }}>Booking</th>
                </tr>
              </thead>
              <tbody>
                {[...(city.tours || []), ...(city.activities || [])].map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem', fontWeight: 600 }}>
                      {item.title}
                    </td>
                    <td style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>{item.duration}</td>
                    <td style={{ textAlign: 'right', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem', color: '#60A5FA', fontWeight: 600 }}>
                      <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => {
                        const link = siteData?.settings?.bookingLink || "https://happyrides.trial.easytaxioffice.com/booking";
                        window.open(link, "_blank");
                      }}>Book Now</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
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
          <h1 className="responsive-hero-title">New Zealand City Tours</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            Immerse yourself in the most iconic destinations across the North Island.
          </p>
        </motion.div>

        {cities.map((city, i) => renderCitySection(city, i))}
      </div>
    </div>
  );
};

export default CityTours;
