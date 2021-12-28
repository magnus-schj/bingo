import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../App/hookts";
import Confetti from "./confetti/Confetti.component";
import Typography from "@mui/material/Typography";
import { getUserData } from "../firebase/firebase.utils";
import { DocumentData } from "firebase/firestore";

interface Props {}

const WinnerBanner: FC<Props> = () => {
  // state
  const initialState = null;
  const [winnerInfo, setWinnerInfo] = useState<DocumentData | null>(
    initialState
  );

  // selectors
  const winnerSlice = useAppSelector((state) => state.winner);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData(winnerSlice.uid);
      setWinnerInfo(userData);
      console.log("data:", userData);
    };
    fetchData();
  }, []);
  return winnerSlice.uid && winnerInfo ? (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Confetti />
      <Typography variant="h2" color="initial">
        {winnerInfo.displayName} har vunnet!
      </Typography>
    </div>
  ) : null;
};

export default WinnerBanner;
