import React, { FC } from "react";

import { Card, Typography } from "@mui/material";

interface Props {}

const SignUp: FC<Props> = () => {
  return (
    <Card className="form-container">
      <Typography variant="h3" color="initial">
        Registrer deg
      </Typography>
    </Card>
  );
};

export default SignUp;
