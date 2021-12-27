import React, { FC } from "react";

import "./SignInAndSignUp.styles.css";
import { Typography } from "@mui/material";
import SignUp from "../SignUp.component";
import SignIn from "../SignIn.component";

interface Props {}

const SignInAndSignUp: FC<Props> = () => {
  return (
    <div className="sign-in-and-sign-up">
      <Typography variant="h3" color="initial">
        Bingo
      </Typography>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUp;
