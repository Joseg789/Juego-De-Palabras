//DEFINIMOS EL ESTADO e interfaces
export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  isGameOver: boolean;
  guess: string;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}
