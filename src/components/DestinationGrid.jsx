import React from 'react';
import TourCard from './TourCard';
import SliderSection from './SliderSection';
const DestinationGrid = ({ onTourClick, packages }) => {
  if (!packages) return null;
  
  const { 
    aucklandCityTours, 
    aucklandActivities, 
    intercityTours,
    rotoruaTours,
    rotoruaActivities,
    paihiaTours,
    paihiaActivities
  } = packages;

  return (
    <main className="main-content">

      <section id="city-tours" className="section-header">
        <h2 className="section-title">Auckland City Tour</h2>
      </section>
      <SliderSection>
        {aucklandCityTours.map(tour => (
          <TourCard key={tour.id} tour={tour} onClick={() => onTourClick(tour)} />
        ))}
      </SliderSection>

      <section id="activities" className="section-header">
        <h2 className="section-title">Auckland Activities</h2>
      </section>
      <SliderSection>
        {aucklandActivities.map(activity => (
          <TourCard key={activity.id} tour={activity} onClick={() => onTourClick(activity)} />
        ))}
      </SliderSection>

      <section id="intercity-tours" className="section-header">
        <h2 className="section-title">Intercity Destination and Tours</h2>
      </section>
      <SliderSection>
        {intercityTours.map(tour => (
          <TourCard key={tour.id} tour={tour} onClick={() => onTourClick(tour)} />
        ))}
      </SliderSection>

      <section id="rotorua" className="section-header">
        <h2 className="section-title">Rotorua</h2>
      </section>
      <SliderSection>
        {rotoruaTours.map(tour => (
          <TourCard key={tour.id} tour={tour} onClick={() => onTourClick(tour)} />
        ))}
      </SliderSection>

      <section id="rotorua-activities" className="section-header">
        <h2 className="section-title">Rotorua Activities</h2>
      </section>
      <SliderSection>
        {rotoruaActivities.map(activity => (
          <TourCard key={activity.id} tour={activity} onClick={() => onTourClick(activity)} />
        ))}
      </SliderSection>

      <section id="paihia" className="section-header">
        <h2 className="section-title">Pahia and Bay of Islands</h2>
      </section>
      <SliderSection>
        {paihiaTours.map(tour => (
          <TourCard key={tour.id} tour={tour} onClick={() => onTourClick(tour)} />
        ))}
      </SliderSection>

      <section id="paihia-activities" className="section-header">
        <h2 className="section-title">Paihia Activities</h2>
      </section>
      <SliderSection>
        {paihiaActivities.map(activity => (
          <TourCard key={activity.id} tour={activity} onClick={() => onTourClick(activity)} />
        ))}
      </SliderSection>
    </main>
  );
};

export default DestinationGrid;
