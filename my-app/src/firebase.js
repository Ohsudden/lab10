import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCoSRtcvS62mYQgniKAQ44akeJS73WDVEM",
    authDomain: "lab10-cd120.firebaseapp.com",
    projectId: "lab10-cd120",
    storageBucket: "lab10-cd120.firebasestorage.app",
    messagingSenderId: "688245075031",
    appId: "1:688245075031:web:a71c0694f1637f8b5d8712",
    measurementId: "G-M9ZXP4GBG7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };