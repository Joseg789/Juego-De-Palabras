type Props = {
  points: number;
  totalWords: number;
  errorCounter: number;
  maxAllowErrors: number;
};

function Stats({ points, totalWords, errorCounter, maxAllowErrors }: Props) {
  return (
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
  );
}

export default Stats;
