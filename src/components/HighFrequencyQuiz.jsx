import { BookQuiz } from "./BookQuiz";
import { ACTION_VERBS_LEVELS } from "../data/actionVerbsContent";
import { HIGH_FREQUENCY_LEVELS } from "../data/highFrequencyContent";
import { HIGH_FREQUENCY_PART_2_LEVELS } from "../data/highFrequencyContentPart2";

const HIGH_FREQUENCY_BOOK = {
  id: "high-frequency",
  title: "High Frequency Words",
  author: "Word practice",
  icon: "🔤",
  subtitle: "Small words · actions · test words",
  className: "high-frequency",
  color: "#58cc02",
  shadow: "#3da800",
  buttonText: "white",
  practiceSectionId: "word-practice",
  practiceSectionTitle: "Word Practice",
  practiceSectionEmoji: "🔤",
  practiceSectionDescription: "Practice words you see again and again.",
  mascots: [
    { id: "letters", emoji: "🔤", name: "Letters" },
    { id: "book", emoji: "📘", name: "Reader" },
    { id: "pencil", emoji: "✏️", name: "Writer" },
  ],
};

const HIGH_FREQUENCY_PART_2_BOOK = {
  ...HIGH_FREQUENCY_BOOK,
  id: "high-frequency-2",
  title: "High Frequency Words 2",
  subtitle: "More little words · actions · feelings",
  practiceSectionDescription: "Practice more words you see again and again.",
  mascots: [
    { id: "words", emoji: "🔠", name: "Words" },
    { id: "reader-2", emoji: "📗", name: "Reader 2" },
    { id: "star-pencil", emoji: "✏️", name: "Helper" },
  ],
};

const ACTION_VERBS_BOOK = {
  ...HIGH_FREQUENCY_BOOK,
  id: "action-verbs",
  title: "Action Verbs List",
  icon: "🏃",
  subtitle: "Daily routines · school actions · home actions",
  className: "action-verbs",
  color: "#1cb0f6",
  shadow: "#0a90d0",
  practiceSectionId: "routine-practice",
  practiceSectionTitle: "Routine Practice",
  practiceSectionEmoji: "🏃",
  practiceSectionDescription: "Practice routine verbs from the class list.",
  mascots: [
    { id: "runner", emoji: "🏃", name: "Runner" },
    { id: "school-bag", emoji: "🎒", name: "School" },
    { id: "water", emoji: "💧", name: "Water" },
  ],
};

export function HighFrequencyQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={HIGH_FREQUENCY_BOOK}
      levels={HIGH_FREQUENCY_LEVELS}
      bookSections={[]}
    />
  );
}

export function ActionVerbsQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={ACTION_VERBS_BOOK}
      levels={ACTION_VERBS_LEVELS}
      bookSections={[]}
    />
  );
}

export function HighFrequencyPart2Quiz(props) {
  return (
    <BookQuiz
      {...props}
      book={HIGH_FREQUENCY_PART_2_BOOK}
      levels={HIGH_FREQUENCY_PART_2_LEVELS}
      bookSections={[]}
    />
  );
}
