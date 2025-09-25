import { G_WORDS } from "@/data/words";
import type { ScrambleWordsState } from "../reducers/scrambleWordsReducer";

export const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
export const scrambleWord = (word: string = "") => {
  return word
    .split("") //separa la palabra en un arreglo de letras
    .sort(() => Math.random() - 0.5) //mezcla el arreglo de letras
    .join(""); //une el arreglo de letras en una palabra
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray([...G_WORDS]); //copiamos el arreglo para no modificar el original
  const firstWord = shuffledWords[0]; //tomamos la primera palabra del arreglo mezclado
  return {
    currentWord: firstWord, //la palabra actual es la primera del arreglo mezclado
    errorCounter: 0, //contadores inician  en 0
    isGameOver: false,
    guess: "",
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(firstWord), //mezclamos las letras de la primera palabra
    skipCounter: 0,
    words: shuffledWords, //arreglo de palabras mezcladas
    totalWords: shuffledWords.length, //total de palabras en el juego
  };
};
