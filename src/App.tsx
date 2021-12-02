import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch } from "./App/hookts";
import SignIn from "./components/SignIn.component";
import { setCurrentUser } from "./features/currentUser/currentUser.slice";
import { auth } from "./firebase/firebase.utils";

function App() {
  const dispatch = useAppDispatch();

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
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
