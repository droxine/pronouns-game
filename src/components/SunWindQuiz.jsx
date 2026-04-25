import { BookQuiz } from "./BookQuiz";
import { SUN_WIND_AUDIO, SUN_WIND_BOOK_SECTIONS } from "../data/sunWindBook";
import { SUN_WIND_LEVELS } from "../data/sunWindContent";

const SUN_WIND_BOOK = {
  id: "sun-wind",
  title: "The Sun and the Wind",
  author: "Story practice",
  icon: "☀️",
  subtitle: "Weather · Animals · Story check",
  greeting: "Practice the weather story.",
  className: "sunwind",
  color: "#ff9600",
  shadow: "#cc6f00",
  buttonText: "white",
};

export function SunWindQuiz(props) {
  return (
    <BookQuiz
      {...props}
      book={SUN_WIND_BOOK}
      levels={SUN_WIND_LEVELS}
      bookSections={SUN_WIND_BOOK_SECTIONS}
      audio={SUN_WIND_AUDIO}
    />
  );
}
