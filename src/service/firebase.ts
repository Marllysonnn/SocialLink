// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore"; // <- Correção aqui

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3r3lEekk6p3WCxAiCSvg53by6jRsBpSk",
  authDomain: "social-links-profile-d88a5.firebaseapp.com",
  projectId: "social-links-profile-d88a5",
  storageBucket: "social-links-profile-d88a5.appspot.com", // <- corrigido storageBucket também
  messagingSenderId: "565124189791",
  appId: "1:565124189791:web:ecec7be95c47c15d1f15ea",
  measurementId: "G-XQJ8KL57MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Aqui inicializa o auth e o db separadamente
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };

// exporta também o doc e o getDoc se quiser
export { doc, getDoc };
