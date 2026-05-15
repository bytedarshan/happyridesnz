import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import heroBg from './assets/hero_bg.jpeg';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <CustomCursor />

        {/* Global dark background image for the glass effect */}
        <img src={heroBg} className="global-bg" alt="background" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
