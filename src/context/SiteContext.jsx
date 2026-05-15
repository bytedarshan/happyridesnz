import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  updateDoc 
} from 'firebase/firestore';
import { 
  aucklandCityTours, 
  aucklandActivities, 
  intercityTours, 
  rotoruaTours, 
  rotoruaActivities, 
  paihiaTours, 
  paihiaActivities 
} from '../data/mockData';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial Data Structure
  const initialData = {
    packages: {
      aucklandCityTours,
      aucklandActivities,
      intercityTours,
      rotoruaTours,
      rotoruaActivities,
      paihiaTours,
      paihiaActivities
    },
    testimonials: [
      { id: 1, name: "Sarah Johnson", location: "Sydney, Australia", text: "The Auckland City Tour was the highlight of our trip! The driver was professional and knew all the best spots for photos.", rating: 5 },
      { id: 2, name: "Mark Thompson", location: "London, UK", text: "Seamless airport transfer. I arrived after a long flight and having a friendly face waiting for me made all the difference.", rating: 5 },
      { id: 3, name: "Emily Chen", location: "Singapore", text: "We booked the Rotorua day trip. The itinerary was perfectly balanced and the luxury transport was incredibly comfortable.", rating: 5 }
    ],
    services: [
      { title: 'Airport Transfers', desc: 'Reliable and punctual transfers to and from all major airports. We monitor your flight to ensure we are there when you land.' },
      { title: 'Corporate Travel', desc: 'Discreet and professional transport for business professionals. Priority bookings and dedicated accounts available.' },
      { title: 'Group Transfers', desc: 'Spacious vehicles perfect for families or large groups. Ideal for events, weddings, and group tours.' },
      { title: 'Custom Tours', desc: 'Tailor-made itineraries to explore New Zealand at your own pace. Choose your destinations and we handle the rest.' },
      { title: '24/7 Availability', desc: 'We operate around the clock. Day or night, Happy Rides is just a booking away.' },
      { title: 'Safety First', desc: 'Our vehicles undergo regular safety inspections, and our drivers are fully vetted and professionally trained.' }
    ],
    settings: {
      heroTitle: "Your Premium Getaway to New Zealand - Search, Compare & Save",
      aboutText: "Welcome to Happy Rides, your trusted partner for safe, reliable, and comfortable transport in New Zealand. We understand that travel can be stressful, which is why we are dedicated to taking that weight off your shoulders.",
      contactEmail: "info@happyrides.co.nz",
      contactPhone: "+64 21 244 0244",
      contactAddress: "Auckland, New Zealand"
    }
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Listener & Seeding
  useEffect(() => {
    const siteDocRef = doc(db, 'content', 'siteData');
    
    const unsubscribe = onSnapshot(siteDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(docSnap.data());
        setLoading(false);
      } else {
        // Seed database if it doesn't exist
        console.log('Seeding Firestore with initial data...');
        await setDoc(siteDocRef, initialData);
        setSiteData(initialData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const createAdmin = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const syncToFirestore = async (newData) => {
    const siteDocRef = doc(db, 'content', 'siteData');
    await updateDoc(siteDocRef, newData);
  };

  const updateSettings = async (newSettings) => {
    const newData = {
      ...siteData,
      settings: { ...siteData.settings, ...newSettings }
    };
    await syncToFirestore(newData);
  };

  const addPackage = async (category, newPackage) => {
    const newData = {
      ...siteData,
      packages: {
        ...siteData.packages,
        [category]: [...siteData.packages[category], { ...newPackage, id: Date.now().toString() }]
      }
    };
    await syncToFirestore(newData);
  };

  const updatePackage = async (category, packageId, updatedPackage) => {
    const newData = {
      ...siteData,
      packages: {
        ...siteData.packages,
        [category]: siteData.packages[category].map(p => p.id === packageId ? { ...p, ...updatedPackage } : p)
      }
    };
    await syncToFirestore(newData);
  };

  const removePackage = async (category, packageId) => {
    const newData = {
      ...siteData,
      packages: {
        ...siteData.packages,
        [category]: siteData.packages[category].filter(p => p.id !== packageId)
      }
    };
    await syncToFirestore(newData);
  };

  const addTestimonial = async (testimonial) => {
    const newData = {
      ...siteData,
      testimonials: [...siteData.testimonials, { ...testimonial, id: Date.now() }]
    };
    await syncToFirestore(newData);
  };

  const removeTestimonial = async (id) => {
    const newData = {
      ...siteData,
      testimonials: siteData.testimonials.filter(t => t.id !== id)
    };
    await syncToFirestore(newData);
  };

  return (
    <SiteContext.Provider value={{ 
      siteData, 
      user,
      loading,
      login,
      logout,
      createAdmin,
      updateSettings, 
      addPackage, 
      updatePackage, 
      removePackage,
      addTestimonial,
      removeTestimonial
    }}>
      {!loading && children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);
