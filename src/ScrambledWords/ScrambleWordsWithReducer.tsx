//!------------------------------------------------------------------------------------------------
//!------------------------------------------------------------------------------------------------
//! INSTRUCCIONES PARA CREAR EL PROYECTO DESDE CERO
//SI CREAS EL PROYECTO DESDE CERO CON VITE + REACT + TYPESCRIPT
// npm create vite@latest my-react-app -- --template react-ts
// cd my-react-app
// npm install
// npm run dev

// ! Importante: creando el proyecto con Vite + React + TypeScript usamos shadcn/ui
// Es necesario componentes de Shadcn/ui
// https://ui.shadcn.com/docs/installation/ (usar TailwindCSS)
// EN MIS REPOSITORIOS DE GITHUB TIENES UN EJEMPLO DE CÓMO INSTALAR SHADCN/UI Y TAILWINDCSS

//! También es necesario instalar la librería de confetti
// npm install canvas-confetti
// npm i -D @types/canvas-confetti (para tener los tipos de TypeScript)
//!------------------------------------------------------------------------------------------------
//!------------------------------USO DE DISPATCH -------------------------------------------------
//!------------------------------------------------------------------------------------------------

///! ****SI DESCARGASTE O CLONASTE EL PROYECTO, ASEGÚRATE DE CORRER npm install *****
//!para instalar las dependencias

//! Este archivo es una versión que no usa useReducer ni el reducer
//! El archivo ScrambleWordswithReducer.ts usa el reducer y useReducer para manejar el estado
//!este es un ejemplo para comparar ambos enfoques aqui usamos useState para manejar el estado
//! y en el otro archivo usamos useReducer y un reducer para manejar el estado

// ***en este archivo aprenderemos a usar los dispatchers del reducer para actualizar el estado

//!haremos otro archivo donde eliminaremos lo mas posible la logica del componente y la pondremos en el reducer
//!haremos otro archivo donde eliminaremos lo mas posible la logica del componente y la pondremos en el reducer

import React, { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SkipForward, Play } from "lucide-react";
import confetti from "canvas-confetti"; // Importa la librería de confeti instalamos tambien los types con npm i -D @types/canvas-confetti
import {
  getInitialState,
  scrambleWordsReducer,
} from "@/reducers/scrambleWordsReducer";

// Lista de palabras para el juego (EN MAYUSCULAS) PALABRAS VENEZOLANAS pueden ser cualquier palabra

export const ScrambleWordsWithReducer = () => {
  //obtenemos los datos de nuestro reducer
  const [state, dispatch] = useReducer(scrambleWordsReducer, getInitialState());
  const {
    currentWord,
    errorCounter,
    isGameOver,
    guess,
    maxAllowErrors,
    maxSkips,
    points,
    scrambledWord,
    skipCounter,
    words,
    totalWords,
  } = state;

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //s no hay palabras o el juego ha terminado, no hacemos nada

    if (!isGameOver && guess === currentWord) {
      //DISPARAMOS UN CONFETI AQUÍ
      confetti({
        particleCount: 100, //número de partículas
        spread: 120, //ángulo de dispersión + grande mas se dispersan
        origin: { y: 0.6 }, // 60% es origen del confeti (0.6 es un poco más abajo del centro)
      });

      //actualizamos los stats
      const newWords = words.slice(1); //eliminamos la palabra actual porque siempre es la primera del arreglo
      dispatch({ type: "SET_WORDS", payload: newWords });
      dispatch({ type: "SET_CURRENT_WORD", payload: newWords[0] });
      dispatch({ type: "SET_POINTS", payload: points + 1 });
      dispatch({ type: "SET_GUESS", payload: "" }); //limpiamos el input
      dispatch({
        type: "SET_SCRAMBLED_WORD",
        payload: newWords[0],
      });
      if (words.length === 0) {
        dispatch({ type: "SET_IS_GAME_OVER", payload: true });
        return; //salimos de la función
      }
      return; //salimos de la función
    } //si no es correcta la adivinanza
    //incrementamos el contador de errores

    dispatch({ type: "SET_ERROR_COUNTER", payload: errorCounter + 1 });

    //evaluamos si ya llegamos al máximo de errores permitidos
    if (errorCounter + 1 === maxAllowErrors) {
      // setIsGameOver(true); //si llegamos al máximo de errores se acaba el juego
      dispatch({ type: "SET_IS_GAME_OVER", payload: true });
    }
    //limpiamos el input
    dispatch({ type: "SET_GUESS", payload: "" }); //limpiamos el input
  }; //fin handleGuessSubmit

  const handleSkip = () => {
    if (skipCounter >= maxSkips) {
      return; //no se puede saltar más
    }
    //incrementamos el contador de saltos
    dispatch({ type: "SET_SKIP_COUNTER", payload: skipCounter + 1 });
    //eliminamos la palabra actual
    const newWords = words.slice(1); //eliminamos la primera palabra del arreglo
    dispatch({ type: "SET_WORDS", payload: newWords });
    dispatch({ type: "SET_CURRENT_WORD", payload: newWords[0] });
    dispatch({
      type: "SET_SCRAMBLED_WORD",
      payload: newWords[0],
    });
    dispatch({ type: "SET_GUESS", payload: "" }); //limpiamos el input
  }; //fin handleSkip

  //eliminamos la palabra

  const handlePlayAgain = () => {
    //REINICIALIZAMOS EL JUEGO
    const initialState = getInitialState(); //obtenemos el estado inicial
    //seteamos el estado inicial
    dispatch({ type: "SET_WORDS", payload: initialState.words });
    dispatch({
      type: "SET_CURRENT_WORD",
      payload: initialState.currentWord,
    });
    dispatch({ type: "SET_POINTS", payload: 0 });
    dispatch({ type: "SET_ERROR_COUNTER", payload: 0 });
    dispatch({ type: "SET_SKIP_COUNTER", payload: 0 });
    dispatch({ type: "SET_IS_GAME_OVER", payload: false });
    dispatch({ type: "SET_GUESS", payload: "" });
    dispatch({
      type: "SET_SCRAMBLED_WORD",
      payload: initialState.scrambledWord,
    });
  }; //fin handlePlayAgain

  // Si el juego ha terminado, mostramos el mensaje de fin de juego
  if (isGameOver || words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Juego Terminado
          </h1>
          <p className="text-gray-600">Vuelve a Jugar!!</p>
          <br />
          <div>
            Puntaje: {points}/{totalWords}
          </div>
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
            Ordena las letras para encontrar la palabra!
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
                      // setGuess(e.target.value.toUpperCase().trim())
                      //!cada vez que hagamos un setstate lo cambiamos por un dispatch
                      dispatch({ type: "SET_GUESS", payload: e.target.value })
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
                  {points} / {totalWords}
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
  ); //fin return
}; //fin componente
