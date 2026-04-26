import { useState } from "react";
import { CORRECT_MESSAGES, TRY_AGAIN_MESSAGES } from "../data/gameContent";
import { pick, shuffle, starsFor } from "../utils/gameUtils";
import { Confetti } from "./Confetti";
import { MascotLibrary } from "./MascotLibrary";
import { ReviewRows } from "./ReviewRows";

export function BookQuiz({
  book,
  levels,
  bookSections,
  audio,
  muted,
  sfx,
  onToggleMute,
  onBackToTree,
}) {
  const [screen, setScreen] = useState("home");
  const [levelIdx, setLevelIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [completed, setCompleted] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [activeMascot, setActiveMascot] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const levelSections = buildLevelSections(levels);
  const playableLevels = levelSections.flatMap((section) => section.levels);

  const level = playableLevels[levelIdx];
  const question = questions[questionIdx] ?? null;
  const mascot = book.mascots?.[activeMascot] ?? { emoji: book.icon, name: "Book" };
  const progress = questions.length ? ((questionIdx + (feedback ? 1 : 0)) / questions.length) * 100 : 0;

  function launchLevel(nextLevelIdx) {
    const nextLevel = playableLevels[nextLevelIdx];
    const levelQuestions = nextLevel.keepOrder ? nextLevel.questions : shuffle(nextLevel.questions);
    const nextQuestions = levelQuestions.slice(0, questionsForLevel(nextLevel));

    setLevelIdx(nextLevelIdx);
    setQuestions(nextQuestions);
    setQuestionIdx(0);
    setScore(0);
    setHistory([]);
    setSelectedOption(null);
    setFeedback(null);
    resetOrderingState(nextQuestions[0]);
    setScreen("game");
  }

  function answer(option) {
    if (feedback) return;

    const isCorrect = option === question.answer;
    setSelectedOption(option);
    setHistory((currentHistory) => [
      ...currentHistory,
      {
        sentence: question.question ?? question.prompt,
        answer: question.answer,
        given: option,
        correct: isCorrect,
        type: book.id,
      },
    ]);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      sfx.correct();
      setFeedback({ ok: true, msg: pick(CORRECT_MESSAGES) });
      return;
    }

    sfx.wrong();
    setFeedback({ ok: false, msg: `The answer is "${question.answer}". ${pick(TRY_AGAIN_MESSAGES)}` });
  }

  function addWord(bankIndex) {
    if (feedback) return;

    sfx.tap();
    setWordBank((currentBank) => currentBank.map((word, index) => (index === bankIndex ? { ...word, used: true } : word)));
    setChosenWords((currentWords) => [...currentWords, { word: wordBank[bankIndex].word, bankIdx: bankIndex }]);
  }

  function removeWord(position) {
    if (feedback) return;

    sfx.tap();
    const wordToRemove = chosenWords[position];

    setWordBank((currentBank) => currentBank.map((word, index) => (index === wordToRemove.bankIdx ? { ...word, used: false } : word)));
    setChosenWords((currentWords) => currentWords.filter((_, index) => index !== position));
  }

  function checkOrder() {
    const given = chosenWords.map((word) => word.word).join(" ");
    const isCorrect = normalize(given) === normalize(question.answer);

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        sentence: question.prompt,
        answer: question.answer,
        given,
        correct: isCorrect,
        type: book.id,
      },
    ]);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      sfx.correct();
      setFeedback({ ok: true, msg: pick(CORRECT_MESSAGES) });
      return;
    }

    sfx.wrong();
    setFeedback({ ok: false, msg: `Correct: "${question.answer}"` });
  }

  function goNext() {
    if (questionIdx + 1 >= questions.length) {
      setCompleted((currentCompleted) => new Set([...currentCompleted, levelIdx]));
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2800);
      sfx.levelUp();
      setScreen("review");
      return;
    }

    setQuestionIdx((currentIdx) => currentIdx + 1);
    setSelectedOption(null);
    setFeedback(null);
    resetOrderingState(questions[questionIdx + 1]);
  }

  function continueAfterReview() {
    const nextLevelIdx = levelIdx + 1;

    if (nextLevelIdx < playableLevels.length) {
      launchLevel(nextLevelIdx);
      return;
    }

    setScreen("home");
  }

  function resetOrderingState(nextQuestion) {
    if (isOrderingQuestion(nextQuestion)) {
      setWordBank(shuffle(nextQuestion.words).map((word, bankIdx) => ({ word, bankIdx, used: false })));
    } else {
      setWordBank([]);
    }

    setChosenWords([]);
  }

  return (
    <>
      {confetti && <Confetti />}

      {screen === "home" && (
        <BookHome
          book={book}
          levelSections={levelSections}
          completed={completed}
          mascot={mascot}
          activeMascot={activeMascot}
          muted={muted}
          onToggleMute={onToggleMute}
          onBackToTree={onBackToTree}
          onChooseMascot={(mascotIdx) => {
            sfx.tap();
            setActiveMascot(mascotIdx);
          }}
          onOpenBook={() => {
            sfx.tap();
            setScreen("book");
          }}
          onLaunchLevel={(nextLevelIdx) => {
            sfx.tap();
            launchLevel(nextLevelIdx);
          }}
        />
      )}

      {screen === "game" && (
        <BookGame
          book={book}
          level={level}
          question={question}
          questionIdx={questionIdx}
          progress={progress}
          muted={muted}
          selectedOption={selectedOption}
          feedback={feedback}
          wordBank={wordBank}
          chosenWords={chosenWords}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onAnswer={answer}
          onAddWord={addWord}
          onRemoveWord={removeWord}
          onCheckOrder={checkOrder}
          onNext={goNext}
        />
      )}

      {screen === "review" && (
        <BookReview
          book={book}
          level={level}
          score={score}
          total={questions.length}
          history={history}
          muted={muted}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onRetry={() => launchLevel(levelIdx)}
          onContinue={continueAfterReview}
          hasNextLevel={levelIdx + 1 < playableLevels.length}
        />
      )}

      {screen === "book" && (
        <BookReader
          book={book}
          audio={audio}
          sections={bookSections}
          muted={muted}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
        />
      )}
    </>
  );
}

