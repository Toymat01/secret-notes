// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB5FO8ZcTBfQYADTvgahu-PmKxPxEP8qus",
  authDomain: "flahcard.firebaseapp.com",
  projectId: "flahcard",
  storageBucket: "flahcard.appspot.com",
  messagingSenderId: "887150846687",
  appId: "1:887150846687:web:36f6907b26c0aad56cff6a",
  measurementId: "G-4FHQ5V0L8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore()

export{
    createUserWithEmailAndPassword,
    auth,
    analytics,
    db

}