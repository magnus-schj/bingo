import React, { FC, useState } from "react";

import "./Square.styles.css";
import {
  ButtonBase,
  Card,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { setHappened } from "../../firebase/firebase.utils";

interface Props {
  event?: string;
  uId?: string;
  sId?: string;
  happened?: boolean;
  disabled: boolean;
  gameId: string;
}

const SquareComponent: FC<Props> = ({
  event,
  uId,
  sId,
  happened,
  disabled,
  gameId,
}) => {
  if (!event || !uId || !sId) return null;
  // hooks
  const theme = useTheme();

  // media queries and css
  const pad = useMediaQuery("(max-width:524px)");
  const cardDimension = pad ? "4rem" : "8rem";

  const handleUndo = () => {
    if (!happened) return;
    setHappened(gameId, uId, sId, false);
  };
  return (
    <Card
      raised
      sx={{ margin: "1rem", height: cardDimension, width: cardDimension }}
      onClick={handleUndo}
    >
      <ButtonBase
        onClick={() => setHappened(gameId, uId, sId, true)}
        // disabled if either it has happened or there is a winner
        disabled={happened || disabled}
        sx={{
          background: happened ? theme.palette.success.light : "white",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography variant="subtitle2" color="initial"></Typography>
        {event}
      </ButtonBase>
    </Card>
  );
};

export default SquareComponent;
