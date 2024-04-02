// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-724b0.firebaseapp.com",
  projectId: "mern-blog-724b0",
  storageBucket: "mern-blog-724b0.appspot.com",
  messagingSenderId: "970422826662",
  appId: "1:970422826662:web:31d6c01a850436748e6667",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
