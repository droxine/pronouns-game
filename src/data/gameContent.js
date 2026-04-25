export const VERB_BE_QUESTIONS = [
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

export const PRONOUN_QUESTIONS = [
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

export const WORD_ORDER_QUESTIONS = [
  { words: ["the", "cat", "on", "the", "table", "is", "."], answer: "the cat is on the table .", hint: "🐱 Where is the cat?" },
  { words: ["the", "ball", "next", "to", "the", "clock", "is", "."], answer: "the ball is next to the clock .", hint: "⚽ Where is the ball?" },
  { words: ["the", "spider", "is", "behind", "the", "chair", "."], answer: "the spider is behind the chair .", hint: "🕷️ Where is the spider?" },
  { words: ["the", "monster", "is", "in", "the", "box", "."], answer: "the monster is in the box .", hint: "👾 Where is the monster?" },
  { words: ["the", "pencil", "is", "under", "the", "mat", "."], answer: "the pencil is under the mat .", hint: "✏️ Where is the pencil?" },
  { words: ["the", "ball", "is", "under", "the", "window", "."], answer: "the ball is under the window .", hint: "⚽ Where is the ball?" },
  { words: ["the", "apple", "is", "next", "to", "the", "clock", "."], answer: "the apple is next to the clock .", hint: "🍎 Where is the apple?" },
  { words: ["the", "horse", "is", "behind", "the", "tree", "."], answer: "the horse is behind the tree .", hint: "🐴 Where is the horse?" },
];

export const LEVELS = [
  { id: 0, name: "Level 1", title: "AM, IS or ARE?", type: "verb_be", qCount: 6 },
  { id: 1, name: "Level 2", title: "Who is it?", type: "pronoun", qCount: 6 },
  { id: 2, name: "Level 3", title: "Build a Sentence!", type: "word_order", qCount: 5 },
];

export const MASCOTS = [
  { id: 0, emoji: "🦄", name: "Uni", greeting: "Hi! I'm Uni! Let's learn pronouns! 🌟", color: "#c084fc" },
  { id: 1, emoji: "🐸", name: "Froggy", greeting: "Ribbit! I'm Froggy! You can do it! 💪", color: "#4ade80" },
  { id: 2, emoji: "🦋", name: "Flutter", greeting: "I'm Flutter! Let's build sentences! ✨", color: "#60a5fa" },
];

export const CORRECT_MESSAGES = [
  "Excellent! 🎉",
  "Perfect! ⭐",
  "Very nice! 🌟",
  "Correct! 🎊",
  "Cool! 💫",
  "Super! 🏆",
  "Amazing! 🌈",
  "You got it! 🎯",
];

export const TRY_AGAIN_MESSAGES = [
  "¡Almost! 💪",
  "¡Don't give up! 🤗",
  "¡You CAN! ✨",
  "Keep going! 🎯",
  "Try again! 🔁",
];

export const LEVEL_COLORS = ["#58cc02", "#1cb0f6", "#ce82ff"];
export const LEVEL_SHADOWS = ["#3da800", "#0a90d0", "#a855d4"];
export const LEVEL_EMOJIS = ["🦄", "🐸", "🦋"];
export const LEVEL_DESCRIPTIONS = [
  "Complete with AM, IS or ARE",
  "Pick I, You, He, She, It, We, They",
  "Put the words in the right order",
];
