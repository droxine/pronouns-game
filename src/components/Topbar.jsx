export function Topbar({
  title,
  hearts,
  muted,
  onBack,
  onToggleMute,
  showBack = true,
  color = "#58cc02",
}) {
  return (
    <div className="topbar">
      {showBack && (
        <button className="icon-btn" onClick={onBack}>
          ← Menu
        </button>
      )}

      {!showBack && (
        <span className="topbar-brand" style={{ color }}>
          🌟 Pronoun Quest!
        </span>
      )}

      {showBack && (
        <span className="topbar-logo" style={{ color }}>
          {title}
        </span>
      )}

      <div className="topbar-icons">
        {showBack && (
          <span className="hearts">
            {[...Array(3)].map((_, index) => (index < hearts ? "❤️" : "🖤")).join("")}
          </span>
        )}
        <button className="icon-btn" onClick={onToggleMute}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
