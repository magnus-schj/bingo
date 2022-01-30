import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { Square } from "../interfaces";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCNlRWsb3K2MTZL-UsqvBXkR1mTaLkVLYM",

  authDomain: "bingo-dev-27752.firebaseapp.com",

  projectId: "bingo-dev-27752",

  storageBucket: "bingo-dev-27752.appspot.com",

  messagingSenderId: "500491440168",

  appId: "1:500491440168:web:4afd78e3dd588d7d64e51d",

  measurementId: "G-Q8997ZGSEW",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();

// ** Sign in with google
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// save board
export const saveBoard = async (
  userAuth: User,
  gameId: string,
  board: Square[]
) => {
  const boardref = doc(db, "games", gameId, "boards", userAuth.uid);
  const snapShot = await getDoc(boardref);
  if (snapShot && !snapShot.exists()) {
    const createdAt = serverTimestamp();
    try {
      await setDoc(boardref, { createdAt });
      board.forEach(async (square) => {
        const squareRef = doc(
          db,
          "games",
          gameId,
          "boards",
          userAuth.uid,
          "squares",
          v4()
        );
        await setDoc(squareRef, square);
      });
    } catch (error) {
      console.log("error creating board:", error);
    }
  }
};

// mark or unmark square
export const setHappened = async (
  gId: string,
  uId: string,
  sId: string,
  happened: boolean
) => {
  const ref = doc(db, "games", gId, "boards", uId, "squares", sId);
  const snapshot = (await getDoc(ref)).data();

  try {
    await setDoc(ref, { ...snapshot, happened: happened });
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
export const saveWinner = async (uid: string | undefined, gameId: string) => {
  if (!uid) return;
  const ref = doc(db, "games", gameId);
  const snapshot = (await getDoc(ref)).data();
  try {
    await setDoc(ref, { ...snapshot, winnerID: uid });
  } catch (error) {
    console.log("error saving winner:", error);
  }
};

// get user
export const getUserData = async (uid: string | null) => {
  if (!uid) return null;
  const ref = doc(db, "users", uid);
  const snapShot = await getDoc(ref);
  if (!snapShot.exists()) return null;
  return snapShot.data();
};
