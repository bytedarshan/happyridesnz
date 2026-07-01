import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import fs from "fs";

// Read .env file manually
const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const siteDocRef = doc(db, 'content', 'siteData');

async function run() {
  try {
    console.log("Updating booking link in Firestore...");
    await updateDoc(siteDocRef, {
      "settings.bookingLink": "https://6a38cc049dc85.trial.easytaxioffice.com/booking?site_key=7e3f3d3085b900d598bc40543d611575"
    });
    console.log("Successfully updated booking link in Firestore!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating booking link:", error);
    process.exit(1);
  }
}

run();
