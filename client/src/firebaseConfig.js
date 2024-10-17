// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyANbCP4Hd4N22bsWixV5AQbK0qa5eP8IWg",
  authDomain: "fir-frontend-b6b2e.firebaseapp.com",
  projectId: "fir-frontend-b6b2e",
  storageBucket: "fir-frontend-b6b2e.appspot.com",
  messagingSenderId: "131408868465",
  appId: "1:131408868465:web:9e46fd24e6c535a99697d0",
  measurementId: "G-WBTEYCH1TP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);