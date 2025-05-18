// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8nD-DoLkzkkm6CIZfKCUyIUCyNdSjA", // usa tus datos reales
  authDomain: "gestor-diario-a232e.firebaseapp.com",
  projectId: "gestor-diario-a232e",
  storageBucket: "gestor-diario-a232e.appspot.com",
  messagingSenderId: "179325189345",
  appId: "1:179325189345:web:4a954d8831c6bc516ee6a0",
};

// Inicializa Firebase solo una vez
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);