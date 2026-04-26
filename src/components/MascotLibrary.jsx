export function MascotLibrary({ mascots, completedCount, activeMascot, title, onChooseMascot }) {
  return (
    <div className="mascot-lib">
      <div className="lib-title">{title}</div>
      <div className="mascot-grid">
        {mascots.map((mascot, index) => {
          const isUnlocked = index === 0 || completedCount >= index;
          const isActive = activeMascot === index;

          return (
            <div
              key={mascot.id}
              className={`mascot-card${isUnlocked ? " unlocked" : " locked"}${isActive ? " active" : ""}`}
              onClick={() => {
                if (isUnlocked) onChooseMascot(index);
              }}
            >
              <span className={`m-emoji${isUnlocked ? " on" : ""}`}>{mascot.emoji}</span>
              <span className={`m-name${isUnlocked ? " on" : ""}`}>{isUnlocked ? mascot.name : "???"}</span>
              {isUnlocked ? (
                <button
                  className={`choose-btn${isActive ? " active" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onChooseMascot(index);
                  }}
                >
                  {isActive ? "✓ Chosen" : "Choose"}
                </button>
              ) : (
                <span className="locked-icon">🔒</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
