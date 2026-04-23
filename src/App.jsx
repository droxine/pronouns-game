import { useState, useEffect, useRef } from "react"; // npm install // npm run dev 

// ─── DATA ────────────────────────────────────────────────────────────────────

const VERB_BE_QUESTIONS = [
  { sentence: "She ___ happy.", answer: "is", options: ["is", "are", "am"], hint: "👧 one girl" },
  { sentence: "I ___ a student.", answer: "am", options: ["is", "am", "are"], hint: "🙋 talking about yourself" },
  { sentence: "We ___ friends.", answer: "are", options: ["is", "are", "am"], hint: "👫 you + others" },
  { sentence: "They ___ sad.", answer: "are", options: ["are", "am", "is"], hint: "👨‍👩‍👦 a group" },
  { sentence: "My brother ___ happy.", answer: "is", options: ["is", "are", "am"], hint: "👦 one boy" },
  { sentence: "Diego ___ my brother.", answer: "is", options: ["is", "are", "am"], hint: "👦 one person" },
  { sentence: "She ___ my sister.", answer: "is", options: ["is", "are", "am"], hint: "👧 one girl" },
  { sentence: "Rafaella ___ a teacher.", answer: "is", options: ["is", "are", "am"], hint: "👩‍🏫 one person" },
  { sentence: "You ___ very smart!", answer: "are", options: ["is", "are", "am"], hint: "😊 talking to someone" },
  { sentence: "He ___ my friend.", answer: "is", options: ["is", "are", "am"], hint: "👦 one boy" },
  { sentence: "It ___ a big dog.", answer: "is", options: ["is", "are", "am"], hint: "🐶 one thing/animal" },
  { sentence: "We ___ in school.", answer: "are", options: ["is", "are", "am"], hint: "👨‍👩‍👧 you + others" },
  { sentence: "They ___ brothers.", answer: "are", options: ["are", "am", "is"], hint: "👬 two or more people" },
  { sentence: "I ___ seven years old.", answer: "am", options: ["am", "is", "are"], hint: "🙋 talking about yourself" },
  { sentence: "The cat ___ white.", answer: "is", options: ["is", "are", "am"], hint: "🐱 one animal" },
];

const PRONOUN_QUESTIONS = [
  { sentence: "___ are friends.", answer: "They", options: ["You", "We", "They"], hint: "👨‍👩‍👦 3 friends (not you!)", emoji: "👉👬" },
  { sentence: "___ am happy today. It's my birthday!", answer: "I", options: ["You", "He", "I"], hint: "🙋 pointing to yourself", emoji: "🎂" },
  { sentence: "___ are italian.", answer: "You", options: ["She", "You", "I"], hint: "👉 one person talking to another", emoji: "🇮🇹" },
  { sentence: "___ are brothers.", answer: "They", options: ["You", "He", "They"], hint: "👬 pointing at 2 other boys", emoji: "👉👬" },
  { sentence: "___ is in the garden.", answer: "She", options: ["You", "She", "He"], hint: "👧 a girl with a ponytail", emoji: "👧" },
  { sentence: "___ is a boy.", answer: "He", options: ["They", "She", "He"], hint: "👦 one boy", emoji: "👦" },
  { sentence: "This is a calculator. ___ is grey.", answer: "It", options: ["He", "It", "They"], hint: "📱 a thing (not a person!)", emoji: "📱" },
  { sentence: "___ are ten years old.", answer: "They", options: ["They", "We", "She"], hint: "👉👉 pointing at other kids", emoji: "👉👬" },
  { sentence: "___ is my mom.", answer: "She", options: ["He", "She", "It"], hint: "👩 a woman", emoji: "👩" },
  { sentence: "___ are in the park.", answer: "We", options: ["They", "We", "I"], hint: "🙋 you + your friend together", emoji: "👨‍👩‍👦🌳" },
  { sentence: "___ is my dog.", answer: "It", options: ["He", "It", "She"], hint: "🐶 a pet (thing)", emoji: "🐶" },
  { sentence: "___ am a student.", answer: "I", options: ["I", "You", "We"], hint: "🙋 about yourself!", emoji: "📚" },
];

