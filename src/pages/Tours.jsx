import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import TourCard from '../components/TourCard';
import TourDetail from '../components/TourDetail';
import { AnimatePresence, motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { MapPin, Compass, Shield, Clock } from 'lucide-react';

const Tours = () => {
  const { siteData } = useSiteData();
  const [selectedTour, setSelectedTour] = useState(null);
  const [activeTab, setActiveTab] = useState('auckland');

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (!siteData) return null;

  const { packages } = siteData;
  if (!packages) return null;

  // Filter tours dynamically based on the 5 subsections
  const getToursForTab = () => {
    switch (activeTab) {
      case 'auckland':
        return packages.aucklandCityTours || [];
      case 'waitomo':
        return (packages.intercityTours || []).filter(t => 
          t.title.toLowerCase().includes('waitomo') || 
          t.description.toLowerCase().includes('waitomo')
        );
      case 'hobbiton':
        return (packages.intercityTours || []).filter(t => 
          t.title.toLowerCase().includes('hobbiton') || 
          t.title.toLowerCase().includes('hobbit') || 
          t.description.toLowerCase().includes('hobbiton')
        );
      case 'paihia':
        return packages.paihiaTours || [];
      case 'rotorua':
        return packages.rotoruaTours || [];
      default:
        return [];
    }
  };

  const currentTours = getToursForTab();

  const tabs = [
    { id: 'auckland', label: 'Auckland City Tour', count: (packages.aucklandCityTours || []).length },
    { id: 'waitomo', label: 'Waitomo', count: (packages.intercityTours || []).filter(t => t.title.toLowerCase().includes('waitomo') || t.description.toLowerCase().includes('waitomo')).length },
    { id: 'hobbiton', label: 'Hobbiton', count: (packages.intercityTours || []).filter(t => t.title.toLowerCase().includes('hobbiton') || t.title.toLowerCase().includes('hobbit') || t.description.toLowerCase().includes('hobbiton')).length },
    { id: 'paihia', label: 'PAIHIA', count: (packages.paihiaTours || []).length },
    { id: 'rotorua', label: 'ROTORUA', count: (packages.rotoruaTours || []).length }
  ];

  return (
    <div className="page-wrapper">
      <NavigationBar />
      
      <AnimatePresence mode="wait">
        {!selectedTour ? (
          <motion.div 
            key="grid" 
            className="packages-page page-padding" 
            style={{ marginBottom: '100px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 className="responsive-hero-title">Exclusive NZ Tours</h1>
              <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
                Discover breathtaking landscapes and iconic film locations across the North Island.
              </p>
            </div>

            {/* Premium Category Navigation Tabs */}
            <div className="category-nav-tabs" style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              marginBottom: '4rem',
              padding: '0.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2rem',
              maxWidth: '900px',
              margin: '0 auto 4rem'
            }}>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`pop-tag ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? 'var(--primary-color, #10b981)' : 'transparent',
                    border: 'none',
                    padding: '0.8rem 1.8rem',
                    borderRadius: '1.5rem',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: activeTab === tab.id ? '0 10px 20px rgba(16, 185, 129, 0.3)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin size={16} style={{ opacity: 0.8 }} />
                  <span>{tab.label}</span>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    background: 'rgba(255,255,255,0.15)', 
                    padding: '0.1rem 0.5rem', 
                    borderRadius: '1rem',
                    marginLeft: '0.3rem'
                  }}>{tab.count}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Tours Grid */}
            <motion.div 
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto'
              }}
            >
              {currentTours.length > 0 ? (
                currentTours.map(tour => (
                  <TourCard 
                    key={tour.id} 
                    tour={tour} 
                    onClick={() => setSelectedTour(tour)} 
                  />
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
                  <Compass size={48} style={{ marginBottom: '1rem', color: 'var(--primary-color)' }} />
                  <p>No tours found under this category yet.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
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

export default Tours;
