import { useState } from "react";
import { CORRECT_MESSAGES, TRY_AGAIN_MESSAGES } from "../data/gameContent";
import { STAR_AUDIO, STAR_BOOK_SECTIONS } from "../data/starBook";
import { STAR_LEVELS } from "../data/starContent";
import { pick, shuffle, starsFor } from "../utils/gameUtils";
import { Confetti } from "./Confetti";
import { ReviewRows } from "./ReviewRows";

const STAR_COLOR = "#ffc800";
const STAR_SHADOW = "#cc9f00";

export function StarQuiz({ muted, sfx, onToggleMute, onBackToTree }) {
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

  const level = STAR_LEVELS[levelIdx];
  const question = questions[questionIdx] ?? null;
  const progress = questions.length ? ((questionIdx + (feedback ? 1 : 0)) / questions.length) * 100 : 0;

  function launchLevel(nextLevelIdx) {
    const nextLevel = STAR_LEVELS[nextLevelIdx];
    const nextQuestions = shuffle(nextLevel.questions).slice(0, questionsForLevel(nextLevel));

    setLevelIdx(nextLevelIdx);
    setQuestions(nextQuestions);
    setQuestionIdx(0);
    setScore(0);
    setHistory([]);
    setSelectedOption(null);
    setFeedback(null);
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
        type: "star",
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
  }

  return (
    <>
      {confetti && <Confetti />}

      {screen === "home" && (
        <StarHome
          completed={completed}
          muted={muted}
          onToggleMute={onToggleMute}
          onBackToTree={onBackToTree}
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
        <StarGame
          level={level}
          question={question}
          questionIdx={questionIdx}
          progress={progress}
          muted={muted}
          selectedOption={selectedOption}
          feedback={feedback}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onAnswer={answer}
          onNext={goNext}
        />
      )}

      {screen === "review" && (
        <StarReview
          level={level}
          score={score}
          total={questions.length}
          history={history}
          muted={muted}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onRetry={() => launchLevel(levelIdx)}
        />
      )}

      {screen === "book" && (
        <StarReader
          muted={muted}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
        />
      )}
    </>
  );
}

function StarHome({ completed, muted, onToggleMute, onBackToTree, onOpenBook, onLaunchLevel }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBackToTree}>← Tree</button>
        <span className="topbar-logo star-logo">⭐ The Star and the Colours</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>

      <div className="scroll">
        <div className="home-hero star-hero">
          <span className="mascot-display">⭐</span>
          <div className="speech-bubble">Quick colour and story practice.</div>
          <div className="home-title star-title">The Star and the Colours</div>
          <div className="home-sub">Vocabulary · Colours · Story check</div>
        </div>

        <button className="open-book-btn star-book-btn" onClick={onOpenBook}>
          <span className="open-book-icon">📚</span>
          <span>
            <strong>Open the Book</strong>
            <small>Read and listen to the story</small>
          </span>
        </button>

        <div className="divider">choose a quick quiz</div>

        {STAR_LEVELS.map((level, index) => (
          <div key={level.id} className={`level-card${completed.has(index) ? " done" : ""}`} onClick={() => onLaunchLevel(index)}>
            <div className="lc-icon">{level.emoji}</div>
            <div className="lc-info">
              <div className="lc-name star-level-name">Level {index + 1} · {level.title}</div>
              <div className="lc-desc">{level.description}</div>
            </div>
            <div className="lc-right">
              <div className="lc-stars">{completed.has(index) ? "⭐⭐⭐" : "☆☆☆"}</div>
              <div className="lc-arr">›</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StarGame({ level, question, questionIdx, progress, muted, selectedOption, feedback, onToggleMute, onBack, onAnswer, onNext }) {
  if (!question) return null;

  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className="topbar-logo star-logo">{level.emoji} {level.title}</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>

      <div className="prog-wrap">
        <div className="prog-bar" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${STAR_COLOR}, ${STAR_SHADOW})` }} />
      </div>

      <div className="scroll">
        <div className="q-card" key={questionIdx}>
          <div className="q-badge">{level.title}</div>
          {question.prompt && question.question ? (
            <>
              <div className="story-sentence star-sentence">{highlightTarget(question.prompt, question.target)}</div>
              <div className="q-text">{question.question}</div>
            </>
          ) : question.question ? (
            <div className="q-text">{question.question}</div>
          ) : (
            <div className="q-text">{question.prompt}</div>
          )}

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

          {feedback && (
            <div className={`feedback ${feedback.ok ? "correct" : "wrong"}`}>
              {feedback.ok ? "✅ " : "❌ "}
              {feedback.msg}
            </div>
          )}

          {feedback && (
            <button className="next-btn" style={{ background: STAR_COLOR, boxShadow: `0 5px 0 ${STAR_SHADOW}`, color: "#333" }} onClick={onNext}>
              {questionIdx + 1 >= questionsForLevel(level) ? "See Results 📋" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function StarReview({ level, score, total, history, muted, onToggleMute, onBack, onRetry }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className="topbar-logo star-logo">{level.title} Review</span>
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
          <button className="next-btn" style={{ background: STAR_COLOR, boxShadow: `0 5px 0 ${STAR_SHADOW}`, color: "#333" }} onClick={onBack}>← Back to Topic</button>
          <button className="ghost-btn" onClick={onRetry}>🔄 Retry this level</button>
        </div>
      </div>
    </>
  );
}

function StarReader({ muted, onToggleMute, onBack }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>← Topic</button>
        <span className="topbar-logo star-logo">📚 Story Book</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>{muted ? "🔇" : "🔊"}</button>
        </div>
      </div>
      <div className="scroll book-scroll">
        <div className="book-cover star-cover">
          <div className="book-cover-icon">⭐</div>
          <div>
            <div className="book-eyebrow">Read together</div>
            <h2>The Star and the Colours</h2>
            <p>By Paola Traverso</p>
          </div>
        </div>
        <div className="book-audio-card">
          <div className="book-audio-title"><span>🔊</span><strong>Story audio</strong></div>
          <audio controls preload="metadata" src={imageSrc(STAR_AUDIO)}>Your browser does not support audio.</audio>
        </div>
        <div className="book-pages">
          {STAR_BOOK_SECTIONS.map((section) => (
            <section key={section.id} className="book-section star-book-section">
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

function highlightTarget(sentence, target) {
  if (!target) return sentence;
  const targetIndex = sentence.toLowerCase().indexOf(target.toLowerCase());
  if (targetIndex < 0) return sentence;
  return (
    <>
      {sentence.slice(0, targetIndex)}
      <span className="story-target star-target">{sentence.slice(targetIndex, targetIndex + target.length)}</span>
      {sentence.slice(targetIndex + target.length)}
    </>
  );
}
