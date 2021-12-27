import React, { FC, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../App/hookts";
import {
  auth,
  createUserProfileDocument,
  db,
  saveBoard,
} from "../../firebase/firebase.utils";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { generateBoard } from "./utils";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  resetBoard,
  setBoard,
} from "../../features/currentUser/currentUser.slice";
import Board from "../Board/Board.component";

interface Props {}

const SignedIn: FC<Props> = () => {
  const { currentUser } = auth;
  const dispatch = useAppDispatch();
  useEffect(() => {
    //if  creates a user document of there is none
    if (currentUser && currentUser.providerData[0].providerId === "google.com")
      createUserProfileDocument(currentUser, {
        displayName: currentUser.displayName,
      });

    // makes a board, saves it if the is no other board
    currentUser && saveBoard(currentUser, generateBoard());

    // listener for board
    let unsub: null | Unsubscribe = null;
    if (currentUser) {
      unsub = onSnapshot(
        collection(db, "boards", currentUser.uid, "squares"),
        (querySnapShot) => {
          const board: any = [];
          querySnapShot.forEach((doc) =>
            board.push({ id: doc.id, ...doc.data() })
          );
          dispatch(setBoard(board));
        }
      );
    }
    return () => {
      unsub && unsub();
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
