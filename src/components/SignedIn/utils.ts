import { Square, SquareDraft } from "../../interfaces";

const data: SquareDraft[] = [
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
  {
    event: "Bestemor og Bestefar kjefter på hverandre",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestemor og Bestefar kjefter på barna sine",
    instantWin: false,
    happened: false,
  },
  {
    event: "Pappa sier 'lat som dere har det bra!'",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar sier honeybun!",
    instantWin: false,
    happened: false,
  },
  {
    event: "Mer enn et bilde blir tatt på to min (forskjellige steder)",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar sier 'aaaaaaghhh!'",
    instantWin: false,
    happened: false,
  },
];

export const generateBoard = () => {
  const board: Square[] = [];
  let i = 0;
  while (board.length < DIMENSION ** 2) {
    const randomSquare: Square = data[Math.floor(Math.random() * data.length)];
    if (board.find((square) => square === randomSquare)) continue;
    randomSquare.index = i;
    i++;
    board.push(randomSquare);
  }
  return board;
};

export const DIMENSION = 4;
