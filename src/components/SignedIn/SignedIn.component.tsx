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

import { resetBoard } from "../../features/currentUser/currentUser.slice";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { collection, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Props {}

const SignedIn: FC<Props> = () => {
  const { currentUser } = auth;
  const dispatch = useAppDispatch();

  // get all games
  const ref = collection(useFirestore(), "games");
  const { status, data } = useFirestoreCollectionData(ref);
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
        {data &&
          data.map(({ NO_ID_FIELD, name }) => (
            <Link key={NO_ID_FIELD} to={NO_ID_FIELD}>
              {name}
            </Link>
          ))}
      </main>
    </div>
  );
};

export default SignedIn;
