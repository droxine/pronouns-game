import { BookQuiz } from "./BookQuiz";
import { BEFORE_READING_LEVELS } from "../data/beforeReadingContent";

const BEFORE_READING_BOOK = {
  id: "before-reading",
  title: "Before Reading Scheme",
  author: "Question practice",
  icon: "❓",
  subtitle: "Who · What · Where · When · Why",
  className: "before-reading",
  color: "#1cb0f6",
  shadow: "#0a90d0",
  buttonText: "white",
  mascots: [
    { id: "question", emoji: "❓", name: "Question" },
    { id: "detective", emoji: "🔎", name: "Finder" },
    { id: "brain", emoji: "🧠", name: "Thinker" },
  ],
};

export function BeforeReadingQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={BEFORE_READING_BOOK}
      levels={BEFORE_READING_LEVELS}
      bookSections={[]}
    />
  );
}
