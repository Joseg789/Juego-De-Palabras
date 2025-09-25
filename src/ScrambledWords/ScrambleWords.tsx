// ! Importante:
// Es necesario componentes de Shadcn/ui
// https://ui.shadcn.com/docs/installation/vite

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SkipForward, Play } from "lucide-react";
import confetti from "canvas-confetti"; // Importa la librería de confeti instalamos tambien los types con npm i -D @types/canvas-confetti

// Lista de palabras para el juego (EN MAYUSCULAS) PALABRAS VENEZOLANAS pueden ser cualquier palabra

//esto podria ir en un archivo JSON o en una base de datos
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

export const ScrambleWords = () => {
  const [words, setWords] = useState(shuffleArray(GAME_WORDS));

  const [currentWord, setCurrentWord] = useState(words[0]);
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(currentWord));
  const [guess, setGuess] = useState("");
  const [points, setPoints] = useState(0);
  const [errorCounter, setErrorCounter] = useState(0);
  const [maxAllowErrors] = useState(3);

  const [skipCounter, setSkipCounter] = useState(0);
  const [maxSkips] = useState(3);

  const [isGameOver, setIsGameOver] = useState(false);

  // Previene el  de la página
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (errorCounter === maxAllowErrors) {
      setIsGameOver(true);

      return;
    }

    if (!isGameOver && guess === currentWord) {
      //si adivinamos la palabra
      //eliminamos la palabra que ya adivinamosS
      // const newWords = words.filter((word) => word !== guess); //ASI SE PODRÍA HACER CON FILTER

      //DISPARAMOS UN CONFETI AQUÍ
      confetti({
        particleCount: 100, //número de partículas
        spread: 120, //ángulo de dispersión + grande mas se dispersan
        origin: { y: 0.6 }, // 60% es origen del confeti (0.6 es un poco más abajo del centro)
      });

      //actualizamos los stats
      const newWords = words.slice(1); //ASI ES MEJOR, SIMPLEMENTE CORTAMOS EL PRIMER ELEMENTO
      console.log(newWords);
      setPoints(points + 1);
      setWords(shuffleArray(newWords));
      setCurrentWord(newWords[0]);
      setScrambledWord(scrambleWord(newWords[0]));
      setGuess("");

      return;
    }
    //si no adivinamos la palabra contamos los errores
    setErrorCounter(errorCounter + 1);
    setGuess("");
    //evaluamos si ya llegamos al máximo de errores permitidos
    if (errorCounter + 1 === maxAllowErrors) {
      setIsGameOver(true); //si llegamos al máximo de errores se acaba el juego
    }
  };

  const handleSkip = () => {
    if (skipCounter >= maxSkips) {
      return; //no se puede saltar más
    }

    //eliminamos la palabra
    // const newWords = words.filter((word) => word !== guess);
    //splice
    const newWords = words.slice(1); //ASI ES MEJOR, SIMPLEMENTE CORTAMOS EL PRIMER ELEMENTO

    setSkipCounter(skipCounter + 1);
    setWords(shuffleArray(newWords));
    setGuess("");
    setCurrentWord(newWords[0]);
    setScrambledWord(scrambleWord(newWords[0]));
  };

  const handlePlayAgain = () => {
    //REINICIALIZAMOS EL JUEGO
    setIsGameOver(false);
    setWords(shuffleArray(GAME_WORDS));
    setSkipCounter(0);
    setPoints(0);
    setCurrentWord(GAME_WORDS[0]);
    setScrambledWord(scrambleWord(GAME_WORDS[0]));
    setErrorCounter(0);
    setGuess("");
  };

  //! Si ya no hay palabras para jugar, se muestra el mensaje de fin de juego
  if (words.length === 0) {
    // Juego terminado, no hay más palabras
    //confetti de celebración
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntaje: {points}</div>
          <br />
          <div>Errores: {errorCounter}</div>
          <br />
          <div>Saltos: {skipCounter}</div>
          <br />
          <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras Venezolanas
          </h1>
          <p className="text-gray-600">
            ordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* Main Game Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Scrambled Word Display */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {errorCounter === maxAllowErrors && (
                  <span className="text-red-500 text-xl">{currentWord}</span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Guess Input */}

            <form onSubmit={handleGuessSubmit} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guess"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adivina la palabra
                  </label>
                  <Input
                    id="guess"
                    type="text"
                    value={guess}
                    onChange={(e) =>
                      setGuess(e.target.value.toUpperCase().trim())
                    }
                    placeholder="Ingresa tu palabra..."
                    className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                    maxLength={scrambledWord.length}
                    disabled={isGameOver}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || errorCounter === maxAllowErrors}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {points} / {GAME_WORDS.length}
                </div>
                <div className="text-sm text-green-700 font-medium">Puntos</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-700 font-medium">Errores</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                disabled={
                  errorCounter === maxAllowErrors || skipCounter >= maxSkips
                }
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>
              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <footer>
            <div className=" text-center py-4 mt-8 border-t border-slate-200 box-shadow-sm text-xl">
              <p>&copy; 2025 Juego De Palabras. By Jose Sanchez.</p>
              <a
                className=" hover:text-blue-500"
                href="https://github.com/joseg789"
              >
                GitHub
              </a>
              <span className="mx-2">|</span>
              <a
                className=" hover:text-blue-500"
                href="https://www.linkedin.com/in/jose-sanchez-8a11b0314/"
              >
                LinkedIn
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
