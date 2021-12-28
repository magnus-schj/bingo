import { initializeApp } from "firebase/app";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { Square } from "../interfaces";
import { v4 } from "uuid";

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

// save board
export const saveBoard = async (userAuth: User, board: Square[]) => {
  const boardref = doc(db, "boards", userAuth.uid);

  const snapShot = await getDoc(boardref);

  if (!snapShot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(boardref, { createdAt });
      board.forEach(async (square) => {
        const squareRef = doc(db, "boards", userAuth.uid, "squares", v4());
        await setDoc(squareRef, square);
      });
    } catch (error) {
      console.log("error creating board:", error);
    }
  }
};

// mark square
export const markAsHappened = async (uId: string, sId: string) => {
  const ref = doc(db, "boards", uId, "squares", sId);
  const snapshot = await (await getDoc(ref)).data();

  try {
    await setDoc(ref, { ...snapshot, happened: true });
  } catch (error) {
    console.log("error marking square:", error);
  }
};

// create user profile document

export const createUserProfileDocument = async (
  user: User | null,
  otherData: any
) => {
  if (!user) return;
  const ref = doc(db, "users", user.uid);

  const snapShot = await getDoc(ref);

  if (!snapShot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await setDoc(ref, { displayName, email, createdAt, ...otherData });
    } catch (error) {
      console.log("error saving user:", error);
    }
  }
};
// save winner
export const saveWinner = async (uid: string | undefined) => {
  if (!uid) return;
  const ref = doc(db, "games", "christmas2021");
  const snapshot = (await getDoc(ref)).data();
  try {
    await setDoc(ref, { ...snapshot, winnerID: uid });
  } catch (error) {
    console.log("error saving winner:", error);
  }
};
