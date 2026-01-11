// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: REPlACE WITH YOUR FIREBASE CONFIG
// You can find this in your Firebase Console -> Project Settings -> General -> "Your apps"
const firebaseConfig = {
    apiKey: "AIzaSyC4d_WZb6tsPRefJgDV8zbr1Yi-6pO9gBo",
    authDomain: "jalsakti.firebaseapp.com",
    projectId: "jalsakti",
    storageBucket: "jalsakti.firebasestorage.app",
    messagingSenderId: "238884761188",
    appId: "1:238884761188:web:13aaaf4bea5fdff1a77971",
    measurementId: "G-K1QFT8MM67"
};

import { getFirestore } from "firebase/firestore";

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
