import React, { FC } from "react";
import { useAppSelector } from "../../App/hookts";
import { Square } from "../../interfaces";
import SquareComponent from "../Square/Square.component";

import "./Board.styles.css";

interface Props {}

const Board: FC<Props> = () => {
  const currentUserSlice = useAppSelector((state) => state.currentUser);

  return (
    <div>
      <ul>
        {currentUserSlice.board &&
          currentUserSlice.board.map((row: Square[]) => (
            <div className="row">
              {row.map((square) => (
                <SquareComponent event={square.event} />
              ))}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Board;
