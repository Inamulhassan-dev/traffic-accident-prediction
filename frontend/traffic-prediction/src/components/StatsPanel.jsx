export default function StatsPanel({ stats }) {
  const statItems = [
    {
      icon: "📊",
      value: stats.total,
      label: "Total Predictions",
    },
    {
      icon: "🟢",
      value: stats.minor,
      label: "Minor",
    },
    {
      icon: "🟡",
      value: stats.serious,
      label: "Serious",
    },
    {
      icon: "🔴",
      value: stats.fatal,
      label: "Fatal",
    },
  ];

  return (
    <div className="stats-row stagger-children">
      {statItems.map((item, idx) => (
        <div className="glass-panel stat-card animate-fade-scale" key={idx}>
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
