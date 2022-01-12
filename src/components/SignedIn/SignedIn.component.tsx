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

import { Link, Route, Routes } from "react-router-dom";
import Game from "../Game.component";
import Root from "../Root.component";

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
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path=":gameId" element={<Game />} />
        </Routes>
      </main>
    </div>
  );
};

export default SignedIn;
