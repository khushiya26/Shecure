import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "shecure-xxxx.firebaseapp.com",
  projectId: "shecure-xxxx",
  storageBucket: "shecure-xxxx.firebasestorage.app",
  messagingSenderId: "your ID",
  appId: "your ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Authentication instance
const storage = getStorage(app); // Storage instance

// Export services
export { app, db, auth, storage };
