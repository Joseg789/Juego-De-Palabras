import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  guess: string;
  dispatch: React.Dispatch<any>;
  handleGuessSubmit: (e: React.FormEvent) => void;
  scrambledWord: string;
  isGameOver: boolean;
  errorCounter: number;
  maxAllowErrors: number;
};

function Form({
  guess,
  dispatch,
  handleGuessSubmit,
  scrambledWord,
  isGameOver,
  errorCounter,
  maxAllowErrors,
}: Props) {
  return (
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
  );
}

export default Form;
