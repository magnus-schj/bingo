import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./App/hookts";
import SignedIn from "./components/SignedIn/SignedIn.component";
import SignInAndSignUp from "./components/SignInAndSignUp/SignInAndSignUp.component";
import {
  resetBoard,
  setCurrentUser,
} from "./features/currentUser/currentUser.slice";
import { auth } from "./firebase/firebase.utils";

import "./baseStyles.scss";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

function App() {
  const dispatch = useAppDispatch();

  const currentUserSlice = useAppSelector((state) => state.currentUser);

  // reactFire
  const fireStoreInstance = getFirestore(useFirebaseApp());

  // listener for when a user loggd in or out
  let unsubscribeFromAuth: null | Unsubscribe = null;
  useEffect(() => {
    unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user));
    });
    // end of listener
    return () => {
      if (unsubscribeFromAuth) unsubscribeFromAuth();
    };
  }, [auth.currentUser]);

  return (
    <FirestoreProvider sdk={fireStoreInstance}>
      <div className="App">
        {currentUserSlice.userInfo ? <SignedIn /> : <SignInAndSignUp />}
      </div>
    </FirestoreProvider>
  );
}

export default App;
