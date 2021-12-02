import { Button } from "@mui/material";
import React, { FC } from "react";
import { auth } from "../firebase/firebase.utils";

interface Props {}

const SignedIn: FC<Props> = () => {
  return (
    <div>
      <Button variant="contained" onClick={() => auth.signOut()}>
        Logg ut
      </Button>
    </div>
  );
};

export default SignedIn;
