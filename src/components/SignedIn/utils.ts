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
  {
    event: "Besterfar ranter om kontroll fra staten",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestemor blir drittlei av å bli tatt bilde av",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestemor ragequiter det vi holder på med",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar og Bjørn er uenige om hvilken vei som er best",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar og pappa blir uenige om noe annet",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar klager på veien",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar kjefter på noen",
    instantWin: false,
    happened: false,
  },
  {
    event: "Samme bilde, annet kamera/person",
    instantWin: false,
    happened: false,
  },
];

export const generateBoard = () => {
  const board: Square[] = [];
  let i = 0;
  while (board.length < 9) {
    const randomSquare = data[Math.floor(Math.random() * data.length)];
    if (board.find((square) => square === randomSquare)) continue;
    randomSquare.index = i;
    i++;
    board.push(randomSquare);
  }
  return board;
};
