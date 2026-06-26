import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import TourCard from '../components/TourCard';
import TourDetail from '../components/TourDetail';
import { AnimatePresence, motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { Compass, Sparkles, MapPin } from 'lucide-react';

const Activities = () => {
  const { siteData } = useSiteData();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('auckland');

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (!siteData) return null;

  const { packages } = siteData;
  if (!packages) return null;

  // Filter activities dynamically based on categories
  const getActivitiesForTab = () => {
    switch (activeTab) {
      case 'auckland':
        return packages.aucklandActivities || [];
      case 'rotorua':
        return packages.rotoruaActivities || [];
      case 'paihia':
        return packages.paihiaActivities || [];
      case 'other':
        return (packages.intercityTours || []).filter(t => 
          !t.title.toLowerCase().includes('waitomo') && 
          !t.title.toLowerCase().includes('hobbiton') && 
          !t.title.toLowerCase().includes('hobbit')
        );
      default:
        return [];
    }
  };

  const currentActivities = getActivitiesForTab();

  const tabs = [
    { id: 'auckland', label: 'Auckland Activities', count: (packages.aucklandActivities || []).length },
    { id: 'rotorua', label: 'Rotorua Activities', count: (packages.rotoruaActivities || []).length },
    { id: 'paihia', label: 'Paihia Activities', count: (packages.paihiaActivities || []).length },
    { id: 'other', label: 'Other Regions', count: (packages.intercityTours || []).filter(t => !t.title.toLowerCase().includes('waitomo') && !t.title.toLowerCase().includes('hobbiton') && !t.title.toLowerCase().includes('hobbit')).length }
  ];

  return (
    <div className="page-wrapper">
      <NavigationBar />
      
      <AnimatePresence mode="wait">
        {!selectedActivity ? (
          <motion.div 
            key="grid" 
            className="packages-page page-padding" 
            style={{ marginBottom: '100px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 className="responsive-hero-title">NZ Guest Activities</h1>
              <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
                Unforgettable day trips, geothermal spas, and wildlife highlights across New Zealand.
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
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px) saturate(120%)',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '2rem',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              maxWidth: '900px',
              margin: '0 auto 4rem'
            }}>
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`pop-tag ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                    border: 'none',
                    padding: '0.8rem 1.8rem',
                    borderRadius: '1.5rem',
                    color: activeTab === tab.id ? 'white' : 'var(--text-dark)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: activeTab === tab.id ? '0 10px 20px rgba(59, 130, 246, 0.2)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={16} style={{ opacity: 0.8 }} />
                  <span>{tab.label}</span>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)', 
                    padding: '0.1rem 0.5rem', 
                    borderRadius: '1rem',
                    marginLeft: '0.3rem'
                  }}>{tab.count}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Activities Grid */}
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
              {currentActivities.length > 0 ? (
                currentActivities.map(activity => (
                  <TourCard 
                    key={activity.id} 
                    tour={activity} 
                    onClick={() => setSelectedActivity(activity)} 
                  />
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
                  <Compass size={48} style={{ marginBottom: '1rem', color: 'var(--primary-color)' }} />
                  <p>No activities found under this category yet.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <TourDetail
            key="detail"
            tour={selectedActivity}
            onBack={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Activities;
