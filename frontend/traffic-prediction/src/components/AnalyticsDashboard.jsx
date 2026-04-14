import { useState, useEffect } from "react";
import { getAnalytics, getWeatherImpact } from "../services/api";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [weatherImpact, setWeatherImpact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [analyticsRes, weatherRes] = await Promise.all([
        getAnalytics(),
        getWeatherImpact()
      ]);
      setAnalytics(analyticsRes.data);
      setWeatherImpact(weatherRes.data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
        <div className="spinner" style={{ margin: "0 auto" }} />
        <p style={{ marginTop: "16px", color: "var(--text-muted)" }}>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>No analytics data available</p>
      </div>
    );
  }

  const { severity_distribution, avg_risk_score, time_patterns, high_risk_conditions } = analytics;

  return (
    <div className="analytics-container">
      {/* Overview Cards */}
      <div className="analytics-grid">
        <div className="glass-panel analytics-card">
          <div className="analytics-card-icon">📊</div>
          <div className="analytics-card-value">{analytics.total_predictions}</div>
          <div className="analytics-card-label">Total Predictions</div>
        </div>

        <div className="glass-panel analytics-card">
          <div className="analytics-card-icon">⚠️</div>
          <div className="analytics-card-value">{avg_risk_score}%</div>
          <div className="analytics-card-label">Avg Risk Score</div>
        </div>

        <div className="glass-panel analytics-card">
          <div className="analytics-card-icon">🔴</div>
          <div className="analytics-card-value">{severity_distribution.Fatal || 0}</div>
          <div className="analytics-card-label">Fatal Predictions</div>
        </div>

        <div className="glass-panel analytics-card">
          <div className="analytics-card-icon">🟡</div>
          <div className="analytics-card-value">{severity_distribution.Serious || 0}</div>
          <div className="analytics-card-label">Serious Predictions</div>
        </div>
      </div>

      {/* Severity Distribution */}
      <div className="glass-panel" style={{ padding: "24px", marginTop: "24px" }}>
        <div className="section-header">
          <div className="section-icon">📈</div>
          <div>
            <div className="section-title">Severity Distribution</div>
            <div className="section-subtitle">Breakdown of prediction outcomes</div>
          </div>
        </div>

        <div className="severity-bars">
          {Object.entries(severity_distribution).map(([severity, count]) => {
            const total = analytics.total_predictions;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            const colorClass = severity.toLowerCase();

            return (
              <div key={severity} className="severity-bar-item">
                <div className="severity-bar-header">
                  <span className="severity-bar-label">{severity}</span>
                  <span className="severity-bar-count">{count} ({percentage.toFixed(1)}%)</span>
                </div>
                <div className="severity-bar-bg">
                  <div 
                    className={`severity-bar-fill ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Patterns */}
      {time_patterns && Object.keys(time_patterns).length > 0 && (
        <div className="glass-panel" style={{ padding: "24px", marginTop: "24px" }}>
          <div className="section-header">
            <div className="section-icon">🕐</div>
            <div>
              <div className="section-title">Time-Based Patterns</div>
              <div className="section-subtitle">When accidents are most likely</div>
            </div>
          </div>

          <div className="time-pattern-grid">
            {Object.entries(time_patterns).map(([time, count]) => (
              <div key={time} className="time-pattern-card">
                <div className="time-pattern-icon">
                  {time === "Morning" ? "🌅" : time === "Afternoon" ? "☀️" : time === "Evening" ? "🌆" : "🌙"}
                </div>
                <div className="time-pattern-time">{time}</div>
                <div className="time-pattern-count">{count} predictions</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Impact */}
      {weatherImpact && (
        <div className="glass-panel" style={{ padding: "24px", marginTop: "24px" }}>
          <div className="section-header">
            <div className="section-icon">🌤️</div>
            <div>
              <div className="section-title">Weather Impact Analysis</div>
              <div className="section-subtitle">How weather affects accident severity</div>
            </div>
          </div>

          <div className="weather-impact-grid">
            {Object.entries(weatherImpact).map(([weather, data]) => {
              if (data.total === 0) return null;

              return (
                <div key={weather} className="weather-impact-card glass-panel">
                  <div className="weather-impact-header">
                    <span className="weather-impact-icon">
                      {weather === "Clear" ? "☀️" : weather === "Rainy" ? "🌧️" : "🌫️"}
                    </span>
                    <span className="weather-impact-name">{weather}</span>
                  </div>

                  <div className="weather-impact-stats">
                    <div className="weather-stat">
                      <div className="weather-stat-bar minor" style={{ width: `${data.minor_pct || 0}%` }} />
                      <span className="weather-stat-label">Minor: {data.minor_pct || 0}%</span>
                    </div>
                    <div className="weather-stat">
                      <div className="weather-stat-bar serious" style={{ width: `${data.serious_pct || 0}%` }} />
                      <span className="weather-stat-label">Serious: {data.serious_pct || 0}%</span>
                    </div>
                    <div className="weather-stat">
                      <div className="weather-stat-bar fatal" style={{ width: `${data.fatal_pct || 0}%` }} />
                      <span className="weather-stat-label">Fatal: {data.fatal_pct || 0}%</span>
                    </div>
                  </div>

                  <div className="weather-impact-total">{data.total} total predictions</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* High Risk Conditions */}
      {high_risk_conditions && high_risk_conditions.length > 0 && (
        <div className="glass-panel" style={{ padding: "24px", marginTop: "24px" }}>
          <div className="section-header">
            <div className="section-icon">⚠️</div>
            <div>
              <div className="section-title">High Risk Conditions</div>
              <div className="section-subtitle">Most common factors in fatal predictions</div>
            </div>
          </div>

          <div className="high-risk-list">
            {high_risk_conditions.map((item, idx) => (
              <div key={idx} className="high-risk-item">
                <div className="high-risk-icon">🚨</div>
                <div>
                  <div className="high-risk-condition">{item.condition}: {item.value}</div>
                  <div className="high-risk-count">Appeared in {item.count} fatal predictions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
