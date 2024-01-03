// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKD5GUo2sXLSIA_KI84YQAcmIbh0E7bXk",
    authDomain: "tsboa-authentication.firebaseapp.com",
    projectId: "tsboa-authentication",
    storageBucket: "tsboa-authentication.appspot.com",
    messagingSenderId: "99898133509",
    appId: "1:99898133509:web:c2c01c56ca4c704d61606c",
    measurementId: "G-PF9TL8R9YK"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getAuth(app)