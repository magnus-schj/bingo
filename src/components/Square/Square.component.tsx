import React, { FC } from "react";

import "./Square.styles.css";
import { ButtonBase } from "@mui/material";

interface Props {
  event: string;
}

const SquareComponent: FC<Props> = ({ event }) => {
  return (
    <ButtonBase
      sx={{
        padding: "4rem",
      }}
    >
      {event}
    </ButtonBase>
  );
};

export default SquareComponent;
