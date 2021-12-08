import { useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hookts";
import { resetBoard } from "../../features/currentUser/currentUser.slice";
import { auth } from "../../firebase/firebase.utils";
import { Square } from "../../interfaces";
import SquareComponent from "../Square/Square.component";

import "./Board.styles.css";
import { hasUserWon, matrixNotNull, matrixToArray } from "./utils";

interface Props {}

const Board: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const currentUserSlice = useAppSelector((state) => state.currentUser);
  const { board } = currentUserSlice;
  const [loaded, setLoaded] = useState(false);
  const pad = useMediaQuery("(max-width:542px)");

  useEffect(() => {
    // checks that board is not null or filled with nulls
    if (matrixNotNull(board) && board) {
      setLoaded(true);
      // checks if user has won
      if (hasUserWon(matrixToArray(board))) {
        console.log("winner!");
      }
    } else setLoaded(false);
  }, [currentUserSlice.board]);

  if (!loaded) return <h1>Loading...</h1>;
  return (
    <div
      style={{
        width: pad ? "95%" : "auto",
      }}
    >
      {currentUserSlice.board &&
        currentUserSlice.board.map((row: Square[], i) => (
          <div key={i} className="row">
            {row.map(({ id, ...data }) => (
              <SquareComponent
                key={id}
                uId={currentUserSlice.userInfo?.uid}
                sId={id}
                {...data}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
