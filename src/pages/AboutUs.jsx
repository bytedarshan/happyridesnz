import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteContext';
import { Shield, Clock, Star, MapPin, Users, Award } from 'lucide-react';
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '5rem'
          }}
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
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '0.3rem' }}>{stat.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <div className="about-details responsive-grid" style={{ marginBottom: '5rem' }}>
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
              alt="Our Story"
              className="glass-image"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="section-title">{siteData.settings.aboutStoryTitle}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
              {siteData.settings.aboutStoryText}
            </p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
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
