import RiskGauge from "./RiskGauge";

export default function ResultCard({ result }) {
  if (!result) return null;

  const severityClass = result.severity.toLowerCase();
  const severityEmoji = {
    Minor: "🟢",
    Serious: "🟡",
    Fatal: "🔴",
  };

  return (
    <div className="animate-fade-scale">
      {/* Severity Badge */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div className={`severity-badge ${severityClass}`}>
          {severityEmoji[result.severity] || "⚪"} {result.severity} Severity
        </div>
      </div>

      {/* Risk Gauge */}
      <RiskGauge
        riskScore={result.risk_score || 0}
        severity={result.severity}
      />

      {/* Confidence Bars */}
      {result.confidence && (
        <div className="confidence-grid">
          <ConfidenceBar
            label="Minor"
            value={result.confidence.Minor || 0}
            type="minor"
          />
          <ConfidenceBar
            label="Serious"
            value={result.confidence.Serious || 0}
            type="serious"
          />
          <ConfidenceBar
            label="Fatal"
            value={result.confidence.Fatal || 0}
            type="fatal"
          />
        </div>
      )}

      {/* Risk Factors */}
      {result.risk_factors && result.risk_factors.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ⚡ Active Risk Factors
          </div>
          {result.risk_factors.map((factor, idx) => (
            <div className="risk-factor-item" key={idx}>
              <div className={`risk-factor-icon ${factor.level}`}>
                {factor.level === "critical"
                  ? "🔴"
                  : factor.level === "high"
                  ? "🟠"
                  : "🟡"}
              </div>
              <div>
                <div className="risk-factor-name">{factor.factor}</div>
                <div className="risk-factor-tip">{factor.tip}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feature Importance */}
      {result.feature_importance && result.feature_importance.length > 0 && (
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-glass)" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🎯 Key Contributing Factors
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {result.feature_importance.map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ 
                  width: "140px", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  color: "var(--text-secondary)" 
                }}>
                  {item.feature}
                </div>
                <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", overflow: "hidden" }}>
                  <div style={{ 
                    width: `${item.importance}%`, 
                    height: "100%", 
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)", 
                    borderRadius: "100px",
                    transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)"
                  }} />
                </div>
                <div style={{ 
                  width: "45px", 
                  textAlign: "right", 
                  fontSize: "12px", 
                  fontWeight: 700, 
                  color: "var(--text-primary)" 
                }}>
                  {item.importance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Level Badge */}
      {result.risk_level && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div style={{ 
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: 700,
            background: result.risk_level === "Low" ? "rgba(34, 197, 94, 0.15)" : 
                       result.risk_level === "Medium" ? "rgba(249, 115, 22, 0.15)" : 
                       "rgba(239, 68, 68, 0.15)",
            color: result.risk_level === "Low" ? "var(--green)" : 
                   result.risk_level === "Medium" ? "var(--orange)" : 
                   "var(--red)",
            border: `2px solid ${result.risk_level === "Low" ? "rgba(34, 197, 94, 0.3)" : 
                                 result.risk_level === "Medium" ? "rgba(249, 115, 22, 0.3)" : 
                                 "rgba(239, 68, 68, 0.3)"}`
          }}>
            Overall Risk: {result.risk_level}
          </div>
        </div>
      )}
    </div>
  );
}

function ConfidenceBar({ label, value, type }) {
  return (
    <div className="confidence-item">
      <div className="confidence-label">{label}</div>
      <div className="confidence-bar-bg">
        <div
          className={`confidence-bar-fill ${type}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <div className="confidence-value">{value}%</div>
    </div>
  );
}