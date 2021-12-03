import React, { FC } from "react";
import { useAppSelector } from "../App/hookts";
import { Square } from "../interfaces";
import SquareComponent from "./Square/Square.component";

interface Props {}

const Board: FC<Props> = () => {
  const currentUserSlice = useAppSelector((state) => state.currentUser);

  return (
    <div>
      <ul>
        {currentUserSlice.board &&
          currentUserSlice.board.map((square: Square) => (
            <SquareComponent event={square.event} />
          ))}
      </ul>
    </div>
  );
};

export default Board;
