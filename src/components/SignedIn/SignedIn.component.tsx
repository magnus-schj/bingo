import React, { FC, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../App/hookts";
import { auth, db, saveBoard } from "../../firebase/firebase.utils";
import { Button } from "@mui/material";
import { generateBoard } from "./utils";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { setBoard } from "../../features/currentUser/currentUser.slice";

interface Props {}

const SignedIn: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const currentUserSlice = useAppSelector((state) => state.currentUser);
  useEffect(() => {
    // listener for board
    let unsub: null | Unsubscribe = null;
    if (auth.currentUser) {
      unsub = onSnapshot(
        collection(db, "boards", auth.currentUser.uid, "squares"),
        (querySnapShot) => {
          const board: any = [];
          querySnapShot.forEach((doc) =>
            board.push({ id: doc.id, ...doc.data() })
          );
          console.log(board);
          dispatch(setBoard(board));
        }
      );
    }
    auth.currentUser && saveBoard(auth.currentUser, generateBoard());
    return () => {
      unsub && unsub();
    };
  }, []);
  return (
    <div>
      <ul>
        {currentUserSlice.board &&
          currentUserSlice.board.map((square) => <li>{square.event}</li>)}
      </ul>
      <Button variant="contained" onClick={() => auth.signOut()}>
        Logg ut
      </Button>
    </div>
  );
};

export default SignedIn;
