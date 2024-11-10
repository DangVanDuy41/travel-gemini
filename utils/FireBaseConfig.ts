// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAh8Sof-D5bpm49620ViTrMvFe-IQ_otb8",
  authDomain: "travel-gemini-45a06.firebaseapp.com",
  projectId: "travel-gemini-45a06",
  storageBucket: "travel-gemini-45a06.firebasestorage.app",
  messagingSenderId: "405179991911",
  appId: "1:405179991911:web:299d460a0640c1337051c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);