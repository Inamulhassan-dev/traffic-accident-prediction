import { useState } from "react";
import { getDriverProfile } from "../services/api";

export default function DriverRiskProfile() {
  const [age, setAge] = useState(30);
  const [alcohol, setAlcohol] = useState("No");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const response = await getDriverProfile({ age, alcohol });
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to get driver profile:", error);
      alert("Failed to analyze driver profile");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === "Low Risk") return "var(--green)";
    if (level === "Moderate Risk") return "var(--orange)";
    return "var(--red)";
  };

  const getRiskIcon = (risk) => {
    if (risk === "Low") return "✅";
    if (risk === "Medium") return "⚠️";
    if (risk === "High") return "🔴";
    return "🚨";
  };

  return (
    <div className="driver-profile-container">
      <div className="glass-panel" style={{ padding: "24px" }}>
        <div className="section-header">
          <div className="section-icon">👤</div>
          <div>
            <div className="section-title">Driver Risk Profile</div>
            <div className="section-subtitle">Analyze driver-specific risk factors</div>
          </div>
        </div>

        <div className="driver-input-grid">
          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">🎂</span>
              Driver Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="form-input"
              min="16"
              max="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="form-label-icon">🍺</span>
              Alcohol Involvement
            </label>
            <select
              value={alcohol}
              onChange={(e) => setAlcohol(e.target.value)}
              className="form-select"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="predict-btn"
          style={{ marginTop: "16px" }}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Analyzing...
            </>
          ) : (
            "🔍 Analyze Driver Risk"
          )}
        </button>
      </div>

      {profile && (
        <div className="glass-panel animate-slide-up" style={{ padding: "24px", marginTop: "24px" }}>
          <div className="risk-profile-header">
            <div className="risk-profile-score">
              <div className="risk-score-circle" style={{ borderColor: getRiskColor(profile.risk_level) }}>
                <div className="risk-score-value" style={{ color: getRiskColor(profile.risk_level) }}>
                  {profile.risk_score}
                </div>
                <div className="risk-score-label">Risk Score</div>
              </div>
            </div>

            <div className="risk-profile-summary">
              <div className="risk-level-badge" style={{ 
                background: `${getRiskColor(profile.risk_level)}20`,
                border: `2px solid ${getRiskColor(profile.risk_level)}40`,
                color: getRiskColor(profile.risk_level)
              }}>
                {profile.risk_level}
              </div>
              <div className="risk-recommendation">
                💡 {profile.recommendation}
              </div>
            </div>
          </div>

          <div className="risk-factors-list">
            <h4 style={{ 
              fontSize: "14px", 
              fontWeight: "700", 
              color: "var(--text-primary)", 
              marginBottom: "12px" 
            }}>
              Risk Factors Analysis
            </h4>

            {profile.risk_factors.map((factor, idx) => (
              <div key={idx} className="driver-risk-factor">
                <div className="driver-risk-icon">
                  {getRiskIcon(factor.risk)}
                </div>
                <div className="driver-risk-content">
                  <div className="driver-risk-header">
                    <span className="driver-risk-name">{factor.factor}</span>
                    <span className={`driver-risk-badge ${factor.risk.toLowerCase()}`}>
                      {factor.risk}
                    </span>
                  </div>
                  <div className="driver-risk-desc">{factor.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
