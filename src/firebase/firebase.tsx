// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl6aGfNVN6Hg5Vy4IFA90e9EEaoJ5xEAk",
  authDomain: "filmify-76a1e.firebaseapp.com",
  projectId: "filmify-76a1e",
  storageBucket: "filmify-76a1e.appspot.com",
  messagingSenderId: "643815502686",
  appId: "1:643815502686:web:d266d9a857564f84d355cf",
  measurementId: "G-R6C08YJFXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
export { app, analytics, auth, db };
