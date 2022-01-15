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

import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import Game from "../Game.component";
import Root from "../Root.component";
import NavBar from "../NavBar.component";

interface Props {}

const SignedIn: FC<Props> = () => {
  const { currentUser } = auth;
  useEffect(() => {
    //if  creates a user document of there is none
    if (currentUser && currentUser.providerData[0].providerId === "google.com")
      createUserProfileDocument(currentUser, {
        displayName: currentUser.displayName,
      });
  }, []);

  return (
    <div>
      <NavBar />
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
