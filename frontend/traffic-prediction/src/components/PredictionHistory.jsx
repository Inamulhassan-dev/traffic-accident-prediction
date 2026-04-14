export default function PredictionHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <div className="empty-state-text">
          No predictions yet.
          <br />
          Make your first prediction to start tracking!
        </div>
      </div>
    );
  }

  return (
    <div className="history-list">
      {history.map((item, idx) => (
        <div
          className="history-item"
          key={item.id}
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className={`history-severity ${item.severity.toLowerCase()}`}>
                {item.severity}
              </span>
              {item.risk_score !== undefined && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  Score: {Math.round(item.risk_score)}
                </span>
              )}
            </div>
            <div className="history-details">{item.conditions}</div>
          </div>
          <div className="history-time">{item.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
