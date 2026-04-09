import { useState } from "react";
import { predictAccident } from "../services/api";

export default function PredictionForm({ setResult }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    "Time of Day": "Morning",
    "Weather Conditions": "Clear",
    "Road Type": "Highway",
    "Road Condition": "Dry",
    "Lighting Conditions": "Daylight",
    "Traffic Control Presence": "Yes",
    "Speed Limit (km/h)": 60,
    "Driver Age": 30,
    "Alcohol Involvement": "No"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setResult(null);

      const response = await predictAccident(formData);

      setResult({
        prediction: response.data.prediction,
        severity: response.data.severity,
        timestamp: Date.now()
      });

    } catch (error) {
      alert("Prediction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

      {/* Time */}
      <div>
        <label className="label">Time of Day</label>
        <select name="Time of Day" onChange={handleChange} className="input">
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </select>
      </div>

      {/* Weather */}
      <div>
        <label className="label">Weather Conditions</label>
        <select name="Weather Conditions" onChange={handleChange} className="input">
          <option>Clear</option>
          <option>Rainy</option>
          <option>Fog</option>
        </select>
      </div>

      {/* Road Type */}
      <div>
        <label className="label">Road Type</label>
        <select name="Road Type" onChange={handleChange} className="input">
          <option>Highway</option>
          <option>Urban</option>
          <option>Rural</option>
        </select>
      </div>

      {/* Road Condition */}
      <div>
        <label className="label">Road Condition</label>
        <select name="Road Condition" onChange={handleChange} className="input">
          <option>Dry</option>
          <option>Wet</option>
        </select>
      </div>

      {/* Lighting */}
      <div>
        <label className="label">Lighting Conditions</label>
        <select name="Lighting Conditions" onChange={handleChange} className="input">
          <option>Daylight</option>
          <option>Dark</option>
        </select>
      </div>

      {/* Traffic */}
      <div>
        <label className="label">Traffic Control Presence</label>
        <select name="Traffic Control Presence" onChange={handleChange} className="input">
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* Speed */}
      <div>
        <label className="label">Speed Limit (km/h)</label>
        <input
          type="number"
          name="Speed Limit (km/h)"
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Age */}
      <div>
        <label className="label">Driver Age</label>
        <input
          type="number"
          name="Driver Age"
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Alcohol */}
      <div className="md:col-span-2">
        <label className="label">Alcohol Involvement</label>
        <select name="Alcohol Involvement" onChange={handleChange} className="input">
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      {/* Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Predicting..." : "🚀 Predict Accident Severity"}
        </button>
      </div>

    </form>
  );
}