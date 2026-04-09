import { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-4">
          🚦 Traffic Accident Predictor
        </h1>

        <PredictionForm setResult={setResult} />
        <ResultCard result={result} />

      </div>
    </div>
  );
}