const SENTENCE_ORDER = [
  { words: ["the", "cat", "on", "the", "table", "is", "."], answer: "the cat is on the table .", hint: "🐱 Where is the cat?" },
  { words: ["the", "ball", "next", "to", "the", "clock", "is", "."], answer: "the ball is next to the clock .", hint: "⚽ Where is the ball?" },
  { words: ["the", "spider", "is", "behind", "the", "chair", "."], answer: "the spider is behind the chair .", hint: "🕷️ Where is the spider?" },
  { words: ["the", "monster", "is", "in", "the", "box", "."], answer: "the monster is in the box .", hint: "👾 Where is the monster?" },
  { words: ["the", "pencil", "is", "under", "the", "mat", "."], answer: "the pencil is under the mat .", hint: "✏️ Where is the pencil?" },
  { words: ["the", "ball", "is", "under", "the", "window", "."], answer: "the ball is under the window .", hint: "⚽ Where is the ball?" },
  { words: ["the", "apple", "is", "next", "to", "the", "clock", "."], answer: "the apple is next to the clock .", hint: "🍎 Where is the apple?" },
  { words: ["the", "horse", "is", "behind", "the", "tree", "."], answer: "the horse is behind the tree .", hint: "🐴 Where is the horse?" },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const STARS = ["⭐", "🌟", "✨"];
const MASCOTS = ["🦄", "🐸", "🐼", "🦊", "🐨", "🦋"];
const ENCOURAGEMENTS_CORRECT = ["¡Excelente! 🎉", "¡Perfecto! ⭐", "¡Muy bien! 🌟", "¡Correcto! 🎊", "¡Genial! 💫", "¡Lo lograste! 🏆"];
const ENCOURAGEMENTS_WRONG = ["¡Casi! 💪 Try again!", "¡No te rindas! 🤗", "¡Tú puedes! ✨", "¡Inténtalo de nuevo! 🎯"];

// ─── STYLES ─────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sky: #58cc02;
    --sky2: #4caf00;
    --blue: #1cb0f6;
    --blue2: #0a98d8;
    --red: #ff4b4b;
    --yellow: #ffc800;
    --purple: #ce82ff;
    --bg: #f0faf0;
    --card: #ffffff;
    --text: #3c3c3c;
    --muted: #888;
    --radius: 16px;
  }

  body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  .app {
    max-width: 480px;
    margin: 0 auto;
    padding: 16px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* HEADER */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .header-title {
    font-family: 'Fredoka One', cursive;
    font-size: 1.5rem;
    color: var(--sky2);
    flex: 1;
  }
  .hearts { font-size: 1.1rem; letter-spacing: 2px; }

  /* PROGRESS BAR */
  .progress-wrap {
    background: #e0e0e0;
    border-radius: 99px;
    height: 14px;
    overflow: hidden;
    margin-bottom: 20px;
    flex-shrink: 0;
  }
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--sky), var(--blue));
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* CARD */
  .card {
    background: var(--card);
    border-radius: var(--radius);
    padding: 24px 20px 20px;
    box-shadow: 0 4px 0 #d0d0d0;
    margin-bottom: 20px;
    flex: 1;
  }

  .level-badge {
    display: inline-block;
    background: var(--yellow);
    color: #333;
    font-weight: 800;
    font-size: 0.75rem;
    border-radius: 99px;
    padding: 2px 10px;
    margin-bottom: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .question-emoji {
    font-size: 3rem;
    text-align: center;
    margin: 8px 0 16px;
    display: block;
  }

  .hint {
    background: #fffbea;
    border: 2px dashed var(--yellow);
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 0.85rem;
    color: #777;
    margin-bottom: 14px;
    text-align: center;
  }

  .question-text {
    font-size: 1.4rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 20px;
    line-height: 1.5;
    color: #222;
  }
  .blank { color: var(--blue); font-size: 1.6rem; }

  /* OPTIONS */
  .options { display: flex; flex-direction: column; gap: 10px; }
  .opt-btn {
    padding: 14px 20px;
    border-radius: 12px;
    border: 2.5px solid #e0e0e0;
    background: white;
    font-family: 'Nunito', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    text-align: left;
    box-shadow: 0 3px 0 #e0e0e0;
    color: var(--text);
  }
  .opt-btn:hover:not(:disabled) { border-color: var(--blue); transform: translateY(-1px); box-shadow: 0 4px 0 #b0d0ff; }
  .opt-btn.correct { background: #d7ffb8; border-color: var(--sky); box-shadow: 0 3px 0 var(--sky2); color: #1a6600; }
  .opt-btn.wrong { background: #ffd0d0; border-color: var(--red); box-shadow: 0 3px 0 #cc0000; color: #7a0000; }
  .opt-btn:disabled { cursor: default; }

  /* FEEDBACK BAR */
  .feedback {
    border-radius: var(--radius);
    padding: 16px 20px;
    margin-top: 10px;
    font-size: 1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .feedback.correct { background: #d7ffb8; color: #1a6600; }
  .feedback.wrong { background: #ffd0d0; color: #7a0000; }

  /* NEXT BUTTON */
  .next-btn {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: none;
    background: var(--sky);
    color: white;
    font-family: 'Fredoka One', cursive;
    font-size: 1.3rem;
    cursor: pointer;
    box-shadow: 0 4px 0 var(--sky2);
    transition: all 0.15s;
    margin-top: 14px;
  }
  .next-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 var(--sky2); }
  .next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--sky2); }

  /* WORD ORDER */
  .wo-target {
    min-height: 52px;
    background: #f8f8f8;
    border: 2.5px dashed #ccc;
    border-radius: 12px;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
    align-items: center;
  }
  .wo-target.has-words { border-style: solid; border-color: var(--blue); background: #f0f8ff; }
  .word-chip {
    background: white;
    border: 2px solid var(--blue);
    color: var(--blue);
    border-radius: 8px;
    padding: 6px 12px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    box-shadow: 0 2px 0 #a0c8f0;
    transition: all 0.1s;
    font-family: 'Nunito', sans-serif;
  }
  .word-chip:hover { transform: scale(1.05); }
  .word-chip.in-answer { background: var(--blue); color: white; }
  .word-bank {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  .word-chip.used { opacity: 0.3; pointer-events: none; }

  .check-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: var(--yellow);
    color: #333;
    font-family: 'Fredoka One', cursive;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 0 #cc9900;
    transition: all 0.15s;
    margin-bottom: 10px;
  }
  .check-btn:hover:not(:disabled) { transform: translateY(-2px); }
  .check-btn:disabled { opacity: 0.5; cursor: default; }

  /* CELEBRATION / LEVEL UP */
  .celebrate {
    text-align: center;
    padding: 32px 20px;
  }
  .celebrate .big-emoji { font-size: 5rem; animation: bounce 0.6s infinite alternate; }
  .celebrate h2 { font-family: 'Fredoka One', cursive; font-size: 2rem; color: var(--sky2); margin: 12px 0 8px; }
  .celebrate p { color: #555; font-size: 1rem; }
  .stars-row { font-size: 2rem; letter-spacing: 4px; margin: 12px 0; }

  @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-12px); } }
  @keyframes pop { 0% { transform: scale(0.8); opacity:0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity:1; } }
  .pop { animation: pop 0.35s ease forwards; }

  /* HOME SCREEN */
  .home {
    text-align: center;
    padding: 20px 0;
  }
  .home .mascot { font-size: 6rem; margin: 20px 0 10px; }
  .home h1 { font-family: 'Fredoka One', cursive; font-size: 2.2rem; color: var(--sky2); line-height: 1.2; margin-bottom: 8px; }
  .home p { color: #666; font-size: 1rem; margin-bottom: 28px; }
  .start-btn {
    background: var(--sky);
    color: white;
    border: none;
    border-radius: 14px;
    padding: 18px 40px;
    font-family: 'Fredoka One', cursive;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 5px 0 var(--sky2);
    transition: all 0.15s;
    width: 100%;
    max-width: 320px;
  }
  .start-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 0 var(--sky2); }

  .levels-preview {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 24px;
    flex-wrap: wrap;
  }
  .level-pill {
    background: #e8f4e8;
    border: 2px solid var(--sky);
    border-radius: 99px;
    padding: 6px 16px;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--sky2);
  }

  /* FINAL SCREEN */
  .final {
    text-align: center;
    padding: 30px 16px;
  }
  .trophy { font-size: 6rem; }
  .final h2 { font-family: 'Fredoka One', cursive; font-size: 2rem; color: var(--sky2); margin: 12px 0 6px; }
  .score-pill {
    display: inline-block;
    background: var(--yellow);
    border-radius: 99px;
    padding: 8px 24px;
    font-size: 1.3rem;
    font-weight: 800;
    margin: 10px 0;
  }
  .retry-btn {
    width: 100%;
    max-width: 320px;
    padding: 16px;
    border-radius: 12px;
    border: none;
    background: var(--blue);
    color: white;
    font-family: 'Fredoka One', cursive;
    font-size: 1.3rem;
    cursor: pointer;
    box-shadow: 0 4px 0 var(--blue2);
    margin-top: 20px;
    transition: all 0.15s;
  }
  .retry-btn:hover { transform: translateY(-2px); }

  .tip-box {
    background: #fff8e1;
    border-left: 4px solid var(--yellow);
    border-radius: 10px;
    padding: 12px 16px;
    text-align: left;
    margin-top: 20px;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #555;
  }
  .tip-box strong { color: #333; }
`;

// ─── LEVELS CONFIG ────────────────────────────────────────────────────────────

const LEVELS = [
  { id: 1, name: "Level 1", title: "AM, IS or ARE?", type: "verb_be", emoji: "🐣", color: "#58cc02", desc: "Complete the sentence with AM, IS or ARE" },
  { id: 2, name: "Level 2", title: "WHO is it?", type: "pronoun", emoji: "🐥", color: "#1cb0f6", desc: "Choose the right pronoun (I, You, He, She, It, We, They)" },
  { id: 3, name: "Level 3", title: "Build the Sentence!", type: "word_order", emoji: "🐓", color: "#ce82ff", desc: "Put the words in order to make a sentence" },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home"); // home | game | levelup | final
  const [levelIdx, setLevelIdx] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | {correct, msg}
  const [selectedOpt, setSelectedOpt] = useState(null);
  // word order state
  const [chosenWords, setChosenWords] = useState([]);
  const [woChecked, setWoChecked] = useState(false);
  const [woResult, setWoResult] = useState(null);

  const mascot = MASCOTS[levelIdx % MASCOTS.length];

  function buildQuestions(type) {
    if (type === "verb_be") return shuffle(VERB_BE_QUESTIONS).slice(0, 6);
    if (type === "pronoun") return shuffle(PRONOUN_QUESTIONS).slice(0, 6);
    if (type === "word_order") return shuffle(SENTENCE_ORDER).slice(0, 5);
    return [];
  }

  function startGame() {
    const qs = buildQuestions(LEVELS[0].type);
    setQuestions(qs);
    setQIdx(0);
    setLevelIdx(0);
    setHearts(3);
    setScore(0);
    setTotalAnswered(0);
    setFeedback(null);
    setSelectedOpt(null);
    setChosenWords([]);
    setWoChecked(false);
    setWoResult(null);
    setScreen("game");
  }

  function nextLevel() {
    const nextIdx = levelIdx + 1;
    if (nextIdx >= LEVELS.length) {
      setScreen("final");
      return;
    }
    const qs = buildQuestions(LEVELS[nextIdx].type);
    setLevelIdx(nextIdx);
    setQuestions(qs);
    setQIdx(0);
    setFeedback(null);
    setSelectedOpt(null);
    setChosenWords([]);
    setWoChecked(false);
    setWoResult(null);
    setScreen("game");
  }

  function handleOption(opt) {
    if (feedback) return;
    const q = questions[qIdx];
    setSelectedOpt(opt);
    const correct = opt === q.answer;
    setTotalAnswered(t => t + 1);
    if (correct) {
      setScore(s => s + 1);
      setFeedback({ correct: true, msg: ENCOURAGEMENTS_CORRECT[Math.floor(Math.random() * ENCOURAGEMENTS_CORRECT.length)] });
    } else {
      setHearts(h => Math.max(0, h - 1));
      setFeedback({ correct: false, msg: `The answer is: ${q.answer} — ${ENCOURAGEMENTS_WRONG[Math.floor(Math.random() * ENCOURAGEMENTS_WRONG.length)]}` });
    }
  }

  function goNext() {
    const nextQ = qIdx + 1;
    if (nextQ >= questions.length) {
      setScreen("levelup");
      return;
    }
    setQIdx(nextQ);
    setFeedback(null);
    setSelectedOpt(null);
    setChosenWords([]);
    setWoChecked(false);
    setWoResult(null);
  }

  function addWord(word, idx) {
    if (woChecked) return;
    setChosenWords(prev => [...prev, { word, idx }]);
  }

  function removeWord(pos) {
    if (woChecked) return;
    setChosenWords(prev => prev.filter((_, i) => i !== pos));
  }

  function checkWordOrder() {
    const q = questions[qIdx];
    const attempt = chosenWords.map(w => w.word).join(" ");
    const correct = attempt.toLowerCase() === q.answer.toLowerCase();
    setWoChecked(true);
    setTotalAnswered(t => t + 1);
    if (correct) {
      setScore(s => s + 1);
      setWoResult({ correct: true, msg: ENCOURAGEMENTS_CORRECT[Math.floor(Math.random() * ENCOURAGEMENTS_CORRECT.length)] });
    } else {
      setHearts(h => Math.max(0, h - 1));
      setWoResult({ correct: false, msg: `The correct sentence is: "${q.answer}"` });
    }
  }

  const level = LEVELS[levelIdx];
  const q = questions[qIdx];
  const progress = questions.length > 0 ? ((qIdx + (feedback || woChecked ? 1 : 0)) / questions.length) * 100 : 0;

  // ── RENDER ──

  if (screen === "home") return (
    <div className="app">
      <style>{css}</style>
      <div className="home">
        <div className="mascot">🦄</div>
        <h1>Personal Pronouns!</h1>
        <p>Let's practice English together 🌟<br />3 fun levels to master pronouns!</p>
        <button className="start-btn" onClick={startGame}>¡Let's Play! 🚀</button>
        <div className="levels-preview">
          {LEVELS.map(l => (
            <div key={l.id} className="level-pill">{l.emoji} {l.name}</div>
          ))}
        </div>
      </div>
    </div>
  );

  if (screen === "levelup") return (
    <div className="app">
      <style>{css}</style>
      <div className="celebrate pop">
        <div className="big-emoji">{level.emoji}</div>
        <h2>{level.title} — ¡Complete! 🎊</h2>
        <div className="stars-row">⭐⭐⭐</div>
        <p>¡Fantástico! You finished Level {level.id}!</p>
        <br />
        {levelIdx + 1 < LEVELS.length ? (
          <>
            <p style={{ color: "#888", marginBottom: 20 }}>Ready for the next challenge?</p>
            <button className="next-btn" onClick={nextLevel}>
              Next Level: {LEVELS[levelIdx + 1].emoji} {LEVELS[levelIdx + 1].title} →
            </button>
          </>
        ) : (
          <button className="next-btn" onClick={() => setScreen("final")}>See my results! 🏆</button>
        )}
      </div>
    </div>
  );

  if (screen === "final") return (
    <div className="app">
      <style>{css}</style>
      <div className="final">
        <div className="trophy">🏆</div>
        <h2>¡You did it! Amazing! 🎉</h2>
        <div className="stars-row">⭐⭐⭐⭐⭐</div>
        <div className="score-pill">Score: {score} / {totalAnswered}</div>
        <p style={{ color: "#555", marginTop: 10 }}>
          {score === totalAnswered ? "¡Perfect! You're a pronoun star! 🌟" :
           score >= totalAnswered * 0.8 ? "¡Excellent work! Almost perfect! 💪" :
           "¡Good job! Keep practicing! 📚"}
        </p>
        <div className="tip-box">
          <strong>📌 Quick reminder for the exam:</strong><br />
          • <strong>I am</strong> — talking about yourself<br />
          • <strong>You are</strong> — talking to one person<br />
          • <strong>He/She/It is</strong> — one person or thing<br />
          • <strong>We/They/You are</strong> — groups<br />
          • <strong>It</strong> = objects, animals, things 🐶🪑
        </div>
        <button className="retry-btn" onClick={() => setScreen("home")}>Play Again! 🔄</button>
      </div>
    </div>
  );

  // ── GAME SCREEN ──
  return (
    <div className="app">
      <style>{css}</style>
      <div className="header">
        <span style={{ fontSize: "1.5rem" }}>{mascot}</span>
        <span className="header-title">{level.name}: {level.title}</span>
        <span className="hearts">{Array.from({ length: 3 }, (_, i) => i < hearts ? "❤️" : "🖤").join("")}</span>
      </div>

      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {level.type !== "word_order" && q && (
        <div className="card pop" key={qIdx}>
          <div className="level-badge">{level.desc}</div>
          {q.emoji && <span className="question-emoji">{q.emoji}</span>}
          <div className="hint">{q.hint}</div>
          <div className="question-text">
            {q.sentence.split("___").map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <span className="blank">___</span>}</span>
            ))}
          </div>
          <div className="options">
            {q.options.map(opt => (
              <button
                key={opt}
                className={`opt-btn${selectedOpt === opt ? (opt === q.answer ? " correct" : " wrong") : ""}`}
                onClick={() => handleOption(opt)}
                disabled={!!feedback}
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback && (
            <div className={`feedback ${feedback.correct ? "correct" : "wrong"}`}>
              {feedback.correct ? "✅" : "❌"} {feedback.msg}
            </div>
          )}
          {feedback && (
            <button className="next-btn" onClick={goNext}>
              {qIdx + 1 >= questions.length ? "Finish Level! 🎉" : "Next →"}
            </button>
          )}
        </div>
      )}

      {level.type === "word_order" && q && (
        <div className="card pop" key={qIdx}>
          <div className="level-badge">{level.desc}</div>
          <div className="hint" style={{ marginBottom: 16 }}>{q.hint} Put the words in the right order!</div>

          <div className={`wo-target${chosenWords.length > 0 ? " has-words" : ""}`}>
            {chosenWords.length === 0 && <span style={{ color: "#aaa", fontSize: "0.9rem", padding: "4px 8px" }}>Tap words below to build the sentence...</span>}
            {chosenWords.map((w, i) => (
              <button key={i} className="word-chip in-answer" onClick={() => removeWord(i)} disabled={woChecked}>{w.word}</button>
            ))}
          </div>

          <div className="word-bank">
            {shuffle(q.words).map((word, i) => {
              const usedCount = chosenWords.filter(w => w.word === word).length;
              const totalCount = q.words.filter(w => w === word).length;
              const isUsed = usedCount >= totalCount;
              return (
                <button
                  key={`${word}-${i}`}
                  className={`word-chip${isUsed ? " used" : ""}`}
                  onClick={() => !isUsed && addWord(word, i)}
                  disabled={woChecked || isUsed}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <button
            className="check-btn"
            onClick={checkWordOrder}
            disabled={chosenWords.length === 0 || woChecked}
          >
            Check! ✅
          </button>

          {woResult && (
            <>
              <div className={`feedback ${woResult.correct ? "correct" : "wrong"}`}>
                {woResult.correct ? "✅" : "❌"} {woResult.msg}
              </div>
              <button className="next-btn" onClick={goNext}>
                {qIdx + 1 >= questions.length ? "Finish Level! 🎉" : "Next →"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}