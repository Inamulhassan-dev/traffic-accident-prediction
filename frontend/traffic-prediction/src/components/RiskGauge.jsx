import { useState, useEffect } from "react";

export default function RiskGauge({ riskScore, severity }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score from 0 to final value
    const timer = setTimeout(() => {
      setAnimatedScore(Math.min(riskScore, 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [riskScore]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;
  const offset = circumference - progress;

  const getColor = () => {
    if (severity === "Fatal") return "#ef4444";
    if (severity === "Serious") return "#eab308";
    return "#22c55e";
  };

  const getGlow = () => {
    if (severity === "Fatal") return "drop-shadow(0 0 12px rgba(239, 68, 68, 0.5))";
    if (severity === "Serious") return "drop-shadow(0 0 12px rgba(234, 179, 8, 0.5))";
    return "drop-shadow(0 0 12px rgba(34, 197, 94, 0.5))";
  };

  return (
    <div className="gauge-container">
      <div style={{ position: "relative", width: "180px", height: "180px" }}>
        <svg className="gauge-svg" viewBox="0 0 160 160" style={{ filter: getGlow() }}>
          <circle className="gauge-bg" cx="80" cy="80" r={radius} />
          <circle
            className="gauge-fill"
            cx="80"
            cy="80"
            r={radius}
            stroke={getColor()}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div className="gauge-percentage" style={{ color: getColor() }}>
            {Math.round(animatedScore)}
          </div>
          <div className="gauge-label">Risk Score</div>
        </div>
      </div>
    </div>
  );
}
