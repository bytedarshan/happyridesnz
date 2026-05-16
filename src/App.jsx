import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import AirportTransfer from './pages/services/AirportTransfer';
import IntercityTransfer from './pages/services/IntercityTransfer';
import CityTours from './pages/services/CityTours';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import { SiteProvider } from './context/SiteContext';
import './index.css';

function App() {
  return (
    <SiteProvider>
      <Router>
        <div className="app-wrapper">
          <CustomCursor />

          {/* Global dark background image for the glass effect */}
          <img src="/hero_bg.jpeg" className="global-bg" alt="background" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/airport-transfer" element={<AirportTransfer />} />
            <Route path="/services/intercity-transfer" element={<IntercityTransfer />} />
            <Route path="/services/city-tours" element={<CityTours />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </SiteProvider>
  );
}

export default App;
