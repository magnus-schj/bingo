import { collection, doc, getDoc } from "firebase/firestore";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";

interface Props {}

interface Params {
  gameId?: string;
}
const Game: FC<Props> = () => {
  const { gameId }: Params = useParams();
  if (!gameId) return null;

  const ref = doc(useFirestore(), "games", gameId);
  const { data, status } = useFirestoreDocData(ref);

  const urlWrong = status === "success" && !data;
  if (urlWrong) return <div>Siden finnes ikke</div>;

  console.log(data);
  return data ? <div>{data.name}</div> : <div>laster...</div>;
};

export default Game;
