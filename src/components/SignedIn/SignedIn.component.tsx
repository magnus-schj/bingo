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
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import {
  resetBoard,
  setBoard,
} from "../../features/currentUser/currentUser.slice";
import Board from "../Board/Board.component";
import { setWinner } from "../../features/winner/winner.slice";
import WinnerBanner from "../WinnerBanner.component";

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

    // listener for winner
    let winUnsub = onSnapshot(
      doc(db, "games", "christmas2021"),
      (document: DocumentSnapshot<DocumentData>) => {
        const data = document.data();
        if (data && data.winnerID) {
          dispatch(setWinner(data));
        }
      }
    );

    // end of listener for winner

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

    // note: board is not saved if it already exists
    auth.currentUser && saveBoard(auth.currentUser, generateBoard());
    // resets board in redux when components dismounts

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
        <WinnerBanner />
        <Board />
        <div>
          <h3>Ikke trykk på rutene før hendelsen har skjedd!</h3>
        </div>
      </main>
    </div>
  );
};

export default SignedIn;
