import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBKVE-_42t4FmqQ5wiz23PoXR_42JTaElY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "maison-elegance-22176.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "maison-elegance-22176",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "maison-elegance-22176.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "538764497756",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:538764497756:web:8746a822762da70779a799",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EP7T7KP33M"
};

export const isFirebaseConfigured = true;

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics support check
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

console.info("⚡ Maison Élégance: Firebase initialized for project maison-elegance-22176");

export { app, db, auth, storage, analytics };
