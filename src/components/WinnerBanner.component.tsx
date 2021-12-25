import React, { FC } from "react";
import { useAppSelector } from "../App/hookts";
import Confetti from "./confetti/Confetti.component";
import Typography from "@mui/material/Typography";

interface Props {}

const WinnerBanner: FC<Props> = () => {
  // selectors
  const winnerSlice = useAppSelector((state) => state.winner);

  return winnerSlice.uid ? (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Confetti />
      <Typography variant="h2" color="initial">
        Noen har vunnet!
      </Typography>
    </div>
  ) : null;
};

export default WinnerBanner;
