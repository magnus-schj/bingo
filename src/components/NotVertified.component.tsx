import { Card, useTheme, Typography } from "@mui/material";
import WarningIcon from "@material-ui/icons/Warning";
import React, { FC } from "react";
import { auth } from "../firebase/firebase.utils";

interface Props {}

const NotVertified: FC<Props> = () => {
  const theme = useTheme();
  return (
    <Card
      className="base-container"
      sx={{
        background: theme.palette.warning.light,
        width: "90%",
        margin: "auto",
      }}
    >
      <WarningIcon style={{ height: "6rem", width: "6rem" }} />
      <Typography variant="h2" color="initial">
        You are not vertified
      </Typography>
      <Typography variant="body1" color="initial">
        If i know you, hit me up with your uid and i'l let you in
      </Typography>
      <Typography variant="body2" color="initial">
        Your uid: {auth.currentUser?.uid}{" "}
      </Typography>
    </Card>
  );
};

export default NotVertified;
