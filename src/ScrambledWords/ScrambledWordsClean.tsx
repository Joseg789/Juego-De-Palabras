//!------------------------------------------------------------------------------------------------
//!------------------------------Componenete Limpio de logica  y refactorizado-------------------------------------------------
//!------------------------------------------------------------------------------------------------

import React, { useReducer } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getInitialState } from "@/helpers/helpers";
import { scrambleWordsReducerClean } from "@/reducers/scrambleWordsReducerClean";
import Footer from "@/shared/components/Footer";
import confetti from "canvas-confetti";
import ActionButtons from "./ActionButtons";
import Form from "./Form";
import GameOver from "./GameOver";
import ScrambledLayout from "./ScrambledLayout";
import Stats from "./Stats";

export const ScrambleWordsWithReducerClean = () => {
  const [state, dispatch] = useReducer(
    scrambleWordsReducerClean,
    getInitialState()
  );
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
    dispatch({ type: "CHECK_ANSWER" });
    //lanzamos confetti si la respuesta es correcta
    if (guess === currentWord) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP_WORD", payload: currentWord });
  };

  const handlePlayAgain = () => {
    //REINICIALIZAMOS EL JUEGO
    dispatch({ type: "PLAY_AGAIN", payload: getInitialState() }); //devolvemos el estado inicial
  };

  // Si el juego ha terminado o no hay más palabras, mostramos el mensaje de fin de juego
  if (isGameOver || words.length === 0) {
    return (
      //retornamoes el componente GameOver
      <GameOver
        points={points} //LE PASAMOS LAS PROPS AL COMPONENTE GAMEOVER DE NUESTRO ESTADO
        totalWords={totalWords}
        errorCounter={errorCounter}
        skipCounter={skipCounter}
        handlePlayAgain={handlePlayAgain}
      ></GameOver>
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
            <ScrambledLayout
              currentWord={currentWord}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
              scrambledWord={scrambledWord}
            />

            {/* Guess Input */}
            <Form
              guess={guess}
              dispatch={dispatch}
              handleGuessSubmit={handleGuessSubmit}
              scrambledWord={scrambledWord}
              isGameOver={isGameOver}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
            ></Form>

            {/* Stats */}
            <Stats
              points={points}
              totalWords={totalWords}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
            />

            {/* Action Buttons */}
            <ActionButtons
              handleSkip={handleSkip}
              handlePlayAgain={handlePlayAgain}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
              skipCounter={skipCounter}
              maxSkips={maxSkips}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  ); //fin return
}; //fin componente
