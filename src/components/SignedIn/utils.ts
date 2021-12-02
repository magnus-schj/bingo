import { Square } from "../../interfaces";

const data: Square[] = [
  { event: "X tar bilder", instantWin: false },
  { event: "En runde til", instantWin: false },
  { event: "Liv Annika blir lei ", instantWin: false },
  {
    event: "X kommanderer folk i bildeproduksjon",
    instantWin: false,
  },
];

export const generateBoard = () => {
  const board: Square[] = [];
  while (board.length < 4) {
    const randomSquare = data[Math.floor(Math.random() * data.length)];
    if (board.find((square) => square === randomSquare)) continue;
    board.push(randomSquare);
  }
  return board;
};
