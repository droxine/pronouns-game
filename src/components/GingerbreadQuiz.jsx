import { BookQuiz } from "./BookQuiz";
import { GINGERBREAD_BOOK_SECTIONS, GINGERBREAD_SUMMARY } from "../data/gingerbreadBook";
import { GINGERBREAD_LEVELS } from "../data/gingerbreadContent";
import { STORY_MASCOTS } from "../data/storyMascots";

const GINGERBREAD_BOOK = {
  id: "gingerbread",
  title: "The Gingerbread Man",
  author: "Reading Scheme story",
  icon: "🍪",
  subtitle: "Kitchen · Chase · River ending",
  greeting: "Practice the runaway story.",
  hasBook: true,
  className: "gingerbread",
  color: "#d97706",
  shadow: "#9a4f00",
  buttonText: "white",
  summary: GINGERBREAD_SUMMARY,
  mascots: STORY_MASCOTS.gingerbread,
};

export function GingerbreadQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={GINGERBREAD_BOOK}
      levels={GINGERBREAD_LEVELS}
      bookSections={GINGERBREAD_BOOK_SECTIONS}
    />
  );
}
