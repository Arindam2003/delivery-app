// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "petpooja-e0d65.firebaseapp.com",
    projectId: "petpooja-e0d65",
    storageBucket: "petpooja-e0d65.firebasestorage.app",
    messagingSenderId: "167380550993",
    appId: "1:167380550993:web:9ba7c4d5044b7ba0fd3f70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);

export {app,auth}
