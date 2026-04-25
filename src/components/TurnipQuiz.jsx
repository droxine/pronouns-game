import { useState } from "react";
import { CORRECT_MESSAGES, TRY_AGAIN_MESSAGES } from "../data/gameContent";
import { TURNIP_SECTIONS } from "../data/turnipContent";
import { pick, shuffle, starsFor } from "../utils/gameUtils";
import { Confetti } from "./Confetti";
import { ReviewRows } from "./ReviewRows";

const TURNIP_COLORS = ["#1cb0f6", "#58cc02", "#ffc800", "#ce82ff"];
const TURNIP_SHADOWS = ["#0a90d0", "#3da800", "#cc9f00", "#a855d4"];

export function TurnipQuiz({ muted, sfx, onToggleMute, onBackToTree }) {
  const [screen, setScreen] = useState("home");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [levelIdx, setLevelIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [completed, setCompleted] = useState(new Set());
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [wordBank, setWordBank] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const [checkedBuild, setCheckedBuild] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const section = TURNIP_SECTIONS[sectionIdx];
  const level = section.levels[levelIdx];
  const question = questions[questionIdx] ?? null;
  const isAnswered = Boolean(feedback || checkedBuild);
  const progress = questions.length ? ((questionIdx + (isAnswered ? 1 : 0)) / questions.length) * 100 : 0;

  function launchLevel(nextSectionIdx, nextLevelIdx) {
    const nextLevel = TURNIP_SECTIONS[nextSectionIdx].levels[nextLevelIdx];
    const nextQuestions = shuffle(nextLevel.questions).slice(0, nextLevel.qCount ?? nextLevel.questions.length);

    setSectionIdx(nextSectionIdx);
    setLevelIdx(nextLevelIdx);
    setQuestions(nextQuestions);
    setQuestionIdx(0);
    setScore(0);
    setHistory([]);
    setSelectedOption(null);
    setFeedback(null);
    resetBuildState(nextQuestions[0]);
    setScreen("game");
  }

  function answerChoice(option) {
    if (feedback) return;

    const isCorrect = option === question.answer;
    setSelectedOption(option);
    recordAnswer(option, isCorrect);

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
    if (checkedBuild) return;

    sfx.tap();
    setWordBank((currentBank) => currentBank.map((word, index) => (index === bankIndex ? { ...word, used: true } : word)));
    setChosenWords((currentWords) => [...currentWords, { word: wordBank[bankIndex].word, bankIdx: bankIndex }]);
  }

  function removeWord(position) {
    if (checkedBuild) return;

    sfx.tap();
    const wordToRemove = chosenWords[position];

    setWordBank((currentBank) => currentBank.map((word, index) => (index === wordToRemove.bankIdx ? { ...word, used: false } : word)));
    setChosenWords((currentWords) => currentWords.filter((_, index) => index !== position));
  }

  function checkBuild() {
    const given = chosenWords.map((word) => word.word).join(" ");
    const isCorrect = normalize(given) === normalize(question.answer);

    setCheckedBuild(true);
    recordAnswer(given, isCorrect);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      sfx.correct();
      setFeedback({ ok: true, msg: pick(CORRECT_MESSAGES) });
      return;
    }

    sfx.wrong();
    setFeedback({ ok: false, msg: `Correct: "${question.answer}"` });
  }

  function recordAnswer(given, correct) {
    setHistory((currentHistory) => [
      ...currentHistory,
      {
        sentence: question.prompt,
        answer: question.answer,
        given,
        correct,
        type: "turnip",
      },
    ]);
  }

  function goNext() {
    if (questionIdx + 1 >= questions.length) {
      finishLevel();
      return;
    }

    const nextQuestionIdx = questionIdx + 1;
    setQuestionIdx(nextQuestionIdx);
    setSelectedOption(null);
    setFeedback(null);
    resetBuildState(questions[nextQuestionIdx]);
  }

  function finishLevel() {
    setCompleted((currentCompleted) => new Set([...currentCompleted, completedKey(sectionIdx, levelIdx)]));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2800);
    sfx.levelUp();
    setScreen("review");
  }

  function resetBuildState(nextQuestion) {
    if (nextQuestion?.type === "build") {
      setWordBank(shuffle(nextQuestion.words).map((word, bankIdx) => ({ word, bankIdx, used: false })));
    } else {
      setWordBank([]);
    }

    setChosenWords([]);
    setCheckedBuild(false);
  }

  return (
    <>
      {confetti && <Confetti />}
      {screen === "home" && (
        <TurnipHome
          completed={completed}
          muted={muted}
          onToggleMute={onToggleMute}
          onBackToTree={onBackToTree}
          onLaunchLevel={(nextSectionIdx, nextLevelIdx) => {
            sfx.tap();
            launchLevel(nextSectionIdx, nextLevelIdx);
          }}
        />
      )}

      {screen === "game" && (
        <TurnipGame
          level={level}
          section={section}
          sectionIdx={sectionIdx}
          question={question}
          questionIdx={questionIdx}
          progress={progress}
          muted={muted}
          selectedOption={selectedOption}
          feedback={feedback}
          wordBank={wordBank}
          chosenWords={chosenWords}
          checkedBuild={checkedBuild}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onAnswerChoice={answerChoice}
          onAddWord={addWord}
          onRemoveWord={removeWord}
          onCheckBuild={checkBuild}
          onNext={goNext}
        />
      )}

      {screen === "review" && (
        <TurnipReview
          level={level}
          section={section}
          sectionIdx={sectionIdx}
          score={score}
          total={questions.length}
          history={history}
          muted={muted}
          onToggleMute={onToggleMute}
          onBack={() => setScreen("home")}
          onRetry={() => launchLevel(sectionIdx, levelIdx)}
        />
      )}
    </>
  );
}

