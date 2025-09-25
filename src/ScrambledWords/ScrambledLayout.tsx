type Props = {
  currentWord: string;
  errorCounter: number;
  maxAllowErrors: number;
  scrambledWord: string;
};

function ScrambledLayout({
  currentWord,
  errorCounter,
  maxAllowErrors,
  scrambledWord,
}: Props) {
  return (
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
  );
}

export default ScrambledLayout;
