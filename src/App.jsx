import { useState } from "react";
import { Confetti } from "./components/Confetti";
import { GameBody } from "./components/GameBody";
import { ReviewRows } from "./components/ReviewRows";
import { SidePanel } from "./components/SidePanel";
import { StarQuiz } from "./components/StarQuiz";
import { SunWindQuiz } from "./components/SunWindQuiz";
import { Topbar } from "./components/Topbar";
import { TurnipQuiz } from "./components/TurnipQuiz";
import {
  CORRECT_MESSAGES,
  LEVEL_COLORS,
  LEVEL_DESCRIPTIONS,
  LEVEL_EMOJIS,
  LEVEL_SHADOWS,
  LEVELS,
  MASCOTS,
  TRY_AGAIN_MESSAGES,
} from "./data/gameContent";
import { useAudio } from "./hooks/useAudio";
import { buildQuestions, pick, shuffle, starsFor } from "./utils/gameUtils";
import "./styles/game.css";

const SCREENS = {
  TREE: "tree",
  HOME: "home",
  GAME: "game",
  REVIEW: "review",
  FINAL: "final",
  TURNIP: "turnip",
  STAR: "star",
  SUN_WIND: "sun_wind",
};

const MODES = {
  ALL: "all",
  SINGLE: "single",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.TREE);
  const [mode, setMode] = useState(MODES.ALL);
  const [levelIdx, setLevelIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  const [completed, setCompleted] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wordBank, setWordBank] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const [wordOrderChecked, setWordOrderChecked] = useState(false);
  const [wordOrderResult, setWordOrderResult] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [muted, setMuted] = useState(false);
  const [activeMascot, setActiveMascot] = useState(0);

  const sfx = useAudio(muted);
  const level = LEVELS[levelIdx];
  const mascot = MASCOTS[activeMascot];
  const question = questions[questionIdx] ?? null;
  const answeredCurrentQuestion = Boolean(feedback || wordOrderChecked);
  const progress = questions.length ? ((questionIdx + (answeredCurrentQuestion ? 1 : 0)) / questions.length) * 100 : 0;
  const showSidePanel = ![SCREENS.TREE, SCREENS.TURNIP, SCREENS.STAR, SCREENS.SUN_WIND].includes(screen);

  function launchLevel(nextLevelIdx, gameMode = MODES.SINGLE) {
    const nextLevel = LEVELS[nextLevelIdx];
    const nextQuestions = buildQuestions(nextLevel.type, nextLevel.qCount);

    setMode(gameMode);
    setLevelIdx(nextLevelIdx);
    setQuestions(nextQuestions);
    setQuestionIdx(0);
    setHearts(3);
    setScore(0);
    setHistory([]);
    setFeedback(null);
    setSelectedOption(null);
    resetWordOrderState(nextLevel.type, nextQuestions[0]);
    setScreen(SCREENS.GAME);
  }

  function startAllLevels() {
    setAllHistory([]);
    launchLevel(0, MODES.ALL);
  }

  function recordAnswer(currentQuestion, given, correct) {
    const entry = {
      sentence: currentQuestion.sentence ?? currentQuestion.answer,
      answer: currentQuestion.answer,
      given,
      correct,
      type: level.type,
    };

    setHistory((currentHistory) => [...currentHistory, entry]);
    if (mode === MODES.ALL) {
      setAllHistory((currentHistory) => [...currentHistory, entry]);
    }
  }

  function handleOption(option) {
    if (feedback) return;

    const isCorrect = option === question.answer;

    setSelectedOption(option);
    recordAnswer(question, option, isCorrect);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      sfx.correct();
      setFeedback({ ok: true, msg: pick(CORRECT_MESSAGES) });
      return;
    }

    setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    sfx.wrong();
    setFeedback({ ok: false, msg: `The answer is "${question.answer}". ${pick(TRY_AGAIN_MESSAGES)}` });
  }

  function checkWordOrder() {
    const given = chosenWords.map((word) => word.word).join(" ");
    const isCorrect = given.trim().toLowerCase() === question.answer.trim().toLowerCase();

    setWordOrderChecked(true);
    recordAnswer(question, given, isCorrect);

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
      sfx.correct();
      setWordOrderResult({ ok: true, msg: pick(CORRECT_MESSAGES) });
      return;
    }

    setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    sfx.wrong();
    setWordOrderResult({ ok: false, msg: `Correct: "${question.answer}"` });
  }

  function goNext() {
    if (questionIdx + 1 >= questions.length) {
      finishLevel();
      return;
    }

    const nextQuestionIdx = questionIdx + 1;

    setQuestionIdx(nextQuestionIdx);
    setFeedback(null);
    setSelectedOption(null);
    resetWordOrderState(level.type, questions[nextQuestionIdx]);
  }

  function finishLevel() {
    sfx.levelUp();
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2800);
    setCompleted((currentCompleted) => new Set([...currentCompleted, levelIdx]));
    setScreen(SCREENS.REVIEW);
  }

  function continueAfterReview() {
    if (mode === MODES.ALL && levelIdx + 1 < LEVELS.length) {
      launchLevel(levelIdx + 1, MODES.ALL);
      return;
    }

    setScreen(mode === MODES.ALL ? SCREENS.FINAL : SCREENS.HOME);
  }

  function addWord(bankIndex) {
    if (wordOrderChecked) return;

    sfx.tap();
    setWordBank((currentBank) => currentBank.map((word, index) => (index === bankIndex ? { ...word, used: true } : word)));
    setChosenWords((currentWords) => [...currentWords, { word: wordBank[bankIndex].word, bankIdx: bankIndex }]);
  }

  function removeWord(position) {
    if (wordOrderChecked) return;

    sfx.tap();
    const wordToRemove = chosenWords[position];

    setWordBank((currentBank) => currentBank.map((word, index) => (index === wordToRemove.bankIdx ? { ...word, used: false } : word)));
    setChosenWords((currentWords) => currentWords.filter((_, index) => index !== position));
  }

  function resetWordOrderState(levelType, nextQuestion) {
    if (levelType === "word_order" && nextQuestion) {
      setWordBank(shuffle(nextQuestion.words).map((word, bankIdx) => ({ word, bankIdx, used: false })));
    } else {
      setWordBank([]);
    }

    setChosenWords([]);
    setWordOrderChecked(false);
    setWordOrderResult(null);
  }

  function handleHomeMuteToggle() {
    setMuted((currentMuted) => !currentMuted);
  }

  return (
    <div className={`app-root${showSidePanel ? "" : " app-root-map"}`}>
      {confetti && <Confetti />}
      {showSidePanel && <SidePanel mascot={mascot} />}

      <div className={`game-col${showSidePanel ? "" : " tree-col"}`}>
        {screen === SCREENS.TREE && (
          <LearningTreeScreen
            completed={completed}
            muted={muted}
            onToggleMute={handleHomeMuteToggle}
            onOpenPronouns={() => {
              sfx.tap();
              setScreen(SCREENS.HOME);
            }}
            onOpenTurnip={() => {
              sfx.tap();
              setScreen(SCREENS.TURNIP);
            }}
            onOpenStar={() => {
              sfx.tap();
              setScreen(SCREENS.STAR);
            }}
            onOpenSunWind={() => {
              sfx.tap();
              setScreen(SCREENS.SUN_WIND);
            }}
          />
        )}

        {screen === SCREENS.HOME && (
          <HomeScreen
            mascot={mascot}
            completed={completed}
            activeMascot={activeMascot}
            muted={muted}
            onToggleMute={handleHomeMuteToggle}
            onBackToTree={() => setScreen(SCREENS.TREE)}
            onStartAll={() => {
              sfx.tap();
              startAllLevels();
            }}
            onChooseLevel={(nextLevelIdx) => {
              sfx.tap();
              launchLevel(nextLevelIdx, MODES.SINGLE);
            }}
            onChooseMascot={(mascotIdx) => {
              sfx.tap();
              setActiveMascot(mascotIdx);
            }}
          />
        )}

        {screen === SCREENS.GAME && (
          <GameScreen
            level={level}
            levelIdx={levelIdx}
            question={question}
            questionIdx={questionIdx}
            progress={progress}
            hearts={hearts}
            muted={muted}
            selectedOption={selectedOption}
            feedback={feedback}
            wordBank={wordBank}
            chosenWords={chosenWords}
            wordOrderChecked={wordOrderChecked}
            wordOrderResult={wordOrderResult}
            onBack={() => setScreen(SCREENS.HOME)}
            onToggleMute={() => setMuted((currentMuted) => !currentMuted)}
            onSelectOption={handleOption}
            onAddWord={addWord}
            onRemoveWord={removeWord}
            onCheckWordOrder={checkWordOrder}
            onNext={goNext}
          />
        )}

        {screen === SCREENS.REVIEW && (
          <ReviewScreen
            level={level}
            levelIdx={levelIdx}
            mode={mode}
            score={score}
            totalQuestions={questions.length}
            history={history}
            muted={muted}
            hearts={hearts}
            onBack={() => setScreen(SCREENS.HOME)}
            onToggleMute={() => setMuted((currentMuted) => !currentMuted)}
            onContinue={continueAfterReview}
            onRetry={() => launchLevel(levelIdx, mode)}
          />
        )}

        {screen === SCREENS.FINAL && (
          <FinalScreen
            allHistory={allHistory}
            muted={muted}
            hearts={hearts}
            onBack={() => setScreen(SCREENS.HOME)}
            onToggleMute={() => setMuted((currentMuted) => !currentMuted)}
            onPlayAgain={() => {
              setAllHistory([]);
              startAllLevels();
            }}
          />
        )}

        {screen === SCREENS.TURNIP && (
          <TurnipTopicScreen
            muted={muted}
            onToggleMute={handleHomeMuteToggle}
            onBackToTree={() => setScreen(SCREENS.TREE)}
          />
        )}

        {screen === SCREENS.STAR && (
          <StarTopicScreen
            muted={muted}
            onToggleMute={handleHomeMuteToggle}
            onBackToTree={() => setScreen(SCREENS.TREE)}
          />
        )}

        {screen === SCREENS.SUN_WIND && (
          <SunWindTopicScreen
            muted={muted}
            onToggleMute={handleHomeMuteToggle}
            onBackToTree={() => setScreen(SCREENS.TREE)}
          />
        )}
      </div>
    </div>
  );
}

