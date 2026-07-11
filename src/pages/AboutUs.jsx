import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { Shield, Clock, Star, MapPin, Users, Award, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const { siteData } = useSiteData();
  const navigate = useNavigate();

  const stats = [
    { value: '24/7', label: 'Availability', icon: <Clock size={28} /> },
    { value: '5★', label: 'Rated Service', icon: <Star size={28} /> },
    { value: '100+', label: 'Destinations', icon: <MapPin size={28} /> },
    { value: '1000+', label: 'Happy Clients', icon: <Users size={28} /> },
  ];

  const values = [
    { icon: <Shield size={32} />, title: 'Safety First', desc: 'Every vehicle is fully certified and every driver professionally vetted. Your safety is our non-negotiable standard.' },
    { icon: <Clock size={32} />, title: 'Always Punctual', desc: 'We monitor your flight and plan around it. Whether early or delayed, we are there when you land.' },
    { icon: <Award size={32} />, title: 'Fixed Pricing', desc: 'No hidden costs, no surge pricing. What you see is what you pay — always honest and transparent.' },
  ];

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="content-container page-padding" style={{ paddingBottom: '100px' }}>

        {/* Hero Header */}
        <motion.div
          className="section-header"
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="responsive-hero-title">{siteData.settings.aboutTitle}</h1>
          {siteData.settings.aboutText && (
            <p className="logo-tagline" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              {siteData.settings.aboutText}
            </p>
          )}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="about-stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-panel"
              style={{ padding: '2rem', textAlign: 'center' }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.3rem' }}>{stat.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story / About Our Company */}
        <div className="about-details responsive-grid" style={{ marginBottom: '5rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={siteData.settings.aboutBriefImage && siteData.settings.aboutBriefImage.startsWith('http')
                ? siteData.settings.aboutBriefImage
                : `/${siteData.settings.aboutBriefImage || 'auckland_city.png'}`}
              alt="About Our Company"
              className="glass-image"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          >
            <span style={{ color: 'var(--primary-hover)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              ABOUT OUR COMPANY
            </span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.3', margin: '0' }}>
              Reliable & Comfortable Airport Transfers & Tours
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', margin: '0' }}>
              Happy Rides is dedicated to redefine travel convenience with premium transportation service. With years of industry expertise, we prioritize punctuality, safety, and customer satisfaction. Our team of professional, fully licensed drivers deliver top-tier service, ensuring every ride is comfortable, efficient and tailored to your needs. Whether it's a scheduled airport pickup, intercity transfer or a personalized sightseeing tour. We take pride in delivering an exceptional experience.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem 1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="about-list-item">
                  <div className="about-list-icon">
                    <Check size={14} />
                  </div>
                  <span>Airport Transfers</span>
                </div>
                <div className="about-list-item">
                  <div className="about-list-icon">
                    <Check size={14} />
                  </div>
                  <span>Intercity Transfers</span>
                </div>
                <div className="about-list-item">
                  <div className="about-list-icon">
                    <Check size={14} />
                  </div>
                  <span>Executive Travel & Corporate Transfers</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="about-list-item">
                  <div className="about-list-icon">
                    <Check size={14} />
                  </div>
                  <span>Cruise Ship Transfers</span>
                </div>
                <div className="about-list-item">
                  <div className="about-list-icon">
                    <Check size={14} />
                  </div>
                  <span>City & Day Tours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div
          style={{ marginBottom: '5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            Our Core Values
          </h2>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="glass-panel"
                style={{ padding: '2.5rem 2rem', textAlign: 'center' }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{ color: 'var(--primary-color)', marginBottom: '1.25rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="glass-panel"
          style={{ padding: '4rem', textAlign: 'center' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Ride with Us?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Whether you need an airport pick-up or a full New Zealand tour, Happy Rides is here for you — 24/7.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary-glass" onClick={() => navigate('/contact')}>
              Get In Touch
            </button>
            <button className="btn-outline" onClick={() => navigate('/tours')}>
              View Tours
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutUs;
