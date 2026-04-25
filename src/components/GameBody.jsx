export function GameBody({
  question,
  level,
  levelIdx,
  questionIdx,
  selectedOption,
  feedback,
  wordBank,
  chosenWords,
  wordOrderChecked,
  wordOrderResult,
  onSelectOption,
  onAddWord,
  onRemoveWord,
  onCheckWordOrder,
  onNext,
}) {
  if (!question) return null;

  const isWordOrder = level.type === "word_order";
  const nextLabel = questionIdx + 1 >= level.qCount ? "See Results 📋" : "Next →";
  const nextStyles = {
    background: ["#58cc02", "#1cb0f6", "#ce82ff"][levelIdx],
    boxShadow: `0 5px 0 ${["#3da800", "#0a90d0", "#a855d4"][levelIdx]}`,
  };

  return (
    <div className="q-card" key={questionIdx}>
      <div className="q-badge">{questionBadge(level.type)}</div>
      {!isWordOrder && question.emoji && <span className="q-emoji">{question.emoji}</span>}
      <div className="hint-box">{question.hint}</div>

      {!isWordOrder && (
        <>
          <div className="q-text">
            {question.sentence.split("___").map((part, index, parts) => (
              <span key={`${part}-${index}`}>
                {part}
                {index < parts.length - 1 && <span className="q-blank">___</span>}
              </span>
            ))}
          </div>
          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                className={`opt-btn${selectedOption === option ? (option === question.answer ? " correct" : " wrong") : ""}`}
                onClick={() => onSelectOption(option)}
                disabled={Boolean(feedback)}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <div className={`feedback ${feedback.ok ? "correct" : "wrong"}`}>
              {feedback.ok ? "✅ " : "❌ "}
              {feedback.msg}
            </div>
          )}
          {feedback && (
            <button className="next-btn" style={nextStyles} onClick={onNext}>
              {nextLabel}
            </button>
          )}
        </>
      )}

      {isWordOrder && (
        <>
          <div className="word-order-help">Tap words to build the sentence, tap again to remove:</div>
          <div className={`wo-area${chosenWords.length > 0 ? " active" : ""}`}>
            {chosenWords.length === 0 ? (
              <span className="wo-ph">Tap words below…</span>
            ) : (
              chosenWords.map((word, index) => (
                <button
                  key={`${word.word}-${word.bankIdx}`}
                  className="chip chosen"
                  onClick={() => onRemoveWord(index)}
                  disabled={wordOrderChecked}
                >
                  {word.word}
                </button>
              ))
            )}
          </div>
          <div className="word-bank">
            {wordBank.map((entry, index) => (
              <button
                key={`${entry.word}-${entry.bankIdx}`}
                className={`chip${entry.used ? " used" : ""}`}
                onClick={() => !entry.used && onAddWord(index)}
                disabled={wordOrderChecked || entry.used}
              >
                {entry.word}
              </button>
            ))}
          </div>
          <button className="check-btn" onClick={onCheckWordOrder} disabled={chosenWords.length === 0 || wordOrderChecked}>
            Check! ✅
          </button>
          {wordOrderResult && (
            <div className={`feedback ${wordOrderResult.ok ? "correct" : "wrong"}`}>
              {wordOrderResult.ok ? "✅ " : "❌ "}
              {wordOrderResult.msg}
            </div>
          )}
          {wordOrderResult && (
            <button className="next-btn" style={nextStyles} onClick={onNext}>
              {nextLabel}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function questionBadge(type) {
  const labelByType = {
    verb_be: "Pick the right word!",
    pronoun: "Pick the right pronoun!",
    word_order: "Put the words in order!",
  };

  return labelByType[type];
}
