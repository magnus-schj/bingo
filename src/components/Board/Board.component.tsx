import { useMediaQuery } from "@mui/material";
import { collection, doc } from "firebase/firestore";
import React, { FC, useEffect } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { auth, saveBoard, saveWinner } from "../../firebase/firebase.utils";
import { generateBoard } from "../SignedIn/utils";
import SquareComponent from "../Square/Square.component";

import "./Board.styles.css";
import { arrayToMatrix, hasUserWon } from "./utils";

interface Props {
  gameId: string;
}

const Board: FC<Props> = ({ gameId }) => {
  const { currentUser } = auth;
  if (!currentUser) return null;

  // media queries
  const pad = useMediaQuery("(max-width:542px)");

  // ! firebase
  // for game
  const gameRef = doc(useFirestore(), "games", gameId);
  const gameRes = useFirestoreDocData(gameRef);

  // for board

  const boardRef = collection(
    useFirestore(),
    "games",
    gameId,
    "boards",
    currentUser.uid,
    "squares"
  );

  const { data }: any = useFirestoreCollectionData(boardRef);
  const dataLoaded = gameRes.data && data && data.length === 16;
  useEffect(() => {
    // generates boards, saves it if no other exists
    currentUser && saveBoard(currentUser, gameId, generateBoard());
    // checks if user hav won
    if (data && hasUserWon(data)) saveWinner(currentUser.uid, gameId);
  }, [data]);
  return (
    <div
      style={{
        width: pad ? "95%" : "auto",
      }}
    >
      {dataLoaded &&
        arrayToMatrix(data).map((row, i) => (
          <div key={i} className="row">
            {row.map(({ NO_ID_FIELD, ...otherData }) => (
              <SquareComponent
                key={NO_ID_FIELD}
                uId={currentUser.uid}
                sId={NO_ID_FIELD}
                disabled={gameRes.data.winnerID != null}
                gameId={gameId}
                {...otherData}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
