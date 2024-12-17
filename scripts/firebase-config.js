// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMv3YbLu1NDER6YUjIn8syayVX2V-hiBo",
    authDomain: "scholarcatalyst.firebaseapp.com",
    projectId: "scholarcatalyst",
    storageBucket: "scholarcatalyst.firebasestorage.app",
    messagingSenderId: "648997912501",
    appId: "1:648997912501:web:2aa32d48e76dd2f21323fc",
    measurementId: "G-R02Z557Y8F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
