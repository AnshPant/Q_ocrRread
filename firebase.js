import { getFirestore } from 'firebase/firestore'; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUJ6uKcHzctLre-wwUnX7qtZLaekA3wlA",
  authDomain: "development-ad22d.firebaseapp.com",
  projectId: "development-ad22d",
  storageBucket: "development-ad22d.appspot.com",
  messagingSenderId: "138380087002",
  appId: "1:138380087002:web:6de2531cbe37e0ecc29fe3",
  measurementId: "G-4HQVEK3XFJ"
};



const firebaseConfig2 = {

  apiKey: "AIzaSyCajGIpuz-1gdTkalzGM3iTLaG0-wunBYM",
  authDomain: "swe-hostelandcomplaint.firebaseapp.com",
  projectId: "swe-hostelandcomplaint",
  storageBucket: "swe-hostelandcomplaint.appspot.com",
  messagingSenderId: "402049354453",
  appId: "1:402049354453:web:b94ef39484a64d783e305c",
  measurementId: "G-TBQG0JTGJ5"

};


// Initialize Firebase
const app2 = initializeApp(firebaseConfig2,'other');
// export const storage = getStorage(app)
export const db2 = getFirestore(app2);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);
// const analytics = getAnalytics(app);