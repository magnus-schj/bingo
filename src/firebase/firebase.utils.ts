import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// ! firebase basic config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAXuVMbb0DRNgu0t6_GtXZ-sOWl8m5UG-w",
  authDomain: "bingo-5823c.firebaseapp.com",
  projectId: "bingo-5823c",
  storageBucket: "bingo-5823c.appspot.com",
  messagingSenderId: "157826535010",
  appId: "1:157826535010:web:7fee7e9ff01cdd9bbe0b3b",
  measurementId: "G-FN1FHWNFT9",
};
// Initialize Firebase
initializeApp(firebaseConfig);
// firebase.analytics();

// ! --------
export const auth = getAuth();
export const db = getFirestore();

// ** Sign in with google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
