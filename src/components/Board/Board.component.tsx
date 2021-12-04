import { useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "../../App/hookts";
import { auth } from "../../firebase/firebase.utils";
import { Square } from "../../interfaces";
import SquareComponent from "../Square/Square.component";

import "./Board.styles.css";

interface Props {}

const Board: FC<Props> = () => {
  const currentUserSlice = useAppSelector((state) => state.currentUser);

  const pad = useMediaQuery("(max-width:542px)");
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
