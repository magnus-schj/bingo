import { doc } from "firebase/firestore";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";
import { auth } from "../firebase/firebase.utils";
import Board from "./Board/Board.component";

interface Props {}

interface Params {
  gameId?: string;
}
const Game: FC<Props> = () => {
  const { gameId }: Params = useParams();
  if (!gameId) return null;

  const ref = doc(useFirestore(), "games", gameId);
  const { data, status } = useFirestoreDocDataOnce(ref);

  const urlWrong = status === "success" && !data;
  if (urlWrong) return <div>Siden finnes ikke</div>;

  return data ? (
    <div>
      <h1>{data.name}</h1>
      <Board gameId={gameId} />
    </div>
  ) : (
    <div>laster...</div>
  );
};

export default Game;
