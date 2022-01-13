import { useMediaQuery } from "@mui/material";
import { collection } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { auth, db, saveBoard } from "../../firebase/firebase.utils";
import { generateBoard } from "../SignedIn/utils";
import SquareComponent from "../Square/Square.component";

import "./Board.styles.css";
import { arrayToMatrix } from "./utils";

interface Props {
  gameId: string;
}

const Board: FC<Props> = ({ gameId }) => {
  const { currentUser } = auth;
  if (!currentUser) return null;
  // media queries
  const pad = useMediaQuery("(max-width:542px)");

  const ref = collection(
    useFirestore(),
    "games",
    gameId,
    "boards",
    currentUser.uid,
    "squares"
  );

  const { data } = useFirestoreCollectionData(ref);
  useEffect(() => {
    currentUser && saveBoard(currentUser, gameId, generateBoard());
  }, []);
  return (
    <div
      style={{
        width: pad ? "95%" : "auto",
      }}
    >
      {data &&
        arrayToMatrix(data).map((row, i) => (
          <div key={i} className="row">
            {row.map(({ NO_ID_FIELD, ...otherData }) => (
              <SquareComponent
                key={NO_ID_FIELD}
                uId={currentUser.uid}
                sId={NO_ID_FIELD}
                disabled={false}
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
