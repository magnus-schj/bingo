import React, { FC } from "react";

import "./Square.styles.css";
import { ButtonBase, Card } from "@mui/material";
import { markAsHappened } from "../../firebase/firebase.utils";

interface Props {
  event: string;
  uId?: string;
  sId: string;
  happened: boolean;
}

const SquareComponent: FC<Props> = ({ event, uId, sId, happened }) => {
  if (!uId) return null;

  return (
    <Card>
      <ButtonBase
        onClick={() => markAsHappened(uId, sId)}
        disabled={happened}
        sx={{
          padding: "4rem",
          background: happened ? "gold" : "white",
        }}
      >
        {event}
      </ButtonBase>
    </Card>
  );
};

export default SquareComponent;
