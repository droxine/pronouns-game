export const BEFORE_READING_LEVELS = [
  {
    id: "question-words",
    title: "Question Words",
    emoji: "❓",
    description: "Learn what question words mean.",
    questions: [
      wordMeaning("Who", "quién", ["qué", "quién", "cómo"]),
      wordMeaning("What", "qué", ["qué", "quién", "cómo"]),
      wordMeaning("Where", "dónde", ["cuándo", "dónde", "por qué"]),
      wordMeaning("When", "cuándo", ["dónde", "quién", "cuándo"]),
      wordMeaning("Why", "por qué", ["por qué", "qué", "dónde"]),
      wordMeaning("How", "cómo", ["quién", "cómo", "cuándo"]),
    ],
  },
  {
    id: "why-because",
    title: "Why / Because",
    emoji: "🧠",
    description: "Why questions need because answers.",
    keepOrder: true,
    questions: [
      wordMeaning("Why", "por qué", ["por qué", "dónde", "quién"]),
      phraseMeaning("Why answer starts with...", "because", ["because", "where", "who"], "starts with = empieza con / answer = respuesta"),
      exampleQuestion("Why do they take off their coats?", "Because they are hot.", ["Because they are hot.", "Up the hill.", "Tim and Tina."]),
      exampleQuestion("Why does the star hide?", "Because she wants to see the sun.", ["Because she wants to see the sun.", "Behind the mountains.", "The moon."]),
    ],
  },
  {
    id: "test-language",
    title: "Test Words",
    emoji: "📝",
    description: "Words often used in comprehension questions.",
    questions: [
      wordMeaning("First", "primero", ["primero", "último", "después"]),
      wordMeaning("Last", "último", ["antes", "último", "dónde"]),
      wordMeaning("Next", "siguiente / después", ["siguiente / después", "antes", "quién"]),
      wordMeaning("Before", "antes", ["después", "antes", "debajo"]),
      wordMeaning("After", "después", ["después", "antes", "dónde"]),
      phraseMeaning("At the end means...", "al final", ["al final", "al inicio", "por qué"], "means = significa"),
    ],
  },
];

function wordMeaning(word, answer, options) {
  return {
    prompt: `${word} means...`,
    target: word,
    hint: "means = significa",
    answer,
    options,
  };
}

function phraseMeaning(prompt, answer, options, hint) {
  return { prompt, target: prompt.split(" ")[0], hint, answer, options };
}

function exampleQuestion(question, answer, options) {
  return {
    prompt: `Example: ${question}`,
    target: "Why",
    hint: "example = ejemplo",
    answer,
    options,
  };
}
