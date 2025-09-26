import type { ScrambleWordsState } from "@/interfaces/interfaces";
import { scrambleWord } from "../helpers/helpers";

export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "SKIP_WORD"; payload: string }
  | { type: "CHECK_ANSWER" } //sin payload
  | { type: "PLAY_AGAIN"; payload: ScrambleWordsState }; //el payload es el estado inicial

export const scrambleWordsReducerClean = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return { ...state, guess: action.payload.trim().toUpperCase() };

    case "SKIP_WORD":
      if (state.skipCounter >= state.maxSkips) {
        return state; //no se puede saltar más si no hacemos nada siempre retornamos el state actual
      }
      const newWords = state.words.slice(1); //eliminamos la primera palabra del arreglo
      return {
        ...state, //siempre retornamos un nuevo estado
        words: newWords, //eliminamos la palabra actual
        currentWord: newWords[0], //la nueva palabra actual es la siguiente
        scrambledWord: scrambleWord(newWords[0]), //mezclamos la nueva palabra
        guess: "", //limpiamos el input
        skipCounter: state.skipCounter + 1, //aumentamos el contador de saltos
      };

    case "CHECK_ANSWER": //verificamos la respuesta
      if (state.guess === state.currentWord) {
        const newWords = state.words.slice(1); //eliminamos la primera palabra del arreglo
        return {
          ...state, //siempre retornamos un nuevo estado
          points: state.points + 1, //aumentamos los puntos
          words: newWords, //eliminamos la palabra actual
          currentWord: newWords[0], //la nueva palabra actual es la siguiente
          scrambledWord: scrambleWord(newWords[0]), //mezclamos la nueva palabra
          guess: "", //limpiamos el input
        };
      } else {
        return {
          ...state,
          errorCounter: state.errorCounter + 1, //aumentamos el contador de errores
          isGameOver: state.errorCounter + 1 >= state.maxAllowErrors, //si llegamos al maximo de errores, el juego termina
          guess: "", //limpiamos el input
        }; //aumentamos el contador de errores y limpiamos el input
      }

    case "PLAY_AGAIN":
      return action.payload; //devolvemos el estado inicial
    default:
      return state;
  }
};
