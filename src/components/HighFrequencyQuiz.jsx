import { BookQuiz } from "./BookQuiz";
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
