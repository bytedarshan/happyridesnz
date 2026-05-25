import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

const Testimonials = () => {
  const { siteData } = useSiteData();
  const testimonials = siteData.testimonials;

  return (
    <div className="page-wrapper">
      <NavigationBar />
      
      <main id="top" className="main-content page-padding">
        <div className="content-container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.h1 
              className="responsive-hero-title" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {siteData.settings.testimonialsHeadline || "Guest Testimonials"}
            </motion.h1>
            <motion.p 
              className="logo-tagline" 
              style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {siteData.settings.testimonialsSubline || "Hear from travelers who explored the beauty of New Zealand with Happy Rides. We take pride in delivering unforgettable experiences."}
            </motion.p>
          </div>

          <div id="grid" className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={testimonial.id}
                className="testimonial-card glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="testimonial-header">
                  <div className="user-avatar">
                    <User size={24} />
                  </div>
                  <div className="user-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.location}</span>
                  </div>
                  <Quote className="quote-icon" size={24} />
                </div>
                
                <div className="star-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FACC15" color="#FACC15" />
                  ))}
                </div>

                <p className="testimonial-text">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>

          <div id="cta" className="testimonials-cta glass-panel" style={{ marginTop: '6rem', textAlign: 'center', padding: '4rem' }}>
            <h2 className="section-title">Ready for Your Journey?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>Experience the same premium service that our guests are talking about.</p>
            <button className="btn-primary-glass">Book Your Tour Now</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Testimonials;
