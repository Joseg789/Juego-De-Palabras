//reducer que recibe el estado actual y una acción, y devuelve un nuevo estado basado en la acción.
//Es una función pura que no modifica el estado original, sino que crea una copia modificada.

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

//PALABRAS VENEZOLANAS
//ESTO PODRIA IR EN UN ARCHIVO JSON O EN UNA BASE DE DATOS
///FUNCIONA CON CUALQUIER PALABRA
const GAME_WORDS = [
  // Lista de palabras para el juego (EN MAYUSCULAS) PALABRAS VENEZOLANAS
  "AREPA",
  "MONTAÑA",
  "SELVA",
  "ESTRELLA",
  "FIESTA",
  "CARTELUO",
  "CHINCHORRO",
  "PANA",
  "JEVA",
  "CHAMO",
  "CATIRA",
  "CHURRERO",
  "BECERRO",
  "CHIVO",
  "PUEBLO",
  "PEPON",
  "COLETO",
  "CACHAPA",
  "MORTADELA",
  "TACHIPIRIN",
  "AUYANTEPUI",
  "PARAGUANA",
  "YARACUY",
  "PARCHITA",
  "COCADA",
  "CHICHA",
  "PARGO",
  "CACHAMA",
  "TAMBOR",
  "CUATRO",
  "MORROCOY",
  "TRUJILLO",
  "TRIFULCA",
  "TEQUEÑO",
  "NAGUANAGUA",
  "BAILOTEO",
  "CULEBRA",
  "GUAYABA",
  "MELCOCHA",
  "PAPELON",
  "GUACHARO",
  "TAPARITA",
  "ZAMURO",
  "CULEBRILLA",
  "CACHICAMO",
  "GUAYABERA",
  "HALLACA",
  "MEREY",
  "MERENGADA",
  "AGUACERO",
  "MEREQUETENGUE",
  "CACHAPERA",
  "GENTIRIRIO",
  "PERINOLA",
  "HAMACA",
  "ÑAPA",
  "CHAMBEANDO",
  "CHAPARRON",
  "CARAOTA",
  "FURRUCO",
  "TROMPO",
  "CACHICAMO",
  "TUCACAS",
  "CANAIMA",
  "CHORONI",
  "MORICHAL",
  "COCOTERO",
];

//FUNCIONES DEL JUEGO
// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  //LE PASAMOS A SORT UNA FUNCIÓN QUE RETORNA UN NÚMERO ALEATORIO ENTRE -0.5 Y 0.5 PARA MEZCLAR EL ARREGLO
  //0.5 ES LA MITAD DE 1, ASÍ QUE HAY IGUAL PROBABILIDAD DE QUE SEA POSITIVO O NEGATIVO
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("") //separa la palabra en un arreglo de letras
    .sort(() => Math.random() - 0.5) //mezcla el arreglo de letras
    .join(""); //une el arreglo de letras en una palabra
};

export const getInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray([...GAME_WORDS]); //copiamos el arreglo para no modificar el original
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

//El reducer se utiliza con useReducer para manejar el estado complejo de la aplicación.

//DEFINIMOS LAS ACCIONES
export type ScrambleWordsAction =
  | { type: "SET_WORDS"; payload: string[] }
  | { type: "SET_CURRENT_WORD"; payload: string }
  | { type: "SET_POINTS"; payload: number }
  | { type: "SET_SKIP_COUNTER"; payload: number }
  | { type: "SET_ERROR_COUNTER"; payload: number }
  | { type: "SET_IS_GAME_OVER"; payload: boolean }
  | { type: "SET_GUESS"; payload: string }
  | { type: "SET_SCRAMBLED_WORD"; payload: string };

//IMPLEMENTAMOS EL REDUCER
//!SIEMPRE RECIBIMOS EL ESTADO Y LA ACCIÓN Y RETORNAMOS UN NUEVO ESTADO
export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction
) => {
  switch (action.type) {
    case "SET_WORDS":
      return { ...state, words: action.payload };
    case "SET_CURRENT_WORD":
      return { ...state, currentWord: action.payload };
    case "SET_POINTS":
      return { ...state, points: action.payload };
    case "SET_SKIP_COUNTER":
      return { ...state, skipCounter: action.payload };
    case "SET_ERROR_COUNTER":
      return { ...state, errorCounter: action.payload };
    case "SET_IS_GAME_OVER":
      return { ...state, isGameOver: action.payload };
    case "SET_GUESS":
      return { ...state, guess: action.payload.trim().toUpperCase() }; //convertimos a mayusculas y quitamos espacios
    case "SET_SCRAMBLED_WORD":
      return { ...state, scrambledWord: scrambleWord(action.payload) }; //mezclamos la palabra
    default:
      return state;
  }
};
