import { Square } from "../../interfaces";

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
