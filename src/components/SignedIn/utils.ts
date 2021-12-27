import { Square, SquareDraft } from "../../interfaces";

// data and function for making a board
const data: SquareDraft[] = [
  { event: "X tar bilder", instantWin: false, happened: false },
  { event: "'En runde til'", instantWin: false, happened: false },
  { event: "Liv Annika blir lei", instantWin: false, happened: false },
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
    event: "Bestefar og pappa blir stikk uenige om noe",
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
    event: "Bjørn sier 'lat som dere har det bra!'",
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
  {
    event: "Magnus imiterer noen",
    instantWin: false,
    happened: false,
  },
  {
    event: "Pappa snakker med lys stemme",
    instantWin: false,
    happened: false,
  },
  {
    event: "De krangler om regninga",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bjørn maser på noe som allerede blir gjort",
    instantWin: false,
    happened: false,
  },
  {
    event: "Noen bruker uno-reverse card på foreldrene sine",
    instantWin: false,
    happened: false,
  },
  {
    event: "Randi tar en drink før 12",
    instantWin: false,
    happened: false,
  },
  {
    event: "Randi reiser seg før hun har sittet i 1 minutt",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestefar bruker lang tid på do",
    instantWin: false,
    happened: false,
  },
  {
    event: "Vi er 15+ min forsinket",
    instantWin: false,
    happened: false,
  },
  {
    event: "'Se på dataen!'",
    instantWin: false,
    happened: false,
  },
  {
    event: "Bestemor/Bestefar diskuterer klimakrisen med Bjørn",
    instantWin: false,
    happened: false,
  },
  {
    event: "EN kommentar fra Magnus fører til WW3",
    instantWin: false,
    happened: false,
  },
  {
    event: "vaksineskepsis",
    instantWin: false,
    happened: false,
  },
  {
    event: "Maia blir sur pga en vits",
    instantWin: false,
    happened: false,
  },
  {
    event: "De voksne synger en sang under middagen",
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
