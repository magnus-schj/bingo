import { Typography } from "@mui/material";
import { doc } from "firebase/firestore";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce,
} from "reactfire";
import { auth } from "../firebase/firebase.utils";
import Board from "./Board/Board.component";
import NotVertified from "./NotVertified.component";
import WinnerBanner from "./WinnerBanner.component";

interface Props {}

interface Params {
  gameId?: string;
}
const Game: FC<Props> = () => {
  const { gameId }: Params = useParams();
  const navigate = useNavigate();
  if (!gameId || !auth.currentUser) return null;

  // ! firebased
  // user data
  const userRef = doc(useFirestore(), "users", auth.currentUser.uid);
  const userRes = useFirestoreDocData(userRef);
  // game data
  const ref = doc(useFirestore(), "games", gameId);
  const { data, status } = useFirestoreDocDataOnce(ref);

  const urlWrong = status === "success" && !data;
  if (urlWrong) return <div>Siden finnes ikke</div>;
  if (userRes.data && !userRes.data.vertified) return <NotVertified />;

  return data ? (
    <div className="base-container">
      {data.winnerID && <WinnerBanner winnerID={data.winnerID} />}
      <h1>{data.name}</h1>
      <Typography variant="subtitle2" color="initial">
        Trykk igjen for å angre
      </Typography>
      <Board gameId={gameId} />
    </div>
  ) : (
    <div>Laster...</div>
  );
};

export default Game;
