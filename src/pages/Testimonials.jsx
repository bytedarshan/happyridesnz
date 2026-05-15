import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import CategoryNav from '../components/CategoryNav';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Sydney, Australia",
      text: "The Auckland City Tour was the highlight of our trip! The driver was professional and knew all the best spots for photos. The frosted glass design of the website really reflects the premium service they provide.",
      rating: 5
    },
    {
      id: 2,
      name: "Mark Thompson",
      location: "London, UK",
      text: "Seamless airport transfer. I arrived after a long flight and having a friendly face waiting for me made all the difference. Highly recommend Happy Rides for anyone visiting New Zealand.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Singapore",
      text: "We booked the Rotorua day trip. The itinerary was perfectly balanced and the luxury transport was incredibly comfortable for the long drive. Five stars!",
      rating: 5
    },
    {
      id: 4,
      name: "David Miller",
      location: "New York, USA",
      text: "Professional, punctual, and premium. Happy Rides handled our large group with ease. The Hobbiton tour was magical and the transport was top-notch.",
      rating: 5
    },
    {
      id: 5,
      name: "Sofia Rodriguez",
      location: "Madrid, Spain",
      text: "The best way to see the North Island. Our driver was more like a local guide who shared so many stories about the culture and history. Truly a personalized experience.",
      rating: 5
    },
    {
      id: 6,
      name: "James Wilson",
      location: "Auckland, NZ",
      text: "Even as a local, I use Happy Rides for corporate events. They are the most reliable luxury transport service in the city. Always a pleasure.",
      rating: 5
    }
  ];

  const testimonialLinks = [
    { id: 'top', label: 'Back to Top' },
    { id: 'grid', label: 'All Reviews' },
    { id: 'cta', label: 'Book Now' }
  ];

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
              Guest Testimonials
            </motion.h1>
            <motion.p 
              className="logo-tagline" 
              style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hear from travelers who explored the beauty of New Zealand with Happy Rides. We take pride in delivering unforgettable experiences.
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

      <CategoryNav links={testimonialLinks} />
    </div>
  );
};

export default Testimonials;
