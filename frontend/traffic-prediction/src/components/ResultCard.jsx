export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div
      key={result.timestamp}
      className="mt-8 p-6 bg-white shadow-xl rounded-xl border-l-4 border-indigo-500"
    >
      <h2 className="text-xl font-bold mb-3 text-gray-700">
        Prediction Result
      </h2>

      <p className="text-lg">
        Severity:
        <span className="ml-2 font-bold text-indigo-600">
          {result.severity}
        </span>
      </p>
    </div>
  );
}