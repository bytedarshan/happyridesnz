import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  collection,
  deleteDoc
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
  const [admins, setAdmins] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial Data Structure
  const initialData = {
    packages: { aucklandCityTours, aucklandActivities, intercityTours, rotoruaTours, rotoruaActivities, paihiaTours, paihiaActivities },
    /*
    testimonials: [
      { id: 1, name: "Sarah Johnson", location: "Sydney, Australia", text: "The Auckland City Tour was the highlight of our trip! The driver was professional and knew all the best spots for photos. The frosted glass design of the website really reflects the premium service they provide.", rating: 5 },
      { id: 2, name: "Mark Thompson", location: "London, UK", text: "Seamless airport transfer. I arrived after a long flight and having a friendly face waiting for me made all the difference. Highly recommend Happy Rides for anyone visiting New Zealand.", rating: 5 },
      { id: 3, name: "Emily Chen", location: "Singapore", text: "We booked the Rotorua day trip. The itinerary was perfectly balanced and the luxury transport was incredibly comfortable for the long drive. Five stars!", rating: 5 }
    ],
    */
    services: [
      { title: 'Airport Transfers', desc: 'Reliable and punctual transfers to and from all major airports. We monitor your flight to ensure we are there when you land.' },
      { title: 'Corporate Travel', desc: 'Discreet and professional transport for business professionals. Priority bookings and dedicated accounts available.' },
      { title: 'Group Transfers', desc: 'Spacious vehicles perfect for families or large groups. Ideal for events, weddings, and group tours.' },
      { title: 'Custom Tours', desc: 'Tailor-made itineraries to explore New Zealand at your own pace. Choose your destinations and we handle the rest.' },
      { title: '24/7 Availability', desc: 'We operate around the clock. Day or night, Happy Rides is just a booking away.' },
      { title: 'Safety First', desc: 'Our vehicles undergo regular safety inspections, and our drivers are fully vetted and professionally trained.' }
    ],
    settings: {
      // General
      siteTitle: "Happy Rides",
      siteTagline: "Enjoy the journey. Love the ride",

      // Hero Section
      heroTitle: "Your New Zealand Escape Starts Here.",
      heroFeature1: "Professional Drivers",
      heroFeature2: "24/7 Service",
      heroFeature3: "Luxury Fleet",

      // Home Page Sections
      homeWhyTitle: "Why Choose Happy Rides?",
      homeWhyText: "Welcome to Happy Rides, your trusted partner for safe, reliable, and comfortable transport in New Zealand. We understand that travel can be stressful, which is why we are dedicated to taking that weight off your shoulders.",
      homeServicesTitle: "Our Premium Services",
      homePackagesTitle: "Popular Travel Packages",
      homePackagesText: "From the geothermal wonders of Rotorua to the magical Shire in Hobbiton, discover our most loved travel experiences. We offer both half-day highlights and multi-day adventures.",

      // About Us Page
      aboutTitle: "About Happy Rides",
      aboutText: "Enjoy the journey. Love the ride with our premium passenger services across NZ.",
      aboutStoryTitle: "Our Story",
      aboutStoryText: "Happy Rides was founded with a simple mission: to make travel in New Zealand as enjoyable as the destinations themselves. We understand that punctuality and peace of mind are non-negotiable for our clients.\n\nWhether you're a first-time visitor or a regular traveler, our professional drivers and pristine modern fleet are at your service 24/7. We pride ourselves on our fixed-fare policy—no hidden costs, no surge pricing, just honest service.",

      // Contact & Footer
      contactEmail: "info@happyrides.co.nz",
      contactPhone: "+64 21 244 0244",
      contactAddress: "Auckland, New Zealand",
      footerDesc: "Your premium gateway to exploring the stunning landscapes and vibrant culture of New Zealand. We provide curated tours and professional transfer services.",
      instagramUrl: "https://www.instagram.com/happyridesnz/",
      whatsappNumber: "64212440244",
      contactHeadline: "Get In Touch",
      contactSubline: "Have questions or want to book a custom tour? We're here to help.",
      servicesHeadline: "Our Premium Services",
      servicesSubline: "Tailored transport solutions to meet every travel need.",
      /*
      testimonialsHeadline: "Guest Testimonials",
      testimonialsSubline: "Hear from travelers who explored the beauty of New Zealand with Happy Rides. We take pride in delivering unforgettable experiences.",
      */

      // New Settings from Plan
      heroSubtitle: "Leave the logistics to us. Enjoy a warm Kiwi welcome and a comfortable, premium ride to your destination.",
      bookingLink: "https://6a38cc049dc85.trial.easytaxioffice.com/booking?site_key=7e3f3d3085b900d598bc40543d611575",

      // Global Images
      logoImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1782225884/happyrides/logo_new.jpg",
      heroBgImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792346/happyrides/hero_bg.jpg",
      heroVisualImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792323/happyrides/auckland.jpg",
      aboutBriefImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792333/happyrides/auckland_city.jpg",
      packagesBriefImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792508/happyrides/rotorua_geothermal.jpg",

      // City Tour Visuals
      cityAucklandImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792333/happyrides/auckland_city.jpg",
      cityWaitomoImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792472/happyrides/image81.jpg",
      cityHobbitonImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792525/happyrides/tour1.jpg",
      cityRotoruaImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792508/happyrides/rotorua_geothermal.jpg",
      cityPaihiaImage: "https://res.cloudinary.com/dni1i56yo/image/upload/v1779792532/happyrides/tour2.jpg",

      // Fleet Section
      fleet: [
        { id: 'f1', type: 'SEDAN', img: 'https://res.cloudinary.com/dni1i56yo/image/upload/v1779792357/happyrides/image12.png', capacity: '1-3 Passengers' },
        { id: 'f2', type: 'SUV', img: 'https://res.cloudinary.com/dni1i56yo/image/upload/v1779792359/happyrides/image13.png', capacity: '1-4 Passengers' },
        { id: 'f3', type: 'PEOPLE MOVER', img: 'https://res.cloudinary.com/dni1i56yo/image/upload/v1779792360/happyrides/image18.png', capacity: '1-7 Passengers' },
        { id: 'f5', type: 'EXECUTIVE', img: 'https://res.cloudinary.com/dni1i56yo/image/upload/v1782225883/happyrides/executive_car.jpg', capacity: '1-3 Passengers' },
        { id: 'f4', type: 'MINIBUS', img: 'https://res.cloudinary.com/dni1i56yo/image/upload/v1779792355/happyrides/image10.png', capacity: '1-11 Passengers' }
      ],
      fleetColumns: 5
    }
  };

  // Auth & Admin Verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Check if the authenticated user's email exists in the Firestore admins collection.
          // This is the ONLY path to admin access — no bootstrapping or auto-promotion.
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.email));
            if (adminDoc.exists()) {
              setUser(currentUser);
            } else {
              // Not in admins collection → reject immediately
              await signOut(auth);
              setUser(null);
              alert("This account is not authorized as an admin. Please contact the site owner.");
            }
          } catch (docErr) {
            // Firestore permission error or network failure → reject for security
            console.error("Admin verification failed:", docErr.message);
            await signOut(auth);
            setUser(null);
            alert("Admin verification failed. Please check your connection or contact support.");
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth & Admin verification callback failed:", err);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Site Data Listener
  useEffect(() => {
    const siteDocRef = doc(db, 'content', 'siteData');
    const unsubscribe = onSnapshot(siteDocRef, async (docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // IMPORTANT: Firestore is the single source of truth.
          // We only fill in defaults for fields that are completely absent (undefined)
          // from the stored document. We NEVER overwrite existing values.
          const firestoreSettings = data.settings || {};
          const resolvedSettings = {
            ...initialData.settings,  // fallback defaults for keys not yet in Firestore
            ...firestoreSettings,     // Firestore always wins for keys it has (even empty string)
          };

          setSiteData({
            packages: data.packages || initialData.packages,
            // testimonials: data.testimonials || initialData.testimonials,
            services: data.services || initialData.services,
            settings: resolvedSettings,
          });
          setLoading(false);
        } else {
          // No document at all — create it with initialData
          try {
            await setDoc(siteDocRef, initialData);
          } catch (writeErr) {
            console.warn("Failed to write initial data to Firestore:", writeErr);
          }
          setSiteData(initialData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error processing site data snapshot:", err);
        setSiteData(initialData);
        setLoading(false);
      }
    }, (error) => {
      console.error("Firestore siteData snapshot listener failed:", error);
      setSiteData(initialData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Admin Team Listener
  useEffect(() => {
    const adminsRef = collection(db, 'admins');
    const unsubscribe = onSnapshot(adminsRef, (snapshot) => {
      try {
        const adminList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdmins(adminList);
      } catch (err) {
        console.error("Error processing admins snapshot:", err);
      }
    }, (error) => {
      console.warn("Firestore admins snapshot listener failed:", error);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const resetSiteData = async () => {
    if (window.confirm("This will reset all packages and site content to default. Are you sure?")) {
      await setDoc(doc(db, 'content', 'siteData'), initialData);
      alert("Site data reset successfully with new images.");
    }
  };

  const syncNewDefaults = async () => {
    if (!siteData) return;
    const newPackages = { ...siteData.packages };
    let addedCount = 0;

    Object.keys(initialData.packages).forEach(category => {
      const existingIds = new Set(siteData.packages[category]?.map(p => p.id) || []);
      initialData.packages[category].forEach(p => {
        if (!existingIds.has(p.id)) {
          newPackages[category] = [...(newPackages[category] || []), p];
          addedCount++;
        }
      });
    });

    if (addedCount > 0) {
      await updateDoc(doc(db, 'content', 'siteData'), { packages: newPackages });
      alert(`Successfully added ${addedCount} new tours without affecting your existing photos!`);
    } else {
      alert("Your site is already up to date with all default tours.");
    }
  };

  const createAdmin = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'admins', email), { email, role: 'admin', createdAt: new Date().toISOString() });
    return res;
  };

  const removeAdmin = async (email) => {
    if (user && email === user.email) { alert("You cannot remove yourself!"); return; }
    await deleteDoc(doc(db, 'admins', email));
  };

  const resetAdminPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent to " + email);
  };

  // FIXED: Use field-level Firestore updates for settings.
  // Each key is written as "settings.keyName" so ONLY the changed setting is
  // updated in Firestore. Packages, testimonials, services, and other settings
  // are NEVER touched by a settings update.
  const updateSettings = async (newSettings) => {
    const siteDocRef = doc(db, 'content', 'siteData');
    const fieldUpdates = {};
    Object.keys(newSettings).forEach(key => {
      fieldUpdates[`settings.${key}`] = newSettings[key];
    });
    await updateDoc(siteDocRef, fieldUpdates);
  };

  // FIXED: Package operations use field-level updates targeting only the
  // specific category array. Other categories and all settings are untouched.
  const addPackage = async (category, newPackage) => {
    const updatedCategory = [
      ...(siteData.packages[category] || []),
      { ...newPackage, id: Date.now().toString() }
    ];
    await updateDoc(doc(db, 'content', 'siteData'), {
      [`packages.${category}`]: updatedCategory
    });
  };

  const updatePackage = async (category, packageId, updatedPackage) => {
    const updatedCategory = siteData.packages[category].map(p =>
      p.id === packageId ? { ...p, ...updatedPackage } : p
    );
    await updateDoc(doc(db, 'content', 'siteData'), {
      [`packages.${category}`]: updatedCategory
    });
  };

  const removePackage = async (category, packageId) => {
    const updatedCategory = siteData.packages[category].filter(p => p.id !== packageId);
    await updateDoc(doc(db, 'content', 'siteData'), {
      [`packages.${category}`]: updatedCategory
    });
  };

  /*
  const addTestimonial = async (testimonial) => {
    const updatedTestimonials = [...siteData.testimonials, { ...testimonial, id: Date.now() }];
    await updateDoc(doc(db, 'content', 'siteData'), { testimonials: updatedTestimonials });
  };

  const updateTestimonial = async (id, updatedTestimonial) => {
    const updatedTestimonials = siteData.testimonials.map(t =>
      t.id === id ? { ...t, ...updatedTestimonial } : t
    );
    await updateDoc(doc(db, 'content', 'siteData'), { testimonials: updatedTestimonials });
  };

  const removeTestimonial = async (id) => {
    const updatedTestimonials = siteData.testimonials.filter(t => t.id !== id);
    await updateDoc(doc(db, 'content', 'siteData'), { testimonials: updatedTestimonials });
  };
  */

  const addService = async (service) => {
    const updatedServices = [...siteData.services, { ...service, id: Date.now().toString() }];
    await updateDoc(doc(db, 'content', 'siteData'), { services: updatedServices });
  };

  const updateService = async (serviceId, updatedService) => {
    const updatedServices = siteData.services.map(s =>
      (s.id === serviceId || s.title === serviceId) ? { ...s, ...updatedService } : s
    );
    await updateDoc(doc(db, 'content', 'siteData'), { services: updatedServices });
  };

  const removeService = async (serviceId) => {
    const updatedServices = siteData.services.filter(s =>
      (s.id !== serviceId && s.title !== serviceId)
    );
    await updateDoc(doc(db, 'content', 'siteData'), { services: updatedServices });
  };

  return (
    <SiteContext.Provider value={{
      siteData, admins, user, loading,
      login, logout, createAdmin, removeAdmin, resetAdminPassword, resetSiteData, syncNewDefaults,
      updateSettings, addPackage, updatePackage, removePackage, /* addTestimonial, updateTestimonial, removeTestimonial, */
      addService, updateService, removeService
    }}>
      {!loading && children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);
