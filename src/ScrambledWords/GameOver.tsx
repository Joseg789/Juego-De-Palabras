import { Button } from "@/components/ui/button";

type Props = {
  points: number;
  totalWords: number;
  errorCounter: number;
  skipCounter: number;
  handlePlayAgain: () => void;
};

function GameOver({
  points,
  totalWords,
  errorCounter,
  skipCounter,
  handlePlayAgain,
}: Props) {
  return (
    <>
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
    </>
  );
}

export default GameOver;
