import { useState, useEffect, useRef } from "react"; // npm install // npm run dev 

// ─── DATA ────────────────────────────────────────────────────────────────────

const VERB_BE_QS = [
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

const PRONOUN_QS = [
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

const WORD_ORDER_QS = [
  { words: ["the", "cat", "on", "the", "table", "is", "."], answer: "the cat is on the table .", hint: "🐱 Where is the cat?" },
  { words: ["the", "ball", "next", "to", "the", "clock", "is", "."], answer: "the ball is next to the clock .", hint: "⚽ Where is the ball?" },
  { words: ["the", "spider", "is", "behind", "the", "chair", "."], answer: "the spider is behind the chair .", hint: "🕷️ Where is the spider?" },
  { words: ["the", "monster", "is", "in", "the", "box", "."], answer: "the monster is in the box .", hint: "👾 Where is the monster?" },
  { words: ["the", "pencil", "is", "under", "the", "mat", "."], answer: "the pencil is under the mat .", hint: "✏️ Where is the pencil?" },
  { words: ["the", "ball", "is", "under", "the", "window", "."], answer: "the ball is under the window .", hint: "⚽ Where is the ball?" },
  { words: ["the", "apple", "is", "next", "to", "the", "clock", "."], answer: "the apple is next to the clock .", hint: "🍎 Where is the apple?" },
  { words: ["the", "horse", "is", "behind", "the", "tree", "."], answer: "the horse is behind the tree .", hint: "🐴 Where is the horse?" },
];

const LEVELS = [
  { id:0, name:"Level 1", title:"AM, IS or ARE?",   type:"verb_be",    qCount:6 },
  { id:1, name:"Level 2", title:"Who is it?",        type:"pronoun",    qCount:6 },
  { id:2, name:"Level 3", title:"Build a Sentence!", type:"word_order", qCount:5 },
];

const MASCOTS = [
  { id:0, emoji:"🦄", name:"Uni",     greeting:"Hi! I'm Uni! Let's learn pronouns! 🌟",    color:"#c084fc" },
  { id:1, emoji:"🐸", name:"Froggy",  greeting:"Ribbit! I'm Froggy! You can do it! 💪",    color:"#4ade80" },
  { id:2, emoji:"🦋", name:"Flutter", greeting:"I'm Flutter! Let's build sentences! ✨",    color:"#60a5fa" },
];

const OK   = ["¡Excelente! 🎉","¡Perfecto! ⭐","¡Muy bien! 🌟","¡Correcto! 🎊","¡Genial! 💫","Super! 🏆","Amazing! 🌈","You got it! 🎯"];
const OOPS = ["¡Casi! 💪","¡No te rindas! 🤗","¡Tú puedes! ✨","Keep going! 🎯","Try again! 🔁"];

function shuffle(a){ return [...a].sort(()=>Math.random()-.5); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

// ─── AUDIO ────────────────────────────────────────────────────────────────────
function useAudio(muted){
  const ref = useRef(null);
  function ctx(){ if(!ref.current) ref.current = new (window.AudioContext||window.webkitAudioContext)(); return ref.current; }
  function beep(freq,dur,type="sine",vol=.15){
    if(muted) return;
    try{
      const c=ctx(),o=c.createOscillator(),g=c.createGain();
      o.connect(g);g.connect(c.destination);o.type=type;o.frequency.value=freq;
      g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);
      o.start();o.stop(c.currentTime+dur);
    }catch{}
  }
  return {
    correct: ()=>{ beep(523,.09);setTimeout(()=>beep(659,.09),90);setTimeout(()=>beep(784,.2),180); },
    wrong:   ()=>{ beep(220,.18,"sawtooth",.1);setTimeout(()=>beep(165,.28,"sawtooth",.08),150); },
    levelUp: ()=>{ [0,100,200,340].forEach((t,i)=>setTimeout(()=>beep([523,659,784,1047][i],.22),t)); },
    tap:     ()=>beep(440,.05,"sine",.07),
  };
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function Confetti(){
  const dots = Array.from({length:45},(_,i)=>({
    id:i, left:Math.random()*100, color:["#58cc02","#1cb0f6","#ffc800","#ce82ff","#ff4b4b","#ff9600","#ff69b4"][i%7],
    delay:Math.random()*.8, dur:1.4+Math.random()*.9, size:7+Math.random()*9,
  }));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {dots.map(d=>(
        <div key={d.id} style={{
          position:"absolute",left:`${d.left}%`,top:"-20px",
          width:d.size,height:d.size,background:d.color,
          borderRadius:d.size>12?"3px":"50%",
          animation:`cfFall ${d.dur}s ${d.delay}s linear forwards`,
        }}/>
      ))}
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');

@keyframes cfFall  { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(110vh) rotate(540deg);opacity:0} }
@keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes popIn   { 0%{transform:scale(.5);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
@keyframes pulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { height: 100%; }
body {
  font-family: 'Nunito', sans-serif;
  background: #e8f5e9;
  color: #2d3748;
  height: 100%;
  overflow: hidden; /* no body scroll — we scroll inside panels */
}

/* ── ROOT LAYOUT: two-column on desktop, single column on mobile ── */
#root, .app-root {
  height: 100vh;
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, #e0f7e9 0%, #d0eeff 100%);
}

/* Left decorative panel — only visible on large screens */
.side-panel {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 32px;
  background: linear-gradient(170deg, #58cc02 0%, #1cb0f6 100%);
  color: white;
  min-width: 260px;
  max-width: 300px;
}
@media (min-width: 860px) { .side-panel { display: flex; } }

.side-title { font-family:'Fredoka One',cursive; font-size:2rem; line-height:1.2; text-align:center; text-shadow:0 2px 8px rgba(0,0,0,.2); }
.side-sub   { font-size:.95rem; opacity:.85; text-align:center; line-height:1.5; }
.side-rule  { background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.4) 50%, rgba(255,255,255,0) 100%); height:2px; width:100%; border-radius:99px; }
.side-tip   { font-size:.88rem; opacity:.9; line-height:1.8; text-align:left; background:rgba(255,255,255,.15); border-radius:14px; padding:14px 18px; width:100%; }
.side-tip strong { opacity:1; font-weight:800; }

/* Main game column */
.game-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  max-width: 580px;      /* caps width even when side panel is hidden on mobile */
  margin: 0 auto;        /* center it when side panel is gone */
}

/* ── TOP BAR ── */
.topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px 10px;
  background: transparent;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}
.topbar-logo { font-family:'Fredoka One',cursive; font-size:1.25rem; color:#58cc02; flex:1; }
.topbar-icons { display:flex; align-items:center; gap:8px; }
.icon-btn {
  background:white; border:2px solid #e8e8e8; cursor:pointer; border-radius:10px;
  padding:6px 10px; font-size:.95rem; font-family:'Fredoka One',cursive;
  color:#666; transition:all .15s; box-shadow:0 2px 0 #e0e0e0; white-space:nowrap;
}
.icon-btn:hover { background:#f5f5f5; transform:translateY(-1px); }
.icon-btn:active { transform:translateY(1px); box-shadow:0 1px 0 #e0e0e0; }
.hearts { font-size:1.1rem; letter-spacing:2px; }

/* Progress bar */
.prog-wrap { margin:0 20px 10px; background:#dde; border-radius:99px; height:13px; overflow:hidden; flex-shrink:0; }
.prog-bar  { height:100%; border-radius:99px; transition:width .45s ease; }

/* ── SCROLL CONTAINER ── */
.scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 20px 32px;
  -webkit-overflow-scrolling: touch;
  /* hide scrollbar but keep scrolling */
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}
.scroll::-webkit-scrollbar { width:5px; }
.scroll::-webkit-scrollbar-thumb { background:#ccc; border-radius:99px; }

/* ── HOME ── */
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 20px;
  text-align: center;
}
.mascot-display {
  font-size: 7rem;
  line-height: 1;
  display: block;
  animation: float 3s ease-in-out infinite;
  margin-bottom: 6px;
  /* prevent clipping */
  padding: 12px 0 4px;
  overflow: visible;
}
.speech-bubble {
  position: relative;
  background: white;
  border: 2.5px solid #e0e0e0;
  border-radius: 18px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 700;
  color: #555;
  margin-bottom: 16px;
  max-width: 320px;
  box-shadow: 0 3px 10px rgba(0,0,0,.07);
}
.speech-bubble::before {
  content:'';position:absolute;top:-13px;left:50%;transform:translateX(-50%);
  border:7px solid transparent;border-bottom-color:#e0e0e0;
}
.speech-bubble::after {
  content:'';position:absolute;top:-9px;left:50%;transform:translateX(-50%);
  border:6px solid transparent;border-bottom-color:white;
}
.home-title { font-family:'Fredoka One',cursive; font-size:2rem; color:#58cc02; margin-bottom:4px; }
.home-sub   { color:#aaa; font-size:.9rem; margin-bottom:24px; }

/* Big play button */
.play-btn {
  width:100%; max-width:360px; padding:20px 28px;
  border-radius:18px; border:none;
  background:#58cc02; color:white;
  font-family:'Fredoka One',cursive; font-size:1.6rem;
  cursor:pointer; box-shadow:0 6px 0 #3da800;
  transition:all .15s; animation:popIn .5s ease;
}
.play-btn:hover  { transform:translateY(-3px); box-shadow:0 9px 0 #3da800; }
.play-btn:active { transform:translateY(3px);  box-shadow:0 3px 0 #3da800; }

/* Divider */
.divider {
  display:flex; align-items:center; gap:12px;
  margin:20px 0 14px; color:#bbb; font-size:.8rem; font-weight:800;
  text-transform:uppercase; letter-spacing:1.2px;
}
.divider::before,.divider::after { content:''; flex:1; height:1.5px; background:#ddd; }

/* Level pick cards */
.level-card {
  display:flex; align-items:center; gap:14px;
  background:white; border:2.5px solid #eee; border-radius:16px;
  padding:15px 18px; margin-bottom:10px; cursor:pointer;
  transition:all .15s; box-shadow:0 4px 0 #e0e0e0;
}
.level-card:hover  { border-color:#58cc02; transform:translateY(-2px); box-shadow:0 6px 0 #c8eeb8; }
.level-card:active { transform:translateY(2px); box-shadow:0 2px 0 #e0e0e0; }
.level-card.done   { border-color:#58cc02; background:#f5fff2; }
.lc-icon  { font-size:2.4rem; flex-shrink:0; }
.lc-info  { flex:1; min-width:0; }
.lc-name  { font-family:'Fredoka One',cursive; font-size:1.05rem; color:#333; }
.lc-desc  { font-size:.8rem; color:#bbb; margin-top:2px; }
.lc-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
.lc-stars { font-size:.95rem; }
.lc-arr   { font-size:1.4rem; color:#ccc; }

/* ── MASCOT LIBRARY ── */
.mascot-lib { background:white; border:2px solid #eee; border-radius:18px; padding:16px 18px; margin-top:4px; }
.lib-title  { font-family:'Fredoka One',cursive; color:#aaa; font-size:.9rem; margin-bottom:14px; }
.mascot-grid { display:flex; gap:14px; flex-wrap:wrap; }
.mascot-card {
  display:flex; flex-direction:column; align-items:center; gap:6px;
  background:#f9f9f9; border:2.5px solid #eee; border-radius:14px;
  padding:12px 14px; min-width:90px; transition:all .2s;
}
.mascot-card.unlocked { border-color:#58cc02; background:#f0fff4; cursor:pointer; }
.mascot-card.unlocked:hover { transform:translateY(-3px); box-shadow:0 5px 0 #c8eeb8; }
.mascot-card.active   { border-color:#ffc800; background:#fffbea; box-shadow:0 0 0 3px #ffeaa0; }
.mascot-card.locked   { opacity:.5; }
.m-emoji  { font-size:2.4rem; filter:grayscale(1) opacity(.25); transition:filter .4s; padding:4px 0; }
.m-emoji.on  { filter:none; animation:popIn .4s ease; }
.m-name   { font-family:'Fredoka One',cursive; font-size:.75rem; color:#aaa; text-align:center; }
.m-name.on{ color:#58cc02; }
.choose-btn {
  background:#58cc02; color:white; border:none; border-radius:8px;
  padding:4px 10px; font-family:'Fredoka One',cursive; font-size:.75rem;
  cursor:pointer; transition:all .15s; box-shadow:0 2px 0 #3da800;
}
.choose-btn:hover  { transform:translateY(-1px); box-shadow:0 3px 0 #3da800; }
.choose-btn.active { background:#ffc800; box-shadow:0 2px 0 #cc9f00; color:#333; }
.locked-icon { font-size:.9rem; color:#ccc; }

/* ── QUESTION CARD ── */
.q-card {
  background:white; border-radius:20px;
  padding:24px 22px 22px;
  box-shadow:0 6px 0 #d4d4d4;
  margin-bottom:14px; animation:slideUp .3s ease;
}
.q-badge {
  display:inline-block; background:#ffc800; color:#555;
  font-weight:800; font-size:.72rem; border-radius:99px;
  padding:3px 12px; margin-bottom:12px;
  text-transform:uppercase; letter-spacing:.8px;
}
.q-emoji { font-size:3.2rem; text-align:center; display:block; margin:6px 0 14px; }
.hint-box {
  background:#fffcea; border:2px dashed #ffc800; border-radius:12px;
  padding:8px 14px; font-size:.88rem; color:#aaa; text-align:center; margin-bottom:16px;
}
.q-text {
  font-size:1.5rem; font-weight:800; text-align:center;
  margin-bottom:20px; line-height:1.5; color:#1a202c;
}
.q-blank { color:#1cb0f6; }

/* Options */
.options { display:flex; flex-direction:column; gap:10px; }
.opt-btn {
  padding:15px 20px; border-radius:14px; border:2.5px solid #e8e8e8;
  background:white; font-family:'Nunito',sans-serif;
  font-size:1.1rem; font-weight:700; cursor:pointer;
  transition:all .15s; text-align:left;
  box-shadow:0 4px 0 #e0e0e0; color:#2d3748; width:100%;
}
.opt-btn:hover:not(:disabled) { border-color:#1cb0f6; transform:translateY(-2px); box-shadow:0 6px 0 #b0d8f0; }
.opt-btn:active:not(:disabled){ transform:translateY(1px); box-shadow:0 3px 0 #e0e0e0; }
.opt-btn.correct { background:#d7ffb8; border-color:#58cc02; box-shadow:0 4px 0 #46a302; color:#1a5800; }
.opt-btn.wrong   { background:#ffd0d0; border-color:#ff4b4b; box-shadow:0 4px 0 #cc3333; color:#7a0000; animation:shake .3s ease; }
.opt-btn:disabled { cursor:default; }

/* Feedback */
.feedback {
  border-radius:13px; padding:14px 18px; margin-top:12px;
  font-size:.95rem; font-weight:800;
  display:flex; align-items:flex-start; gap:9px; line-height:1.5;
}
.feedback.correct { background:#d7ffb8; color:#1a5800; }
.feedback.wrong   { background:#ffd0d0; color:#7a0000; }

/* Word chips */
.wo-area {
  min-height:60px; background:#f7f8fa; border:2.5px dashed #ccc;
  border-radius:14px; padding:9px; display:flex; flex-wrap:wrap;
  gap:7px; margin-bottom:14px; align-items:center; transition:all .2s;
}
.wo-area.active { border-color:#1cb0f6; border-style:solid; background:#eef8ff; }
.wo-ph { color:#ccc; font-size:.88rem; font-weight:600; padding:2px 6px; }
.word-bank { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.chip {
  background:white; border:2.5px solid #1cb0f6; color:#1cb0f6;
  border-radius:9px; padding:7px 13px; font-weight:700; font-size:.95rem;
  cursor:pointer; box-shadow:0 3px 0 #90ccf0; transition:all .1s;
  font-family:'Nunito',sans-serif; user-select:none; -webkit-user-select:none;
  -webkit-tap-highlight-color:transparent;
}
.chip:active { transform:scale(.92); }
.chip.chosen { background:#1cb0f6; color:white; box-shadow:0 3px 0 #0a90d0; }
.chip.used   { opacity:.22; pointer-events:none; border-style:dashed; }

/* Action buttons */
.check-btn {
  width:100%; padding:15px; border-radius:14px; border:none;
  background:#ffc800; color:#333; font-family:'Fredoka One',cursive;
  font-size:1.2rem; cursor:pointer; box-shadow:0 5px 0 #cc9f00;
  transition:all .15s; margin-bottom:8px;
}
.check-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 7px 0 #cc9f00; }
.check-btn:active:not(:disabled){ transform:translateY(3px);  box-shadow:0 2px 0 #cc9f00; }
.check-btn:disabled { opacity:.35; cursor:default; }

.next-btn {
  width:100%; padding:16px; border-radius:14px; border:none; color:white;
  font-family:'Fredoka One',cursive; font-size:1.25rem;
  cursor:pointer; transition:all .15s; margin-top:10px;
}
.next-btn:hover  { transform:translateY(-2px); }
.next-btn:active { transform:translateY(3px); }

.ghost-btn {
  width:100%; padding:13px; border-radius:13px; border:2px solid #ddd;
  background:white; color:#aaa; font-family:'Fredoka One',cursive;
  font-size:1rem; cursor:pointer; transition:all .15s; margin-top:8px;
}
.ghost-btn:hover { background:#f5f5f5; border-color:#ccc; color:#888; }

/* ── REVIEW TABLE ── */
.review-header {
  text-align:center; padding:18px 0 8px;
}
.review-header .rv-mascot { font-size:4rem; display:block; animation:bounce .8s ease infinite alternate; margin-bottom:8px; }
.review-header h2 { font-family:'Fredoka One',cursive; font-size:1.7rem; color:#58cc02; margin-bottom:4px; }
.review-header .rv-score { font-family:'Fredoka One',cursive; color:#aaa; font-size:1rem; margin-bottom:4px; }
.review-header .stars { font-size:1.6rem; letter-spacing:5px; margin-bottom:16px; }

.review-list { margin-bottom:6px; }
.rv-title { font-family:'Fredoka One',cursive; font-size:.95rem; color:#888; margin-bottom:10px; }
.rv-row {
  background:white; border-radius:14px; padding:13px 16px;
  margin-bottom:8px; border-left:5px solid #eee;
  box-shadow:0 2px 0 #eee; animation:slideUp .3s ease both;
}
.rv-row.ok  { border-left-color:#58cc02; background:#f5fff2; }
.rv-row.bad { border-left-color:#ff4b4b; background:#fff5f5; }
.rv-top { display:flex; align-items:flex-start; gap:8px; margin-bottom:4px; }
.rv-icon { font-size:1.1rem; flex-shrink:0; padding-top:1px; }
.rv-q    { font-weight:800; font-size:.92rem; color:#333; flex:1; line-height:1.4; }
.rv-detail { font-size:.82rem; color:#999; padding-left:26px; line-height:1.7; }
.rv-right  { color:#1a8000; font-weight:800; }
.rv-wrong  { color:#cc2200; font-weight:800; }

/* ── FINAL ── */
.final-header { text-align:center; padding:20px 0 12px; }
.final-trophy { font-size:5rem; display:block; margin-bottom:10px; }
.final-header h2 { font-family:'Fredoka One',cursive; font-size:2rem; color:#58cc02; }
.score-pill { display:inline-block; background:#ffc800; border-radius:99px; padding:9px 26px; font-size:1.2rem; font-weight:800; margin:10px 0 6px; }

.tip-box {
  background:#fffcea; border-left:4px solid #ffc800; border-radius:12px;
  padding:14px 18px; font-size:.9rem; line-height:1.8; color:#666; margin:14px 0;
}
.tip-box strong { color:#333; }
`;

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,       setScreen]      = useState("home");
  const [mode,         setMode]        = useState("all");
  const [levelIdx,     setLevelIdx]    = useState(0);
  const [questions,    setQuestions]   = useState([]);
  const [qIdx,         setQIdx]        = useState(0);
  const [hearts,       setHearts]      = useState(3);
  const [score,        setScore]       = useState(0);
  const [history,      setHistory]     = useState([]);
  const [allHistory,   setAllHistory]  = useState([]);
  const [completed,    setCompleted]   = useState(new Set());
  const [feedback,     setFeedback]    = useState(null);
  const [selOpt,       setSelOpt]      = useState(null);
  const [wordBank,     setWordBank]    = useState([]);
  const [chosen,       setChosen]      = useState([]);
  const [woChecked,    setWoChecked]   = useState(false);
  const [woResult,     setWoResult]    = useState(null);
  const [confetti,     setConfetti]    = useState(false);
  const [muted,        setMuted]       = useState(false);
  const [activeMascot, setActiveMascot]= useState(0); // index into MASCOTS

  const sfx    = useAudio(muted);
  const lv     = LEVELS[levelIdx];
  const mascot = MASCOTS[activeMascot];
  const q      = questions[qIdx] ?? null;
  const pct    = questions.length ? ((qIdx+((feedback||woChecked)?1:0))/questions.length)*100 : 0;

  function buildQs(type, count){
    const src = type==="verb_be"?VERB_BE_QS:type==="pronoun"?PRONOUN_QS:WORD_ORDER_QS;
    return shuffle(src).slice(0,count);
  }

  function launchLevel(idx, gameMode="single"){
    const l = LEVELS[idx];
    setMode(gameMode); setLevelIdx(idx);
    setQuestions(buildQs(l.type,l.qCount));
    setQIdx(0); setHearts(3); setScore(0); setHistory([]);
    setFeedback(null); setSelOpt(null);
    setWordBank([]); setChosen([]); setWoChecked(false); setWoResult(null);
    setScreen("game");
  }

  function startAll(){
    setAllHistory([]);
    launchLevel(0,"all");
  }

  // init word bank when q changes
  useEffect(()=>{
    if(lv?.type==="word_order" && q){
      setWordBank(shuffle(q.words).map((w,i)=>({word:w,bankIdx:i,used:false})));
      setChosen([]); setWoChecked(false); setWoResult(null);
    }
  },[qIdx,questions]);

  function record(q, given, correct){
    const e={sentence:q.sentence??q.answer, answer:q.answer, given, correct, type:lv.type};
    setHistory(h=>[...h,e]);
    if(mode==="all") setAllHistory(h=>[...h,e]);
  }

  function handleOpt(opt){
    if(feedback) return;
    const ok = opt===q.answer;
    setSelOpt(opt); record(q,opt,ok);
    if(ok){ setScore(s=>s+1); sfx.correct(); setFeedback({ok:true,  msg:pick(OK)}); }
    else  { setHearts(h=>Math.max(0,h-1)); sfx.wrong(); setFeedback({ok:false, msg:`The answer is "${q.answer}". ${pick(OOPS)}`}); }
  }

  function checkWO(){
    const attempt = chosen.map(w=>w.word).join(" ").trim().toLowerCase();
    const ok = attempt===q.answer.trim().toLowerCase();
    const given = chosen.map(w=>w.word).join(" ");
    setWoChecked(true); record(q,given,ok);
    if(ok){ setScore(s=>s+1); sfx.correct(); setWoResult({ok:true,  msg:pick(OK)}); }
    else  { setHearts(h=>Math.max(0,h-1)); sfx.wrong(); setWoResult({ok:false, msg:`Correct: "${q.answer}"`}); }
  }

  function goNext(){
    if(qIdx+1>=questions.length){
      sfx.levelUp();
      setConfetti(true); setTimeout(()=>setConfetti(false),2800);
      setCompleted(s=>new Set([...s,levelIdx]));
      setScreen("review");
    } else {
      setQIdx(i=>i+1); setFeedback(null); setSelOpt(null);
    }
  }

  function afterReview(){
    if(mode==="all" && levelIdx+1<LEVELS.length){ launchLevel(levelIdx+1,"all"); }
    else if(mode==="all"){ setScreen("final"); }
    else { setScreen("home"); }
  }

  function addWord(bi){
    if(woChecked) return; sfx.tap();
    setWordBank(wb=>wb.map((w,i)=>i===bi?{...w,used:true}:w));
    setChosen(c=>[...c,{word:wordBank[bi].word,bankIdx:bi}]);
  }
  function removeWord(pos){
    if(woChecked) return; sfx.tap();
    const e=chosen[pos];
    setWordBank(wb=>wb.map((w,i)=>i===e.bankIdx?{...w,used:false}:w));
    setChosen(c=>c.filter((_,i)=>i!==pos));
  }

  function starsFor(sc,tot){ return Math.round((sc/tot)*3); }

  // ── COMPONENTS ──────────────────────────────────────────────────────────────

  function Topbar({title, showBack=true, color="#58cc02"}){
    return (
      <div className="topbar">
        {showBack && <button className="icon-btn" onClick={()=>setScreen("home")}>← Menu</button>}
        {!showBack && <span style={{fontFamily:"'Fredoka One',cursive",color,fontSize:"1.15rem",flex:1}}>🌟 Pronoun Quest!</span>}
        {showBack && <span className="topbar-logo" style={{color}}>{title}</span>}
        <div className="topbar-icons">
          <span className="hearts">{[...Array(3)].map((_,i)=>i<hearts?"❤️":"🖤").join("")}</span>
          <button className="icon-btn" onClick={()=>setMuted(m=>!m)}>{muted?"🔇":"🔊"}</button>
        </div>
      </div>
    );
  }

  function ReviewRows({entries}){
    return (
      <div className="review-list">
        <div className="rv-title">📋 Your Answers</div>
        {entries.map((e,i)=>(
          <div key={i} className={`rv-row ${e.correct?"ok":"bad"}`} style={{animationDelay:`${i*.07}s`}}>
            <div className="rv-top">
              <span className="rv-icon">{e.correct?"✅":"❌"}</span>
              <span className="rv-q">{e.type==="word_order"?`Build: "${e.answer}"`:e.sentence}</span>
            </div>
            <div className="rv-detail">
              {!e.correct && <>Your answer: <span className="rv-wrong">{e.given}</span> · </>}
              Correct: <span className="rv-right">{e.answer}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function GameBody(){
    if(!q) return null;
    const isWO = lv.type==="word_order";
    return (
      <div className="q-card" key={qIdx}>
        <div className="q-badge">{lv.type==="verb_be"?"Pick the right word!":lv.type==="pronoun"?"Pick the right pronoun!":"Put the words in order!"}</div>
        {!isWO && q.emoji && <span className="q-emoji">{q.emoji}</span>}
        <div className="hint-box">{q.hint}</div>

        {!isWO && <>
          <div className="q-text">
            {q.sentence.split("___").map((p,i,a)=>(
              <span key={i}>{p}{i<a.length-1&&<span className="q-blank">___</span>}</span>
            ))}
          </div>
          <div className="options">
            {q.options.map(opt=>(
              <button key={opt}
                className={`opt-btn${selOpt===opt?(opt===q.answer?" correct":" wrong"):""}`}
                onClick={()=>handleOpt(opt)} disabled={!!feedback}>
                {opt}
              </button>
            ))}
          </div>
          {feedback && <div className={`feedback ${feedback.ok?"correct":"wrong"}`}>{feedback.ok?"✅ ":"❌ "}{feedback.msg}</div>}
          {feedback && <button className="next-btn" style={{background:["#58cc02","#1cb0f6","#ce82ff"][levelIdx],boxShadow:`0 5px 0 ${["#3da800","#0a90d0","#a855d4"][levelIdx]}`}} onClick={goNext}>{qIdx+1>=questions.length?"See Results 📋":"Next →"}</button>}
        </>}

        {isWO && <>
          <div style={{marginBottom:6,fontSize:".85rem",color:"#aaa",fontWeight:700}}>Tap words to build the sentence, tap again to remove:</div>
          <div className={`wo-area${chosen.length>0?" active":""}`}>
            {chosen.length===0
              ? <span className="wo-ph">Tap words below…</span>
              : chosen.map((w,i)=><button key={i} className="chip chosen" onClick={()=>removeWord(i)} disabled={woChecked}>{w.word}</button>)
            }
          </div>
          <div className="word-bank">
            {wordBank.map((e,i)=>(
              <button key={i} className={`chip${e.used?" used":""}`} onClick={()=>!e.used&&addWord(i)} disabled={woChecked||e.used}>{e.word}</button>
            ))}
          </div>
          <button className="check-btn" onClick={checkWO} disabled={chosen.length===0||woChecked}>Check! ✅</button>
          {woResult && <div className={`feedback ${woResult.ok?"correct":"wrong"}`}>{woResult.ok?"✅ ":"❌ "}{woResult.msg}</div>}
          {woResult && <button className="next-btn" style={{background:"#ce82ff",boxShadow:"0 5px 0 #a855d4"}} onClick={goNext}>{qIdx+1>=questions.length?"See Results 📋":"Next →"}</button>}
        </>}
      </div>
    );
  }

  // ─── SIDE PANEL (desktop decoration) ────────────────────────────────────────
  function SidePanel(){
    return (
      <div className="side-panel">
        <div style={{fontSize:"4rem",animation:"float 3s ease-in-out infinite",paddingTop:8}}>{mascot.emoji}</div>
        <div className="side-title">Personal<br/>Pronouns</div>
        <div className="side-sub">Practice with {mascot.name}!<br/>3 fun levels 🌟</div>
        <div className="side-rule"/>
        <div className="side-tip">
          <strong>Quick guide:</strong><br/>
          I → <strong>am</strong><br/>
          You → <strong>are</strong><br/>
          He/She/It → <strong>is</strong><br/>
          We/They → <strong>are</strong><br/>
          It = things &amp; animals 🐶
        </div>
      </div>
    );
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-root">
      <style>{CSS}</style>
      {confetti && <Confetti/>}

      <SidePanel/>

      <div className="game-col">

        {/* ══ HOME ══ */}
        {screen==="home" && (
          <>
            <div className="topbar">
              <span className="topbar-logo">🌟 Pronoun Quest!</span>
              <div className="topbar-icons">
                <button className="icon-btn" onClick={()=>setMuted(m=>!m)}>{muted?"🔇":"🔊"}</button>
              </div>
            </div>
            <div className="scroll">
              <div className="home-hero">
                <span className="mascot-display">{mascot.emoji}</span>
                <div className="speech-bubble">{mascot.greeting}</div>
                <div className="home-title">Personal Pronouns</div>
                <div className="home-sub">3 levels · Practice English · ¡Tú puedes! 💪</div>
              </div>

              <button className="play-btn" onClick={()=>{sfx.tap();startAll();}}>🚀 Let's Play!</button>

              <div className="divider">or choose a level</div>

              {LEVELS.map((l,i)=>{
                const colors=["#58cc02","#1cb0f6","#ce82ff"];
                const emojis=["🦄","🐸","🦋"];
                const descs=["Complete with AM, IS or ARE","Pick I, You, He, She, It, We, They","Put the words in the right order"];
                return (
                  <div key={l.id} className={`level-card${completed.has(i)?" done":""}`} onClick={()=>{sfx.tap();launchLevel(i,"single");}}>
                    <div className="lc-icon">{emojis[i]}</div>
                    <div className="lc-info">
                      <div className="lc-name" style={{color:colors[i]}}>{l.name} · {l.title}</div>
                      <div className="lc-desc">{descs[i]}</div>
                    </div>
                    <div className="lc-right">
                      <div className="lc-stars">{completed.has(i)?"⭐⭐⭐":"☆☆☆"}</div>
                      <div className="lc-arr">›</div>
                    </div>
                  </div>
                );
              })}

              {/* MASCOT LIBRARY */}
              <div className="mascot-lib">
                <div className="lib-title">🎒 My Mascots — tap to choose your buddy!</div>
                <div className="mascot-grid">
                  {MASCOTS.map((m,i)=>{
                    const isUnlocked = i===0 || completed.has(i-1);
                    const isActive   = activeMascot===i;
                    return (
                      <div key={m.id} className={`mascot-card${isUnlocked?" unlocked":"  locked"}${isActive?" active":""}`}
                        onClick={()=>{ if(isUnlocked){ sfx.tap(); setActiveMascot(i); } }}>
                        <span className={`m-emoji${isUnlocked?" on":""}`}>{m.emoji}</span>
                        <span className={`m-name${isUnlocked?" on":""}`}>{isUnlocked?m.name:"???"}</span>
                        {isUnlocked
                          ? <button className={`choose-btn${isActive?" active":""}`} onClick={e=>{e.stopPropagation();sfx.tap();setActiveMascot(i);}}>
                              {isActive?"✓ Chosen":"Choose"}
                            </button>
                          : <span className="locked-icon">🔒</span>
                        }
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ GAME ══ */}
        {screen==="game" && (
          <>
            <Topbar title={`${["🦄","🐸","🦋"][levelIdx]} ${lv.name}: ${lv.title}`} color={["#58cc02","#1cb0f6","#ce82ff"][levelIdx]}/>
            <div className="prog-wrap">
              <div className="prog-bar" style={{width:`${pct}%`,background:`linear-gradient(90deg,${["#58cc02","#1cb0f6","#ce82ff"][levelIdx]},${["#3da800","#0a90d0","#a855d4"][levelIdx]})`}}/>
            </div>
            <div className="scroll"><GameBody/></div>
          </>
        )}

        {/* ══ REVIEW ══ */}
        {screen==="review" && (
          <>
            <Topbar title={`${lv.name} · Review`} color={["#58cc02","#1cb0f6","#ce82ff"][levelIdx]}/>
            <div className="scroll">
              <div className="review-header">
                <span className="rv-mascot">{["🦄","🐸","🦋"][levelIdx]}</span>
                <h2>{lv.title} Done! 🎊</h2>
                <div className="rv-score">Score: {score} / {questions.length}</div>
                <div className="stars">
                  {[...Array(3)].map((_,i)=>i<starsFor(score,questions.length)?"⭐":"☆").join(" ")}
                </div>
              </div>
              <ReviewRows entries={history}/>
              <div style={{marginTop:18}}>
                {mode==="all" && levelIdx+1<LEVELS.length
                  ? <button className="next-btn" style={{background:["#58cc02","#1cb0f6","#ce82ff"][levelIdx+1],boxShadow:`0 5px 0 ${["#3da800","#0a90d0","#a855d4"][levelIdx+1]}`}} onClick={afterReview}>
                      Next: {LEVELS[levelIdx+1].title} →
                    </button>
                  : mode==="all"
                  ? <button className="next-btn" style={{background:"#ffc800",boxShadow:"0 5px 0 #cc9f00",color:"#333"}} onClick={afterReview}>See Final Results! 🏆</button>
                  : <button className="next-btn" style={{background:"#58cc02",boxShadow:"0 5px 0 #3da800"}} onClick={afterReview}>← Back to Menu</button>
                }
                <button className="ghost-btn" onClick={()=>launchLevel(levelIdx,mode)}>🔄 Retry this level</button>
                <button className="ghost-btn" onClick={()=>setScreen("home")}>← Back to Menu</button>
              </div>
            </div>
          </>
        )}

        {/* ══ FINAL ══ */}
        {screen==="final" && (
          <>
            <Topbar title="¡All Done! 🏆" showBack={false}/>
            <div className="scroll">
              <div className="final-header">
                <span className="final-trophy">🏆</span>
                <h2>¡You did it! Amazing!</h2>
                <div style={{fontSize:"1.8rem",letterSpacing:5,margin:"8px 0"}}>⭐⭐⭐⭐⭐</div>
                <div className="score-pill">
                  {allHistory.filter(e=>e.correct).length} / {allHistory.length} correct
                </div>
                <p style={{color:"#aaa",fontSize:".9rem",marginBottom:14}}>
                  {allHistory.filter(e=>e.correct).length===allHistory.length?"¡Perfect! You're a star! 🌟"
                   :allHistory.filter(e=>e.correct).length>=allHistory.length*.8?"Almost perfect! 💪"
                   :"Keep practicing! 📚"}
                </p>
              </div>

              <div className="tip-box">
                <strong>📌 Quick reminder:</strong><br/>
                • <strong>I am</strong> — talking about yourself<br/>
                • <strong>You are</strong> — talking to someone<br/>
                • <strong>He / She / It is</strong> — one person or thing<br/>
                • <strong>We / They / You are</strong> — groups<br/>
                • <strong>It</strong> = objects &amp; animals 🐶🪑
              </div>

              {allHistory.length>0 && <ReviewRows entries={allHistory}/>}

              <div style={{marginTop:16}}>
                <button className="next-btn" style={{background:"#58cc02",boxShadow:"0 5px 0 #3da800"}}
                  onClick={()=>{setAllHistory([]);startAll();}}>🔄 Play Again</button>
                <button className="ghost-btn" onClick={()=>setScreen("home")}>← Back to Menu</button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}