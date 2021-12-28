import React, { FC } from "react";

import "./SignInAndSignUp.styles.scss";
import { Typography } from "@mui/material";
import SignUp from "../SignUp.component";
import SignIn from "../SignIn.component";

interface Props {}

const SignInAndSignUp: FC<Props> = () => {
  return (
    <div className="base-container">
      <Typography variant="h3" color="initial">
        Bingo
      </Typography>
      <div className="forms-container">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default SignInAndSignUp;
