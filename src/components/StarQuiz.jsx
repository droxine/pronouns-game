import { BookQuiz } from "./BookQuiz";
import { STAR_AUDIO, STAR_BOOK_SECTIONS } from "../data/starBook";
import { STAR_LEVELS } from "../data/starContent";

const STAR_BOOK = {
  id: "star",
  title: "The Star and the Colours",
  author: "By Paola Traverso",
  icon: "⭐",
  subtitle: "Vocabulary · Colours · Story check",
  greeting: "Quick colour and story practice.",
  className: "star",
  color: "#ffc800",
  shadow: "#cc9f00",
  buttonText: "#333",
};

export function StarQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={STAR_BOOK}
      levels={STAR_LEVELS}
      bookSections={STAR_BOOK_SECTIONS}
      audio={STAR_AUDIO}
    />
  );
}
