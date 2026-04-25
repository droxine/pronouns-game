import {
  PRONOUN_QUESTIONS,
  VERB_BE_QUESTIONS,
  WORD_ORDER_QUESTIONS,
} from "../data/gameContent";

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function buildQuestions(type, count) {
  const sourceByType = {
    verb_be: VERB_BE_QUESTIONS,
    pronoun: PRONOUN_QUESTIONS,
    word_order: WORD_ORDER_QUESTIONS,
  };

  return shuffle(sourceByType[type]).slice(0, count);
}

export function starsFor(score, total) {
  return Math.round((score / total) * 3);
}

export function levelColor(levelIdx) {
  return ["#58cc02", "#1cb0f6", "#ce82ff"][levelIdx];
}

export function levelShadow(levelIdx) {
  return ["#3da800", "#0a90d0", "#a855d4"][levelIdx];
}