function LearningTreeScreen({ completed, muted, onToggleMute, onOpenPronouns, onOpenTurnip, onOpenStar, onOpenSunWind }) {
  const pronounStars = completed.size * 3;

  return (
    <>
      <div className="topbar tree-topbar">
        <span className="topbar-logo">🌟 Study Quest</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <div className="scroll tree-scroll">
        <div className="tree-header">
          <div className="tree-kicker">English path</div>
          <h1>Choose a topic</h1>
          <p>Practice one skill at a time and unlock more activities as the project grows.</p>
        </div>

        <div className="topic-path">
          <TopicNode
            icon="🌟"
            title="Personal Pronouns"
            subtitle="I, you, he, she, it, we, they"
            meta={`${completed.size} / ${LEVELS.length} levels done · ${pronounStars} stars`}
            status="Ready"
            tone="green"
            onClick={onOpenPronouns}
          />

          <div className="path-line" />

          <TopicNode
            icon="📖"
            title="The Enormous Turnip"
            subtitle="Story vocabulary and comprehension"
            meta="4 sections · 13 practice sets"
            status="Ready"
            tone="blue"
            onClick={onOpenTurnip}
          />

          <div className="path-line" />

          <TopicNode
            icon="⭐"
            title="The Star and the Colours"
            subtitle="Colours, weather, and story order"
            meta="3 quick practice sets"
            status="Ready"
            tone="yellow"
            onClick={onOpenStar}
          />

          <div className="path-line" />

          <TopicNode
            icon="☀️"
            title="The Sun and the Wind"
            subtitle="Weather, animals, and competition"
            meta="5 quick practice sets"
            status="Ready"
            tone="orange"
            onClick={onOpenSunWind}
          />
        </div>
      </div>
    </>
  );
}

