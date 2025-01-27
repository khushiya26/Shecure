import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAg1Nn5yd-4x5v6OiI8ppYd5wCqXS7iFj0",
  authDomain: "shecure-de8f7.firebaseapp.com",
  projectId: "shecure-de8f7",
  storageBucket: "shecure-de8f7.firebasestorage.app",
  messagingSenderId: "704129366963",
  appId: "1:704129366963:web:82b54c81af9f8980f129c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Authentication instance
const storage = getStorage(app); // Storage instance

// Export services
export { app, db, auth, storage };