import React, { useState } from 'react';
import DestinationGrid from '../components/DestinationGrid';
import TourDetail from '../components/TourDetail';
import NavigationBar from '../components/NavigationBar';
import CategoryNav from '../components/CategoryNav';
import { AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Car, Trees, Zap, Anchor, Compass } from 'lucide-react';

import { useSiteData } from '../context/SiteContext';

const Packages = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const { siteData } = useSiteData();

  const packageLinks = [
    { id: '/', label: 'Home', icon: <Compass size={18} />, isExternal: true },
    { id: '/#booking', label: 'Book Now', icon: <Zap size={18} />, isExternal: true },
    { id: '/#fleet', label: 'Fleet', icon: <Car size={18} />, isExternal: true },
    { id: 'city-tours', label: 'Auckland City', icon: <MapPin size={18} /> },
    { id: 'intercity-tours', label: 'Intercity Tours', icon: <Car size={18} /> },
    { id: 'rotorua', label: 'Rotorua', icon: <Trees size={18} /> },
    { id: 'paihia', label: 'Paihia & Islands', icon: <Anchor size={18} /> }
  ];

  return (
    <div className="page-wrapper">
      <NavigationBar />
      
      <AnimatePresence mode="wait">
        {!selectedTour ? (
          <div key="grid" className="packages-page page-padding" style={{ marginBottom: '100px' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 className="responsive-hero-title">Our Travel Packages</h1>
              <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
                Explore the beauty of New Zealand with our curated tours and activities.
              </p>
            </div>
            <DestinationGrid onTourClick={setSelectedTour} packages={siteData.packages} />
            <CategoryNav links={packageLinks} />
          </div>
        ) : (
          <TourDetail
            key="detail"
            tour={selectedTour}
            onBack={() => setSelectedTour(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Packages;
