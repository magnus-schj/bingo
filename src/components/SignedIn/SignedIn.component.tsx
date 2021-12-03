import React, { FC, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../App/hookts";
import { auth, db, saveBoard } from "../../firebase/firebase.utils";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { generateBoard } from "./utils";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { setBoard } from "../../features/currentUser/currentUser.slice";
import { Square } from "../../interfaces";
import Board from "../Board/Board.component";

interface Props {}

const SignedIn: FC<Props> = () => {
  const dispatch = useAppDispatch();

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
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => auth.signOut()}
          >
            Logg ut
          </Button>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: "6rem" }}>
        <Board />
      </main>
    </div>
  );
};

export default SignedIn;