function TopicNode({ icon, title, subtitle, meta, status, tone, onClick }) {
  return (
    <button className={`topic-node ${tone}`} onClick={onClick}>
      <span className="topic-icon">{icon}</span>
      <span className="topic-copy">
        <span className="topic-title">{title}</span>
        <span className="topic-subtitle">{subtitle}</span>
        <span className="topic-meta">{meta}</span>
      </span>
      <span className="topic-status">{status}</span>
    </button>
  );
}

function HomeScreen({
  mascot,
  completed,
  activeMascot,
  muted,
  onToggleMute,
  onBackToTree,
  onStartAll,
  onChooseLevel,
  onChooseMascot,
}) {
  return (
    <>
      <div className="topbar">
        <button className="icon-btn" onClick={onBackToTree}>
          ← Tree
        </button>
        <span className="topbar-logo">🌟 Pronoun Quest!</span>
        <div className="topbar-icons">
          <button className="icon-btn" onClick={onToggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>

      <div className="scroll">
        <div className="home-hero">
          <span className="mascot-display">{mascot.emoji}</span>
          <div className="speech-bubble">{mascot.greeting}</div>
          <div className="home-title">Personal Pronouns</div>
          <div className="home-sub">3 levels · Practice English · ¡Tú puedes! 💪</div>
        </div>

        <button className="play-btn" onClick={onStartAll}>
          🚀 Let's Play!
        </button>

        <div className="divider">or choose a level</div>

        {LEVELS.map((level, index) => (
          <LevelCard
            key={level.id}
            level={level}
            levelIdx={index}
            isCompleted={completed.has(index)}
            onChoose={() => onChooseLevel(index)}
          />
        ))}

        <MascotLibrary
          completed={completed}
          activeMascot={activeMascot}
          onChooseMascot={onChooseMascot}
        />
      </div>
    </>
  );
}

function TurnipTopicScreen({ muted, onToggleMute, onBackToTree }) {
  return (
    <TurnipQuiz
      muted={muted}
      sfx={useAudio(muted)}
      onToggleMute={onToggleMute}
      onBackToTree={onBackToTree}
    />
  );
}

function StarTopicScreen({ muted, onToggleMute, onBackToTree }) {
  return (
    <StarQuiz
      muted={muted}
      sfx={useAudio(muted)}
      onToggleMute={onToggleMute}
      onBackToTree={onBackToTree}
    />
  );
}

function SunWindTopicScreen({ muted, onToggleMute, onBackToTree }) {
  return (
    <SunWindQuiz
      muted={muted}
      sfx={useAudio(muted)}
      onToggleMute={onToggleMute}
      onBackToTree={onBackToTree}
    />
  );
}

function LevelCard({ level, levelIdx, isCompleted, onChoose }) {
  return (
    <div className={`level-card${isCompleted ? " done" : ""}`} onClick={onChoose}>
      <div className="lc-icon">{LEVEL_EMOJIS[levelIdx]}</div>
      <div className="lc-info">
        <div className="lc-name" style={{ color: LEVEL_COLORS[levelIdx] }}>
          {level.name} · {level.title}
        </div>
        <div className="lc-desc">{LEVEL_DESCRIPTIONS[levelIdx]}</div>
      </div>
      <div className="lc-right">
        <div className="lc-stars">{isCompleted ? "⭐⭐⭐" : "☆☆☆"}</div>
        <div className="lc-arr">›</div>
      </div>
    </div>
  );
}

function MascotLibrary({ completed, activeMascot, onChooseMascot }) {
  return (
    <div className="mascot-lib">
      <div className="lib-title">🎒 My Mascots — tap to choose your buddy!</div>
      <div className="mascot-grid">
        {MASCOTS.map((mascot, index) => {
          const isUnlocked = index === 0 || completed.has(index - 1);
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

function GameScreen({
  level,
  levelIdx,
  question,
  questionIdx,
  progress,
  hearts,
  muted,
  selectedOption,
  feedback,
  wordBank,
  chosenWords,
  wordOrderChecked,
  wordOrderResult,
  onBack,
  onToggleMute,
  onSelectOption,
  onAddWord,
  onRemoveWord,
  onCheckWordOrder,
  onNext,
}) {
  return (
    <>
      <Topbar
        title={`${LEVEL_EMOJIS[levelIdx]} ${level.name}: ${level.title}`}
        hearts={hearts}
        muted={muted}
        color={LEVEL_COLORS[levelIdx]}
        onBack={onBack}
        onToggleMute={onToggleMute}
      />
      <div className="prog-wrap">
        <div
          className="prog-bar"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${LEVEL_COLORS[levelIdx]}, ${LEVEL_SHADOWS[levelIdx]})`,
          }}
        />
      </div>
      <div className="scroll">
        <GameBody
          question={question}
          level={level}
          levelIdx={levelIdx}
          questionIdx={questionIdx}
          selectedOption={selectedOption}
          feedback={feedback}
          wordBank={wordBank}
          chosenWords={chosenWords}
          wordOrderChecked={wordOrderChecked}
          wordOrderResult={wordOrderResult}
          onSelectOption={onSelectOption}
          onAddWord={onAddWord}
          onRemoveWord={onRemoveWord}
          onCheckWordOrder={onCheckWordOrder}
          onNext={onNext}
        />
      </div>
    </>
  );
}

function ReviewScreen({
  level,
  levelIdx,
  mode,
  score,
  totalQuestions,
  history,
  hearts,
  muted,
  onBack,
  onToggleMute,
  onContinue,
  onRetry,
}) {
  const hasNextLevel = mode === MODES.ALL && levelIdx + 1 < LEVELS.length;

  return (
    <>
      <Topbar
        title={`${level.name} · Review`}
        hearts={hearts}
        muted={muted}
        color={LEVEL_COLORS[levelIdx]}
        onBack={onBack}
        onToggleMute={onToggleMute}
      />
      <div className="scroll">
        <div className="review-header">
          <span className="rv-mascot">{LEVEL_EMOJIS[levelIdx]}</span>
          <h2>{level.title} Done! 🎊</h2>
          <div className="rv-score">
            Score: {score} / {totalQuestions}
          </div>
          <div className="stars">
            {[...Array(3)].map((_, index) => (index < starsFor(score, totalQuestions) ? "⭐" : "☆")).join(" ")}
          </div>
        </div>

        <ReviewRows entries={history} />

        <div className="review-actions">
          {hasNextLevel ? (
            <button
              className="next-btn"
              style={{ background: LEVEL_COLORS[levelIdx + 1], boxShadow: `0 5px 0 ${LEVEL_SHADOWS[levelIdx + 1]}` }}
              onClick={onContinue}
            >
              Next: {LEVELS[levelIdx + 1].title} →
            </button>
          ) : mode === MODES.ALL ? (
            <button
              className="next-btn"
              style={{ background: "#ffc800", boxShadow: "0 5px 0 #cc9f00", color: "#333" }}
              onClick={onContinue}
            >
              See Final Results! 🏆
            </button>
          ) : (
            <button
              className="next-btn"
              style={{ background: "#58cc02", boxShadow: "0 5px 0 #3da800" }}
              onClick={onContinue}
            >
              ← Back to Menu
            </button>
          )}
          <button className="ghost-btn" onClick={onRetry}>
            🔄 Retry this level
          </button>
          <button className="ghost-btn" onClick={onBack}>
            ← Back to Menu
          </button>
        </div>
      </div>
    </>
  );
}

function FinalScreen({ allHistory, hearts, muted, onBack, onToggleMute, onPlayAgain }) {
  const correctAnswers = allHistory.filter((entry) => entry.correct).length;

  return (
    <>
      <Topbar
        title="¡All Done! 🏆"
        hearts={hearts}
        muted={muted}
        showBack={false}
        onBack={onBack}
        onToggleMute={onToggleMute}
      />
      <div className="scroll">
        <div className="final-header">
          <span className="final-trophy">🏆</span>
          <h2>¡You did it! Amazing!</h2>
          <div className="final-stars">⭐⭐⭐⭐⭐</div>
          <div className="score-pill">
            {correctAnswers} / {allHistory.length} correct
          </div>
          <p className="final-message">{finalMessage(correctAnswers, allHistory.length)}</p>
        </div>

        <div className="tip-box">
          <strong>📌 Quick reminder:</strong>
          <br />• <strong>I am</strong> — talking about yourself
          <br />• <strong>You are</strong> — talking to someone
          <br />• <strong>He / She / It is</strong> — one person or thing
          <br />• <strong>We / They / You are</strong> — groups
          <br />• <strong>It</strong> = objects &amp; animals 🐶🪑
        </div>

        {allHistory.length > 0 && <ReviewRows entries={allHistory} />}

        <div className="final-actions">
          <button
            className="next-btn"
            style={{ background: "#58cc02", boxShadow: "0 5px 0 #3da800" }}
            onClick={onPlayAgain}
          >
            🔄 Play Again
          </button>
          <button className="ghost-btn" onClick={onBack}>
            ← Back to Menu
          </button>
        </div>
      </div>
    </>
  );
}

function finalMessage(correctAnswers, totalAnswers) {
  if (correctAnswers === totalAnswers) return "¡Perfect! You're a star! 🌟";
  if (correctAnswers >= totalAnswers * 0.8) return "Almost perfect! 💪";
  return "Keep practicing! 📚";
}
