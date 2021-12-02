import React, { FC, useEffect } from "react";

import { useAppSelector } from "../../App/hookts";
import { auth, makeBoard } from "../../firebase/firebase.utils";
import { Button } from "@mui/material";
import { generateBoard } from "./utils";

interface Props {}

const SignedIn: FC<Props> = () => {
  const currentUserSlice = useAppSelector((state) => state.currentUser);
  useEffect(() => {
    auth.currentUser && makeBoard(auth.currentUser, generateBoard());
  }, []);
  return (
    <div>
      <Button variant="contained" onClick={() => auth.signOut()}>
        Logg ut
      </Button>
    </div>
  );
};

export default SignedIn;
