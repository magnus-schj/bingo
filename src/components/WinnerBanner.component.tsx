import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../App/hookts";
import Confetti from "./confetti/Confetti.component";
import Typography from "@mui/material/Typography";
import { getUserData } from "../firebase/firebase.utils";
import { doc, DocumentData } from "firebase/firestore";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

interface Props {
  winnerID: string;
}

const WinnerBanner: FC<Props> = ({ winnerID }) => {
  const ref = doc(useFirestore(), "users", winnerID);
  const { data } = useFirestoreDocData(ref);
  return data ? (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Confetti />
      <Typography variant="h2" color="initial">
        {data.displayName} har vunnet!
      </Typography>
    </div>
  ) : null;
};

export default WinnerBanner;
