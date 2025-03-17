// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwVfGML6NE0FfWNN1ltCFYx9GwETJfDP4",
  authDomain: "health-app-f4da9.firebaseapp.com",
  projectId: "health-app-f4da9",
  storageBucket: "health-app-f4da9.firebasestorage.app",
  messagingSenderId: "574430668486",
  appId: "1:574430668486:web:cb8f8db2ca65b5713559c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);