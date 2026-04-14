export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      <div className={`theme-toggle-knob ${theme === "light" ? "light" : ""}`}>
        {theme === "dark" ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
