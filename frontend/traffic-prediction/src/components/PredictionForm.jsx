import { useState, useMemo } from "react";
import { predictAccident } from "../services/api";

const FIELD_CONFIG = [
  {
    name: "Time of Day",
    icon: "🕐",
    type: "select",
    options: ["Morning", "Afternoon", "Evening", "Night"],
    default: "Morning",
    riskValues: { Night: "high", Evening: "medium" },
  },
  {
    name: "Weather Conditions",
    icon: "🌤️",
    type: "select",
    options: ["Clear", "Rainy", "Fog"],
    default: "Clear",
    riskValues: { Rainy: "high", Fog: "high" },
  },
  {
    name: "Road Type",
    icon: "🛣️",
    type: "select",
    options: ["Highway", "Urban", "Rural"],
    default: "Highway",
    riskValues: { Rural: "medium" },
  },
  {
    name: "Road Condition",
    icon: "🚧",
    type: "select",
    options: ["Dry", "Wet"],
    default: "Dry",
    riskValues: { Wet: "high" },
  },
  {
    name: "Lighting Conditions",
    icon: "💡",
    type: "select",
    options: ["Daylight", "Dark"],
    default: "Daylight",
    riskValues: { Dark: "high" },
  },
  {
    name: "Traffic Control Presence",
    icon: "🚦",
    type: "select",
    options: ["Yes", "No"],
    default: "Yes",
    riskValues: { No: "medium" },
  },
  {
    name: "Speed Limit (km/h)",
    icon: "⚡",
    type: "number",
    default: 60,
    placeholder: "e.g. 60",
  },
  {
    name: "Driver Age",
    icon: "👤",
    type: "number",
    default: 30,
    placeholder: "e.g. 30",
  },
  {
    name: "Alcohol Involvement",
    icon: "🍺",
    type: "select",
    options: ["No", "Yes"],
    default: "No",
    fullSpan: true,
    riskValues: { Yes: "critical" },
  },
];

export default function PredictionForm({ onResult }) {
  const [loading, setLoading] = useState(false);

  const initialData = {};
  FIELD_CONFIG.forEach((f) => {
    initialData[f.name] = f.default;
  });

  const [formData, setFormData] = useState(initialData);

  // Calculate real-time risk indicators
  const riskIndicators = useMemo(() => {
    const indicators = {};

    FIELD_CONFIG.forEach((field) => {
      if (field.riskValues) {
        const val = String(formData[field.name]);
        if (field.riskValues[val]) {
          indicators[field.name] = field.riskValues[val];
        }
      }
    });

    // Custom checks for numeric fields
    const speed = parseInt(formData["Speed Limit (km/h)"]) || 0;
    if (speed > 100) indicators["Speed Limit (km/h)"] = "high";
    else if (speed > 80) indicators["Speed Limit (km/h)"] = "medium";

    const age = parseInt(formData["Driver Age"]) || 30;
    if (age < 20 || age > 65) indicators["Driver Age"] = "medium";

    return indicators;
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await predictAccident(formData);
      onResult(response.data, formData);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("⚠️ Prediction failed! Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const riskLabelMap = {
    critical: "⚠ CRITICAL",
    high: "⚠ HIGH",
    medium: "⬆ MEDIUM",
    low: "✓ LOW",
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid stagger-children">
      {FIELD_CONFIG.map((field) => (
        <div
          className={`form-group animate-fade-scale ${field.fullSpan ? "full-span" : ""}`}
          key={field.name}
        >
          <label className="form-label">
            <span className="form-label-icon">{field.icon}</span>
            {field.name}
          </label>

          {/* Risk Indicator Badge */}
          {riskIndicators[field.name] && (
            <div className={`risk-indicator ${riskIndicators[field.name]}`}>
              {riskLabelMap[riskIndicators[field.name]]}
            </div>
          )}

          {field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="form-select"
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="form-input"
              min={field.name === "Driver Age" ? 16 : 10}
              max={field.name === "Driver Age" ? 100 : 300}
            />
          )}
        </div>
      ))}

      {/* Submit Button */}
      <div className="full-span">
        <button type="submit" disabled={loading} className="predict-btn">
          {loading ? (
            <>
              <span className="spinner" />
              Analyzing Conditions...
            </>
          ) : (
            "🚀 Predict Accident Severity"
          )}
        </button>
      </div>
    </form>
  );
}