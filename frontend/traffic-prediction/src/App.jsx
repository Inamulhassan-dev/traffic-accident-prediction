import { useState, useEffect } from "react";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import PredictionHistory from "./components/PredictionHistory";
import SafetyRecommendations from "./components/SafetyRecommendations";
import StatsPanel from "./components/StatsPanel";
import ThemeToggle from "./components/ThemeToggle";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import DriverRiskProfile from "./components/DriverRiskProfile";
import ExportReport from "./components/ExportReport";

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("traffic-prediction-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("traffic-theme") || "dark";
  });
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("prediction"); // prediction, analytics, driver-profile

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("traffic-theme", theme);
  }, [theme]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("traffic-prediction-history", JSON.stringify(history));
  }, [history]);

  const handleResult = (resultData, inputData) => {
    setResult(resultData);
    setFormData(inputData);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      severity: resultData.severity,
      confidence: resultData.confidence,
      risk_score: resultData.risk_score,
      conditions: `${inputData["Weather Conditions"]} • ${inputData["Road Type"]} • ${inputData["Time of Day"]}`,
      timestamp: new Date().toLocaleString(),
    };

    setHistory((prev) => [historyEntry, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("traffic-prediction-history");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Calculate stats from history
  const stats = {
    total: history.length,
    minor: history.filter((h) => h.severity === "Minor").length,
    serious: history.filter((h) => h.severity === "Serious").length,
    fatal: history.filter((h) => h.severity === "Fatal").length,
  };

  return (
    <>
      {/* Animated Background Mesh */}
      <div className="bg-mesh" />

      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">🚦</div>
          <div>
            <div className="logo-text">TrafficAI</div>
            <div className="logo-subtitle">Accident Severity Predictor</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="status-badge">
            <div className="status-dot" />
            <span>Model Active</span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="nav-tabs-container">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === "prediction" ? "active" : ""}`}
            onClick={() => setActiveTab("prediction")}
          >
            <span className="nav-tab-icon">🎯</span>
            <span>Prediction</span>
          </button>
          <button
            className={`nav-tab ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <span className="nav-tab-icon">📊</span>
            <span>Analytics</span>
          </button>
          <button
            className={`nav-tab ${activeTab === "driver-profile" ? "active" : ""}`}
            onClick={() => setActiveTab("driver-profile")}
          >
            <span className="nav-tab-icon">👤</span>
            <span>Driver Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="app-container">
        {activeTab === "prediction" && (
          <>
            {/* Stats Row */}
            <StatsPanel stats={stats} />

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
              {/* LEFT COLUMN — Form */}
              <div>
                <div className="glass-panel" style={{ padding: "24px" }}>
                  <div className="section-header">
                    <div className="section-icon">📋</div>
                    <div>
                      <div className="section-title">Prediction Input</div>
                      <div className="section-subtitle">
                        Enter road & driver conditions
                      </div>
                    </div>
                  </div>
                  <PredictionForm onResult={handleResult} />
                </div>

                {/* Safety Recommendations */}
                {result && formData && (
                  <div
                    className="glass-panel animate-slide-up"
                    style={{ padding: "24px", marginTop: "24px" }}
                  >
                    <div className="section-header">
                      <div className="section-icon">🛡️</div>
                      <div>
                        <div className="section-title">Safety Recommendations</div>
                        <div className="section-subtitle">
                          Based on your conditions
                        </div>
                      </div>
                    </div>
                    <SafetyRecommendations formData={formData} />
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN — Results & History */}
              <div>
                {/* Result Card */}
                {result ? (
                  <div
                    className="glass-panel result-container"
                    style={{ padding: "24px" }}
                  >
                    <div className="section-header">
                      <div className="section-icon">🎯</div>
                      <div>
                        <div className="section-title">Prediction Result</div>
                        <div className="section-subtitle">AI severity analysis</div>
                      </div>
                    </div>
                    <ResultCard result={result} />
                    
                    {/* Export Options */}
                    <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border-glass)" }}>
                      <ExportReport result={result} formData={formData} history={history} />
                    </div>
                  </div>
                ) : (
                  <div className="glass-panel" style={{ padding: "24px" }}>
                    <div className="empty-state">
                      <div className="empty-state-icon">🔮</div>
                      <div className="empty-state-text">
                        Fill in the conditions and click Predict
                        <br />
                        to see the AI severity analysis
                      </div>
                    </div>
                  </div>
                )}

                {/* Prediction History */}
                <div
                  className="glass-panel animate-slide-up"
                  style={{ padding: "24px", marginTop: "24px" }}
                >
                  <div
                    className="section-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="section-icon">📊</div>
                      <div>
                        <div className="section-title">Prediction History</div>
                        <div className="section-subtitle">
                          {history.length} predictions recorded
                        </div>
                      </div>
                    </div>
                    {history.length > 0 && (
                      <button className="clear-btn" onClick={clearHistory}>
                        🗑️ Clear
                      </button>
                    )}
                  </div>
                  <PredictionHistory history={history} />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "analytics" && <AnalyticsDashboard />}

        {activeTab === "driver-profile" && <DriverRiskProfile />}
      </main>
    </>
  );
}