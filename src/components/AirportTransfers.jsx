import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Car, Users, DollarSign, ArrowRightLeft } from 'lucide-react';

const transferData = [
  { vehicle: 'Standard', passengers: 2, priceToCBD: 65, priceToAirport: 60 },
  { vehicle: 'People Mover', passengers: 4, priceToCBD: 75, priceToAirport: 70 },
  { vehicle: 'Executive', passengers: 2, priceToCBD: 80, priceToAirport: 75 },
  { vehicle: 'Large People Mover', passengers: 5, priceToCBD: 90, priceToAirport: 85 },
  { vehicle: 'Executive People Mover', passengers: 4, priceToCBD: 95, priceToAirport: 90 },
  { vehicle: 'Minibus', passengers: 9, priceToCBD: 125, priceToAirport: 115 },
  { vehicle: 'Luxury', passengers: 2, priceToCBD: 125, priceToAirport: 120 },
  { vehicle: 'Electric Standard', passengers: 2, priceToCBD: 80, priceToAirport: 75 },
  { vehicle: 'Electric Luxury', passengers: 2, priceToCBD: 125, priceToAirport: 120 },
];

const AirportTransfers = () => {
  return (
    <section id="airport-transfers" className="transfers-section">
      <div className="section-header">
        <h2 className="section-title">Airport Transfers</h2>
        <p className="section-subtitle">Auckland Airport <ArrowRightLeft size={16} /> Auckland CBD</p>
      </div>

      <motion.div 
        className="transfers-container glass-panel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="table-responsive">
          <table className="transfers-table">
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th><Users size={16} /> Seats</th>
                <th>To Auckland CBD</th>
                <th>To Airport</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((row, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <td className="vehicle-cell">
                    <Car size={16} className="table-icon" /> {row.vehicle}
                  </td>
                  <td>{row.passengers}</td>
                  <td className="price-cell">NZD {row.priceToCBD}</td>
                  <td className="price-cell">NZD {row.priceToAirport}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="transfers-footer">
          <p>* Prices are subject to change and may vary based on timing, demand, and specific requirements.</p>
          <motion.button 
            className="btn-primary-glass"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Transfer Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default AirportTransfers;
