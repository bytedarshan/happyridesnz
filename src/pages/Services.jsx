import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Users, MapPin, Clock, Shield, Car, Calendar } from 'lucide-react';

const Services = () => {
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  
  const icons = [<Plane size={40} />, <Building size={40} />, <Users size={40} />, <MapPin size={40} />, <Clock size={40} />, <Shield size={40} />];
  
  const allServices = siteData.services.map((s, i) => ({
    ...s,
    icon: icons[i] || <Car size={40} />
  }));

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
          <h1 className="responsive-hero-title">{siteData.settings.servicesHeadline || "Our Premium Services"}</h1>
          <p className="logo-tagline" style={{ fontSize: '1.2rem' }}>
            {siteData.settings.servicesSubline || "Tailored transport solutions to meet every travel need."}
          </p>
        </motion.div>

        <div className="services-grid responsive-grid">
          {[
            { title: 'Airport Transfers', icon: <Plane size={40} />, desc: 'Luxury door-to-door transfers with fixed pricing and 24/7 reliability.', isBooking: true },
            { title: 'Intercity Transfers', icon: <Car size={40} />, desc: 'Safe and reliable long-distance travel across the North Island.', isBooking: true },
            { title: 'City Tours', icon: <MapPin size={40} />, desc: 'Immerse yourself in the most iconic destinations across New Zealand.', path: '/services/city-tours' },
            { title: 'Corporate Travel', icon: <Building size={40} />, desc: 'Discreet and professional transport for business professionals.' },
            { title: 'Group Transfers', icon: <Users size={40} />, desc: 'Spacious vehicles perfect for families or large groups.' },
            { title: 'Safety First', icon: <Shield size={40} />, desc: 'Our vehicles undergo regular safety inspections and vetting.' }
          ].map((s, i) => (
            <motion.div 
              key={i}
              className="service-card glass-panel"
              style={{ padding: '3rem 2rem', textAlign: 'center', cursor: (s.path || s.isBooking) ? 'pointer' : 'default' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (s.isBooking) {
                  const link = siteData?.settings?.bookingLink || "https://happyrides.trial.easytaxioffice.com/booking";
                  window.open(link, "_blank");
                } else if (s.path) {
                  navigate(s.path);
                }
              }}
              whileHover={(s.path || s.isBooking) ? { scale: 1.05, borderColor: 'var(--primary-color)' } : {}}
            >
              <div className="service-icon" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{s.icon}</div>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: (s.path || s.isBooking) ? '1.5rem' : '0' }}>{s.desc}</p>
              {s.isBooking && (
                <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Book Online <Calendar size={16} />
                </div>
              )}
              {s.path && (
                <div style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  Explore Details <Clock size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
