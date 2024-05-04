// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-93fb1.firebaseapp.com",
  projectId: "auth-93fb1",
  storageBucket: "auth-93fb1.appspot.com",
  messagingSenderId: "1099021350693",
  appId: "1:1099021350693:web:d877c8f20c1b11e8a48ccc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);