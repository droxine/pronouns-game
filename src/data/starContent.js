export const STAR_LEVELS = [
  {
    id: "vocab",
    title: "Tap the Meaning",
    emoji: "⭐",
    description: "Story words with Spanish hints.",
    questions: [
      q("noche", "night", ["night", "moon", "cloud"]),
      q("luna", "moon", ["star", "moon", "sun"]),
      q("estrella", "star", ["star", "sky", "bee"]),
      q("cielo", "sky", ["sky", "mountain", "tomato"]),
      q("nube", "cloud", ["cloud", "rainbow", "hat"]),
      q("sol", "sun", ["moon", "sun", "star"]),
      q("montañas", "mountains", ["mountains", "raindrops", "colours"]),
      q("colores", "colours", ["colours", "clouds", "lemons"]),
      q("rojo", "red", ["red", "green", "blue"]),
      q("naranja", "orange", ["orange", "yellow", "purple"]),
      q("amarillo", "yellow", ["violet", "yellow", "red"]),
      q("verde", "green", ["blue", "green", "orange"]),
      q("azul", "blue", ["yellow", "blue", "red"]),
      q("morado", "purple", ["purple", "green", "orange"]),
      q("violeta", "violet", ["violet", "blue", "yellow"]),
      q("arcoíris", "rainbow", ["rainbow", "cloud", "mountain"]),
      q("tomates", "tomatoes", ["tomatoes", "pumpkins", "lemons"]),
      q("calabazas", "pumpkins", ["pumpkins", "apples", "grapes"]),
      q("limones", "lemons", ["blueberries", "lemons", "tomatoes"]),
      q("manzanas", "apples", ["grapes", "apples", "pumpkins"]),
      q("arándanos", "blueberries", ["blueberries", "lemons", "clouds"]),
      q("uvas", "grapes", ["grapes", "stars", "raindrops"]),
      q("lluvia / gotas", "raindrops", ["raindrops", "mountains", "tomatoes"]),
      q("sombrero", "hat", ["hat", "sun", "bee"]),
    ],
  },
  {
    id: "verbs",
    title: "Story Verbs",
    emoji: "🏃",
    description: "Understand important action words in sentences.",
    questions: [
      story("The moon calls the stars.", "What does calls mean?", "llama", ["llama", "duerme", "mira"], "calls"),
      story("One star hides under a cloud.", "What does hides mean?", "se esconde", ["canta", "se esconde", "sale"], "hides"),
      story("She wants to see the sun.", "What does see mean?", "ver", ["ver", "dormir", "llover"], "see"),
      story("The star waits.", "What does waits mean?", "espera", ["corre", "espera", "llama"], "waits"),
      story("The sun comes out.", "What does comes out mean?", "sale", ["entra", "sale", "duerme"], "comes out"),
      story("She looks around.", "What does looks around mean?", "mira alrededor", ["mira alrededor", "se cae", "canta"], "looks around"),
      story("She sings a special song.", "What does sings mean?", "canta", ["canta", "duerme", "llueve"], "sings"),
      story("The star falls asleep.", "What does falls asleep mean?", "se queda dormida", ["se queda dormida", "se esconde", "se despierta"], "falls asleep"),
      story("It rains on the mountains.", "What does rains mean?", "llueve", ["llueve", "sale", "canta"], "rains"),
      story("The clouds go away.", "What does go away mean?", "se van", ["vienen", "se van", "miran"], "go away"),
      story("The star opens her eyes.", "What does opens mean?", "abre", ["cierra", "abre", "llama"], "opens"),
    ],
  },
  {
    id: "colours-guided",
    title: "Colour Match 1",
    emoji: "🌈",
    description: "Use the sentence to match objects and colours.",
    questions: [
      story("I see red tomatoes.", "What colour are the tomatoes?", "red", ["red", "blue", "yellow"], "red"),
      story("I see orange pumpkins.", "What colour are the pumpkins?", "orange", ["green", "orange", "violet"], "orange"),
      story("I see yellow lemons.", "What colour are the lemons?", "yellow", ["yellow", "purple", "red"], "yellow"),
      story("I see green apples.", "What colour are the apples?", "green", ["blue", "green", "orange"], "green"),
      story("I see little blueberries.", "What colour are the blueberries?", "blue", ["blue", "yellow", "red"], "blue"),
      story("I see purple and violet grapes.", "What colours are the grapes?", "purple and violet", ["red and orange", "purple and violet", "green and blue"], "purple"),
    ],
  },
  {
    id: "colours-challenge",
    title: "Colour Match 2",
    emoji: "🎨",
    description: "No sentence hint. Remember the story colours.",
    questions: [
      ask("What colour are the tomatoes?", "red", ["red", "yellow", "purple"]),
      ask("What colour are the pumpkins?", "orange", ["blue", "orange", "green"]),
      ask("What colour are the lemons?", "yellow", ["yellow", "red", "violet"]),
      ask("What colour are the apples?", "green", ["orange", "green", "blue"]),
      ask("What colour are the blueberries?", "blue", ["blue", "yellow", "purple"]),
      ask("What colours are the grapes?", "purple and violet", ["green and blue", "purple and violet", "red and orange"]),
      ask("Which colours come out in the rainbow?", "red, orange, yellow, green, blue, purple and violet", [
        "red, orange, yellow, green, blue, purple and violet",
        "black, white and grey",
        "pink, brown and gold",
      ]),
    ],
  },
  {
    id: "story-guided",
    title: "Story Check 1",
    emoji: "✅",
    description: "Use the sentence to answer.",
    questions: [
      story("The moon in the sky calls the stars.", "Who calls the stars?", "the moon", ["the sun", "the moon", "the cloud"], "moon"),
      story("One star hides under a cloud.", "Where does the star hide?", "under a cloud", ["under a cloud", "behind a tomato", "in bed"], "cloud"),
      story("She wants to see the sun.", "What does the star want to see?", "the sun", ["the moon", "the sun", "the bee"], "sun"),
      story("Behind the mountains the sun comes out.", "Where does the sun come out?", "behind the mountains", ["under a cloud", "behind the mountains", "in the rain"], "mountains"),
      story("There are raindrops on my head!", "What is on the star's head?", "raindrops", ["lemons", "raindrops", "grapes"], "raindrops"),
      story("The star is cold and tired.", "How does the star feel?", "cold and tired", ["big and hot", "cold and tired", "red and orange"], "cold"),
      story("From her mouth a big rainbow comes out.", "What comes out of her mouth?", "a rainbow", ["a rainbow", "a cloud", "a pumpkin"], "rainbow"),
    ],
  },
  {
    id: "story-challenge",
    title: "Story Check 2",
    emoji: "🧠",
    description: "Comprehension without the sentence on screen.",
    questions: [
      ask("Who tells the stars to go to bed?", "the moon", ["the moon", "the sun", "the tiger"]),
      ask("Why does one star hide?", "She wants to see the sun.", ["She wants to see the sun.", "She wants to eat tomatoes.", "She wants to sleep."]),
      ask("Where does the star hide?", "under a cloud", ["under a cloud", "behind a pumpkin", "in the rainbow"]),
      ask("What does the star want to become?", "a coloured star", ["a coloured star", "a tomato", "a mountain"]),
      ask("What happens when the star sings the first songs?", "She does not change colour.", ["She does not change colour.", "She goes to bed.", "She becomes red."]),
      ask("What falls on the star's head?", "raindrops", ["raindrops", "lemons", "grapes"]),
      ask("How does the star feel before she sleeps?", "cold and tired", ["cold and tired", "big and hot", "orange and green"]),
      ask("What comes out from the star's mouth?", "a rainbow", ["a rainbow", "the moon", "a cloud"]),
      ask("At the end, are the colours for the star?", "Yes", ["Yes", "No"]),
    ],
  },
];

function q(spanish, answer, options) {
  return { prompt: `Tap the English word for "${spanish}".`, answer, options };
}

function story(prompt, question, answer, options, target) {
  return { prompt, question, answer, options, target };
}

function ask(question, answer, options) {
  return { question, answer, options };
}
