import { Square } from "../../interfaces";
import { DIMENSION } from "../SignedIn/utils";

export const matrixNotNull = (matrix: Square[][] | null) => {
  if (!matrix) return false;
  //   is not empty til the oposite is proved
  let notEmpty = true;
  matrix.forEach((row) =>
    row.forEach((square) => {
      if (!square) {
        notEmpty = false;
      }
    })
  );
  return notEmpty;
};

export const matrixToArray = (matrix: any[][]) => {
  const array: any[] = [];
  matrix.forEach((row) => {
    row.forEach((element) => {
      array.push(element);
    });
  });
  return array;
};

export const arrayToMatrix = (array: any[]) => {
  // fills board with rows
  const board: Square[][] = [];
  while (board.length < DIMENSION) {
    // fills row with squares
    const row: Square[] = [];
    while (row.length < DIMENSION) {
      const square = array[board.length * DIMENSION + row.length];
      row.push(square);
    }
    board.push(row);
  }
  return board;
};

export const hasUserWon = (squares: Square[]) => {
  const lines = [
    // ----
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // |
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // diagonall
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let line of lines) {
    const [a, b, c, d] = line;
    const squareAHappened = squares[a].happened;
    if (
      squareAHappened &&
      squareAHappened === squares[b].happened &&
      squareAHappened === squares[c].happened &&
      squareAHappened === squares[d].happened
    ) {
      return true;
    }
  }
  return null;
};
