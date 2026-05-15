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
  deleteDoc,
  getDocs,
  limit,
  query
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
    testimonials: [
      { id: 1, name: "Sarah Johnson", location: "Sydney, Australia", text: "The Auckland City Tour was the highlight of our trip! The driver was professional and knew all the best spots for photos. The frosted glass design of the website really reflects the premium service they provide.", rating: 5 },
      { id: 2, name: "Mark Thompson", location: "London, UK", text: "Seamless airport transfer. I arrived after a long flight and having a friendly face waiting for me made all the difference. Highly recommend Happy Rides for anyone visiting New Zealand.", rating: 5 },
      { id: 3, name: "Emily Chen", location: "Singapore", text: "We booked the Rotorua day trip. The itinerary was perfectly balanced and the luxury transport was incredibly comfortable for the long drive. Five stars!", rating: 5 }
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

  // Auth & Admin Verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const adminsSnap = await getDocs(query(collection(db, 'admins'), limit(1)));
        if (adminsSnap.empty) {
          await setDoc(doc(db, 'admins', currentUser.email), { email: currentUser.email, role: 'super_admin', createdAt: new Date().toISOString() });
          setUser(currentUser);
        } else {
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.email));
          if (adminDoc.exists()) {
            setUser(currentUser);
          } else {
            await signOut(auth);
            setUser(null);
            alert("This account is not authorized as an admin.");
          }
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Site Data Listener
  useEffect(() => {
    const siteDocRef = doc(db, 'content', 'siteData');
    const unsubscribe = onSnapshot(siteDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        setSiteData(docSnap.data());
        setLoading(false);
      } else {
        await setDoc(siteDocRef, initialData);
        setSiteData(initialData);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Admin Team Listener
  useEffect(() => {
    const adminsRef = collection(db, 'admins');
    const unsubscribe = onSnapshot(adminsRef, (snapshot) => {
      const adminList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAdmins(adminList);
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

  const syncToFirestore = async (newData) => {
    await updateDoc(doc(db, 'content', 'siteData'), newData);
  };

  const updateSettings = async (newSettings) => {
    await syncToFirestore({ ...siteData, settings: { ...siteData.settings, ...newSettings } });
  };

  const addPackage = async (category, newPackage) => {
    const newData = { ...siteData, packages: { ...siteData.packages, [category]: [...siteData.packages[category], { ...newPackage, id: Date.now().toString() }] } };
    await syncToFirestore(newData);
  };

  const updatePackage = async (category, packageId, updatedPackage) => {
    const newData = { ...siteData, packages: { ...siteData.packages, [category]: siteData.packages[category].map(p => p.id === packageId ? { ...p, ...updatedPackage } : p) } };
    await syncToFirestore(newData);
  };

  const removePackage = async (category, packageId) => {
    const newData = { ...siteData, packages: { ...siteData.packages, [category]: siteData.packages[category].filter(p => p.id !== packageId) } };
    await syncToFirestore(newData);
  };

  const addTestimonial = async (testimonial) => {
    const newData = { ...siteData, testimonials: [...siteData.testimonials, { ...testimonial, id: Date.now() }] };
    await syncToFirestore(newData);
  };

  const removeTestimonial = async (id) => {
    const newData = { ...siteData, testimonials: siteData.testimonials.filter(t => t.id !== id) };
    await syncToFirestore(newData);
  };

  return (
    <SiteContext.Provider value={{ 
      siteData, admins, user, loading,
      login, logout, createAdmin, removeAdmin, resetAdminPassword, resetSiteData,
      updateSettings, addPackage, updatePackage, removePackage, addTestimonial, removeTestimonial
    }}>
      {!loading && children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => useContext(SiteContext);