function TurnipHome({ completed, muted, onToggleMute, onBackToTree, onLaunchLevel }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBackToTree}>
          ← Tree
        </button>
        <span className="topbar-logo turnip-logo">📖 The Enormous Turnip</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <div className="scroll">
        <div className="home-hero turnip-hero">
          <span className="mascot-display">📖</span>
          <div className="speech-bubble">Let's learn story words before reading.</div>
          <div className="home-title turnip-title">The Enormous Turnip</div>
          <div className="home-sub">Vocabulary · Pictures · Story order</div>
        </div>

        <div className="divider">choose a story section</div>

        {TURNIP_SECTIONS.map((section, sectionIndex) => (
          <div key={section.id} className="turnip-section">
            <div className="turnip-section-header">
              <span className="turnip-section-emoji">{section.emoji}</span>
              <div>
                <div className="turnip-section-title">{section.title}</div>
                <div className="turnip-section-desc">{section.description}</div>
              </div>
            </div>

            {section.levels.map((level, levelIndex) => {
              const isCompleted = completed.has(completedKey(sectionIndex, levelIndex));

              return (
                <div
                  key={level.id}
                  className={`level-card${isCompleted ? " done" : ""}`}
                  onClick={() => onLaunchLevel(sectionIndex, levelIndex)}
                >
                  <div className="lc-icon">{level.emoji}</div>
                  <div className="lc-info">
                    <div className="lc-name turnip-level-name">
                      Level {levelIndex + 1} · {level.title}
                    </div>
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
      </div>
    </>
  );
}

function TurnipGame({
  level,
  section,
  sectionIdx,
  question,
  questionIdx,
  progress,
  muted,
  selectedOption,
  feedback,
  wordBank,
  chosenWords,
  checkedBuild,
  onToggleMute,
  onBack,
  onAnswerChoice,
  onAddWord,
  onRemoveWord,
  onCheckBuild,
  onNext,
}) {
  if (!question) return null;

  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          ← Topic
        </button>
        <span className="topbar-logo turnip-logo">
          {section.emoji} {level.title}
        </span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <div className="prog-wrap">
        <div
          className="prog-bar"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${turnipColor(sectionIdx)}, ${turnipShadow(sectionIdx)})`,
          }}
        />
      </div>

      <div className="scroll">
        <div className="q-card" key={questionIdx}>
          <div className="q-badge">{level.title}</div>

          {question.type === "picture" && (
            <TurnipPicture
              image={question.image}
              fallbackPicture={question.fallbackPicture}
              answer={question.answer}
            />
          )}

          <div className={question.type === "picture" || question.type === "build" ? "hint-box" : "story-sentence"}>
            {question.type === "picture" || question.type === "build"
              ? question.prompt
              : highlightTarget(question.prompt, question.target)}
          </div>

          {question.target && (
            <div className="turnip-target">
              Find: <span>{question.target}</span>
            </div>
          )}

          {question.type !== "build" && (
            <>
              <div className="q-text">{question.question}</div>
              <div className="options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={`opt-btn${selectedOption === option ? (option === question.answer ? " correct" : " wrong") : ""}`}
                    onClick={() => onAnswerChoice(option)}
                    disabled={Boolean(feedback)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {question.type === "build" && (
            <>
              <div className={`wo-area${chosenWords.length > 0 ? " active" : ""}`}>
                {chosenWords.length === 0 ? (
                  <span className="wo-ph">Tap words below…</span>
                ) : (
                  chosenWords.map((word, index) => (
                    <button
                      key={`${word.word}-${word.bankIdx}`}
                      className="chip chosen"
                      onClick={() => onRemoveWord(index)}
                      disabled={checkedBuild}
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
                    disabled={checkedBuild || entry.used}
                  >
                    {entry.word}
                  </button>
                ))}
              </div>
              <button className="check-btn" onClick={onCheckBuild} disabled={chosenWords.length === 0 || checkedBuild}>
                Check! ✅
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
            <button
              className="next-btn"
              style={{ background: turnipColor(sectionIdx), boxShadow: `0 5px 0 ${turnipShadow(sectionIdx)}` }}
              onClick={onNext}
            >
              {questionIdx + 1 >= questionCount(level) ? "See Results 📋" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function TurnipReview({ level, section, sectionIdx, score, total, history, muted, onToggleMute, onBack, onRetry }) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBack}>
          ← Topic
        </button>
        <span className="topbar-logo turnip-logo">{section.title} Review</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <div className="scroll">
        <div className="review-header">
          <span className="rv-mascot">{section.emoji}</span>
          <h2>{level.title} Done! 🎊</h2>
          <div className="rv-score">
            Score: {score} / {total}
          </div>
          <div className="stars">
            {[...Array(3)].map((_, index) => (index < starsFor(score, total) ? "⭐" : "☆")).join(" ")}
          </div>
        </div>

        <ReviewRows entries={history} />

        <div className="review-actions">
          <button
            className="next-btn"
            style={{ background: turnipColor(sectionIdx), boxShadow: `0 5px 0 ${turnipShadow(sectionIdx)}` }}
            onClick={onBack}
          >
            ← Back to Topic
          </button>
          <button className="ghost-btn" onClick={onRetry}>
            🔄 Retry this level
          </button>
        </div>
      </div>
    </>
  );
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function TurnipPicture({ image, fallbackPicture, answer }) {
  const [hasError, setHasError] = useState(false);
  const src = `${import.meta.env.BASE_URL}${image}`;

  if (hasError) {
    return (
      <div className="turnip-picture turnip-picture-placeholder">
        <span>{fallbackPicture}</span>
        <small>Add {image.split("/").at(-1)}</small>
      </div>
    );
  }

  return (
    <div className="turnip-picture">
      <img
        src={src}
        alt={answer}
        width="280"
        height="200"
        loading="eager"
        decoding="async"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function completedKey(sectionIndex, levelIndex) {
  return `${sectionIndex}-${levelIndex}`;
}

function questionCount(level) {
  return level.qCount ?? level.questions.length;
}

function turnipColor(sectionIndex) {
  return TURNIP_COLORS[sectionIndex % TURNIP_COLORS.length];
}

function turnipShadow(sectionIndex) {
  return TURNIP_SHADOWS[sectionIndex % TURNIP_SHADOWS.length];
}

function highlightTarget(sentence, target) {
  if (!target) return sentence;

  const targetIndex = sentence.toLowerCase().indexOf(target.toLowerCase());
  if (targetIndex < 0) return sentence;

  const before = sentence.slice(0, targetIndex);
  const match = sentence.slice(targetIndex, targetIndex + target.length);
  const after = sentence.slice(targetIndex + target.length);

  return (
    <>
      {before}
      <span className="story-target">{match}</span>
      {after}
    </>
  );
}
