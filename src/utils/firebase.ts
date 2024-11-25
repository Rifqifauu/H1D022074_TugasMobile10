// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBiMRDwVqMX22JQf-I8Af4DB7FWSuo_-0U",
    authDomain: "vue-firebase-11491.firebaseapp.com",
    projectId: "vue-firebase-11491",
    storageBucket: "vue-firebase-11491.firebasestorage.app",
    messagingSenderId: "951528750225",
    appId: "1:951528750225:web:bd200b8fc4170311e71330"
  };
  
// modifikasi src/utils/firebase.ts
import { getFirestore } from 'firebase/firestore';


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };