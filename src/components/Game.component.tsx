import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface Props {}

const Game: FC<Props> = () => {
  const params = useParams();
  console.log("params:", params);
  return <div></div>;
};

export default Game;
