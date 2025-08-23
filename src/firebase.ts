
// Import the functions you need from the SDKs you need
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3E105TzutG-vxC0HPfFFPQYiT_JtdIfw",
  authDomain: "oto-do-app.firebaseapp.com",
  projectId: "oto-do-app",
  storageBucket: "oto-do-app.firebasestorage.app",
  messagingSenderId: "577929073987",
  appId: "1:577929073987:web:351fb7c5d9a606f6c78bf6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Use initializeAuth for persistent login
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});

export { auth };
export const db = getFirestore(app);
export { app };
