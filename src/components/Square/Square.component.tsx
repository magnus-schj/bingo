import React, { FC } from "react";

import "./Square.styles.css";
import { ButtonBase, Card, useMediaQuery, Typography } from "@mui/material";
import { markAsHappened } from "../../firebase/firebase.utils";

interface Props {
  event: string;
  uId?: string;
  sId: string;
  happened: boolean;
}

const SquareComponent: FC<Props> = ({ event, uId, sId, happened }) => {
  if (!uId) return null;
  const pad = useMediaQuery("(max-width:524px)");
  const cardDimension = pad ? "4rem" : "8rem";
  const dimension = pad ? "2rem" : "4rem";
  return (
    <Card
      raised
      sx={{ margin: "1rem", height: cardDimension, width: cardDimension }}
    >
      <ButtonBase
        onClick={() => markAsHappened(uId, sId)}
        disabled={happened}
        sx={{
          background: happened ? "gold" : "white",
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