function BookHome({ book, levelSections, completed, mascot, activeMascot, muted, onToggleMute, onBackToTree, onChooseMascot, onOpenBook, onLaunchLevel }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBackToTree}>← Tree</button>
        <span className={`topbar-logo ${book.className}-logo`}>{book.icon} {book.title}</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>

      <div className="scroll">
        <div className={`home-hero ${book.className}-hero`}>
          <span className="mascot-display">{mascot.emoji}</span>
          <div className="speech-bubble">Practice with {mascot.name}!</div>
          <div className={`home-title ${book.className}-title`}>{book.title}</div>
          <div className="home-sub">{book.subtitle}</div>
        </div>

        <button className={`open-book-btn ${book.className}-book-btn`} onClick={onOpenBook}>
          <span className="open-book-icon">📚</span>
          <span>
            <strong>Open the Book</strong>
            <small>Read and listen to the story</small>
          </span>
        </button>

        <div className="divider">choose a section</div>

        {levelSections.map((section) => (
          <div key={section.id} className="turnip-section">
            <div className="turnip-section-header">
              <span className="turnip-section-emoji">{section.emoji}</span>
              <div>
                <div className="turnip-section-title">{section.title}</div>
                <div className="turnip-section-desc">{section.description}</div>
              </div>
            </div>

            {section.levels.map((level, index) => {
              const levelNumber = index + 1;
              const isCompleted = completed.has(level.flatIdx);

              return (
                <div key={level.id} className={`level-card${isCompleted ? " done" : ""}`} onClick={() => onLaunchLevel(level.flatIdx)}>
                  <div className="lc-icon">{level.emoji}</div>
                  <div className="lc-info">
                    <div className={`lc-name ${book.className}-level-name`}>Level {levelNumber} · {level.title}</div>
                    <div className="lc-desc">{level.description}</div>
                  </div>
                  <div className="lc-right">
                    <div className="lc-stars">{isCompleted ? "⭐⭐⭐" : "☆☆☆"}</div>
                    <div className="lc-arr">›</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {book.mascots && (
          <MascotLibrary
            mascots={book.mascots}
            completedCount={completed.size}
            activeMascot={activeMascot}
            title="🎒 Story Mascots — unlock book buddies!"
            onChooseMascot={onChooseMascot}
          />
        )}
      </div>
    </>
  );
}

function BookGame({
  book,
  level,
  question,
  questionIdx,
  progress,
  muted,
  selectedOption,
  feedback,
  wordBank,
  chosenWords,
  onToggleMute,
  onBack,
  onAnswer,
  onAddWord,
  onRemoveWord,
  onCheckOrder,
  onNext,
}) {
  if (!question) return null;

  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className={`topbar-logo ${book.className}-logo`}>{level.emoji} {level.title}</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>

      <div className="prog-wrap">
        <div className="prog-bar" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${book.color}, ${book.shadow})` }} />
      </div>

      <div className="scroll">
        <div className="q-card" key={questionIdx}>
          <div className="q-badge">{level.title}</div>
          {level.note && <div className="order-note">{level.note}</div>}
          {question.note && <div className="order-note">{question.note}</div>}
          {question.prompt && question.question ? (
            <>
              <div className={`story-sentence ${book.className}-sentence`}>{highlightTarget(question.prompt, question.target, book.className)}</div>
              <div className="q-text">{question.question}</div>
            </>
          ) : isOrderingQuestion(question) ? (
            <div className="hint-box">{question.prompt}</div>
          ) : question.question ? (
            <div className="q-text">{question.question}</div>
          ) : (
            <div className="q-text">{question.prompt}</div>
          )}

          {!isOrderingQuestion(question) && (
            <div className="options">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`opt-btn${selectedOption === option ? (option === question.answer ? " correct" : " wrong") : ""}`}
                  onClick={() => onAnswer(option)}
                  disabled={Boolean(feedback)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {isOrderingQuestion(question) && (
            <>
              <div className={`wo-area${chosenWords.length > 0 ? " active" : ""} sequence-area`}>
                {chosenWords.length === 0 ? (
                  <span className="wo-ph">{question.emptyText ?? "Tap events below..."}</span>
                ) : (
                  chosenWords.map((word, index) => (
                    <button
                      key={`${word.word}-${word.bankIdx}`}
                      className="chip chosen"
                      onClick={() => onRemoveWord(index)}
                      disabled={Boolean(feedback)}
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
                    disabled={Boolean(feedback) || entry.used}
                  >
                    {entry.word}
                  </button>
                ))}
              </div>
              <button className="check-btn" onClick={onCheckOrder} disabled={chosenWords.length === 0 || Boolean(feedback)}>
                {question.checkLabel ?? "Check order! ✅"}
              </button>
            </>
          )}

          {feedback && (
            <div className={`feedback ${feedback.ok ? "correct" : "wrong"}`}>
              {feedback.ok ? "✅ " : "❌ "}
              {feedback.msg}
            </div>
          )}

          {feedback && (
            <button className="next-btn" style={{ background: book.color, boxShadow: `0 5px 0 ${book.shadow}`, color: book.buttonText ?? "white" }} onClick={onNext}>
              {questionIdx + 1 >= questionsForLevel(level) ? "See Results 📋" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function BookReview({ book, level, score, total, history, muted, onToggleMute, onBack, onRetry, onContinue, hasNextLevel }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className={`topbar-logo ${book.className}-logo`}>{level.title} Review</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>
      <div className="scroll">
        <div className="review-header">
          <span className="rv-mascot">{level.emoji}</span>
          <h2>{level.title} Done! 🎊</h2>
          <div className="rv-score">Score: {score} / {total}</div>
          <div className="stars">{[...Array(3)].map((_, index) => (index < starsFor(score, total) ? "⭐" : "☆")).join(" ")}</div>
        </div>
        <ReviewRows entries={history} />
        <div className="review-actions">
          <button className="next-btn" style={{ background: book.color, boxShadow: `0 5px 0 ${book.shadow}`, color: book.buttonText ?? "white" }} onClick={hasNextLevel ? onContinue : onBack}>
            {hasNextLevel ? "Continue →" : "← Back to Topic"}
          </button>
          <button className="ghost-btn" onClick={onRetry}>🔄 Retry this level</button>
        </div>
      </div>
    </>
  );
}

function BookReader({ book, audio, sections, muted, onToggleMute, onBack }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className={`topbar-logo ${book.className}-logo`}>📚 Story Book</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>
      <div className="scroll book-scroll">
        <div className={`book-cover ${book.className}-cover`}>
          <div className="book-cover-icon">{book.icon}</div>
          <div>
            <div className="book-eyebrow">Read together</div>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>
        </div>
        <div className="book-audio-card">
          <div className="book-audio-title"><span>🔊</span><strong>Story audio</strong></div>
          <audio controls preload="metadata" src={imageSrc(audio)}>Your browser does not support audio.</audio>
        </div>
        <div className="book-pages">
          {sections.map((section) => (
            <section key={section.id} className={`book-section ${book.className}-book-section`}>
              <h3><span>{section.emoji}</span>{section.title}</h3>
              {section.paragraphs.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function imageSrc(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function questionsForLevel(level) {
  return Math.min(level.qCount ?? 8, level.questions.length);
}

function buildLevelSections(items) {
  const practiceLevels = [];
  const sections = [];

  items.forEach((item) => {
    if (item.levels) {
      sections.push(item);
      return;
    }

    practiceLevels.push(item);
  });

  const groupedSections = [
    {
      id: "story-practice",
      title: "Story Practice",
      emoji: "📚",
      description: "Learn vocabulary, phrases, order, and comprehension.",
      levels: practiceLevels,
    },
    ...sections,
  ].filter((section) => section.levels.length > 0);

  let flatIdx = 0;

  return groupedSections.map((section) => ({
    ...section,
    levels: section.levels.map((level) => ({ ...level, flatIdx: flatIdx++ })),
  }));
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function isOrderingQuestion(question) {
  return question?.type === "sequence";
}

function highlightTarget(sentence, target, className) {
  if (!target) return sentence;
  const targetIndex = sentence.toLowerCase().indexOf(target.toLowerCase());
  if (targetIndex < 0) return sentence;
  return (
    <>
      {sentence.slice(0, targetIndex)}
      <span className={`story-target ${className}-target`}>{sentence.slice(targetIndex, targetIndex + target.length)}</span>
      {sentence.slice(targetIndex + target.length)}
    </>
  );
}
