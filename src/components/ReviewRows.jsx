export function ReviewRows({ entries }) {
  return (
    <div className="review-list">
      <div className="rv-title">📋 Your Answers</div>
      {entries.map((entry, index) => (
        <div
          key={`${entry.answer}-${index}`}
          className={`rv-row ${entry.correct ? "ok" : "bad"}`}
          style={{ animationDelay: `${index * 0.07}s` }}
        >
          <div className="rv-top">
            <span className="rv-icon">{entry.correct ? "✅" : "❌"}</span>
            <span className="rv-q">
              {entry.type === "word_order" ? `Build: "${entry.answer}"` : entry.sentence}
            </span>
          </div>
          <div className="rv-detail">
            {!entry.correct && (
              <>
                Your answer: <span className="rv-wrong">{entry.given}</span> ·{" "}
              </>
            )}
            Correct: <span className="rv-right">{entry.answer}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
