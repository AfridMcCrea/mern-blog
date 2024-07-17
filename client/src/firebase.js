// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-5071c.firebaseapp.com",
  projectId: "mern-blog-5071c",
  storageBucket: "mern-blog-5071c.appspot.com",
  messagingSenderId: "394553216985",
  appId: "1:394553216985:web:80f43347be9606a93a53c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);