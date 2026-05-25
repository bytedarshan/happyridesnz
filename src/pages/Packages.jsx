import React, { useState } from 'react';
import DestinationGrid from '../components/DestinationGrid';
import TourDetail from '../components/TourDetail';
import NavigationBar from '../components/NavigationBar';
import { AnimatePresence } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';

const Packages = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const { siteData } = useSiteData();

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
