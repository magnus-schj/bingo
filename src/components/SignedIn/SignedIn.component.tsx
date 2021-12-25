import React, { FC, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../App/hookts";
import { auth, db, saveBoard } from "../../firebase/firebase.utils";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { generateBoard } from "./utils";
import { collection, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  resetBoard,
  setBoard,
} from "../../features/currentUser/currentUser.slice";
import Board from "../Board/Board.component";
import { setWinner } from "../../features/winner/winner.slice";

interface Props {}

const SignedIn: FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // listener for winner
    let winUnsub = onSnapshot(
      doc(db, "games", "christmas2021"),
      (document: any) => {
        const data = document.data();
        if (data.winnerID) {
          dispatch(setWinner(data));
        }
      }
    );

    // end of listener for winner

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
    // note: board is not saved if it already exists
    auth.currentUser && saveBoard(auth.currentUser, generateBoard());
    // resets board in reudux when components dismounts
    return () => {
      unsub && unsub();
      winUnsub();
      dispatch(resetBoard());
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
