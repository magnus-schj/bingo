import { Square } from "../../interfaces";

const data: Square[] = [
  { event: "X tar bilder", instantWin: false, happened: false },
  { event: "En runde til", instantWin: false, happened: false },
  { event: "Liv Annika blir lei ", instantWin: false, happened: false },
  {
    event: "X kommanderer folk i bildeproduksjon",
    instantWin: false,
    happened: false,
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
