export const GINGERBREAD_LEVELS = [
  {
    id: "vocab",
    title: "Tap the Meaning",
    emoji: "🍪",
    description: "Important words from the story.",
    questions: [
      q("cocina", "kitchen", ["kitchen", "garden", "river"]),
      q("abuela", "Grandma", ["Grandpa", "Grandma", "Billy"]),
      q("abuelo", "Grandpa", ["Grandpa", "dog", "fox"]),
      q("té / merienda", "tea", ["tea", "water", "road"]),
      q("hambriento", "hungry", ["happy", "hungry", "fast"]),
      q("hombre de jengibre", "gingerbread man", ["gingerbread man", "horse", "button"]),
      q("boca", "mouth", ["mouth", "eyes", "nose"]),
      q("ojos", "eyes", ["buttons", "eyes", "feet"]),
      q("botones", "buttons", ["buttons", "windows", "paths"]),
      q("horno", "oven", ["oven", "table", "hill"]),
      q("ventana", "window", ["garden", "window", "road"]),
      q("mesa", "table", ["table", "river", "back"]),
      q("jugar", "play", ["play", "eat", "swim"]),
      q("atrapar", "catch", ["catch", "open", "cook"]),
      q("camino", "path", ["path", "nose", "oven"]),
      q("jardín", "garden", ["garden", "kitchen", "tea"]),
      q("perro", "dog", ["dog", "cow", "fox"]),
      q("caballo", "horse", ["horse", "cat", "dog"]),
      q("vaca", "cow", ["cow", "fox", "cat"]),
      q("zorro", "fox", ["fox", "horse", "Billy"]),
      q("río", "river", ["river", "road", "hill"]),
      q("agua", "water", ["water", "tea", "oven"]),
      q("espalda", "back", ["nose", "back", "mouth"]),
      q("nariz", "nose", ["nose", "eyes", "feet"]),
      q("pies", "feet", ["feet", "buttons", "eyes"]),
      q("hoy", "today", ["today", "away", "across"]),
    ],
  },
  {
    id: "verbs",
    title: "Story Verbs",
    emoji: "🏃",
    description: "Actions and phrases in story sentences.",
    questions: [
      story("Grandma makes a gingerbread man.", "What does makes mean?", "hace", ["hace", "corre", "abre"], "makes"),
      story("Grandma gives him a mouth and eyes.", "What does gives mean?", "le da", ["le da", "salta", "nada"], "gives"),
      story("Grandma puts the gingerbread man in the oven.", "What does puts mean?", "pone", ["pone", "llama", "come"], "puts"),
      story("Billy opens the window.", "What does opens mean?", "abre", ["abre", "cierra", "corre"], "opens"),
      story("Grandma takes the gingerbread man out of the oven.", "What does takes out mean?", "saca", ["saca", "entra", "quiere"], "takes"),
      story("The gingerbread man jumps off the table.", "What does jumps off mean?", "salta de", ["salta de", "duerme en", "mira a"], "jumps off"),
      story("He runs out of the kitchen.", "What does runs out of mean?", "sale corriendo de", ["sale corriendo de", "entra caminando a", "se sienta en"], "runs out of"),
      story("Billy runs after the gingerbread man.", "What does runs after mean?", "corre detrás de", ["corre detrás de", "cocina con", "salta sobre"], "runs after"),
      story("A dog sees them.", "What does sees mean?", "ve", ["ve", "nada", "abre"], "sees"),
      story("The gingerbread man comes to a river.", "What does comes to mean?", "llega a", ["llega a", "come", "hace"], "comes to"),
      story("The fox swims across the river.", "What does swims across mean?", "nada cruzando", ["nada cruzando", "corre bajando", "cocina dentro"], "swims across"),
      story("The fox opens his mouth.", "What does opens mean?", "abre", ["abre", "cierra", "corre"], "opens"),
    ],
  },
  {
    id: "phrases",
    title: "Phrases",
    emoji: "💬",
    description: "Practice useful chunks from the story.",
    questions: [
      ask("How do you say \"es hora del té\"?", "It’s time for tea.", ["It’s time for tea.", "It’s time to run.", "It’s time for water."]),
      ask("How do you say \"tengo hambre\"?", "I’m hungry.", ["I’m hungry.", "I’m fast.", "I’m wet."]),
      ask("How do you say \"haz un hombre de jengibre\"?", "Make a gingerbread man.", ["Make a gingerbread man.", "Open the window.", "Run down the road."]),
      ask("How do you say \"uno, dos, tres, cuatro botones\"?", "One, two, three, four buttons.", ["One, two, three, four buttons.", "One, two, three, four eyes.", "One, two, three, four foxes."]),
      ask("How do you say \"un hombre de jengibre para el té hoy\"?", "A gingerbread man for tea today.", ["A gingerbread man for tea today.", "A fox for water today.", "A cow for the hill today."]),
      ask("How do you say \"no soy para el té\"?", "I’m NOT for tea.", ["I’m NOT for tea.", "I’m NOT in the oven.", "I’m NOT by the river."]),
      ask("How do you say \"quiero jugar\"?", "I want to play.", ["I want to play.", "I want to swim.", "I want to cook."]),
      ask("How do you say \"ven y atrápame\"?", "Come and catch me!", ["Come and catch me!", "Come and eat tea!", "Come and open me!"]),
      ask("How do you say \"no me gusta el agua\"?", "I don’t like water.", ["I don’t like water.", "I don’t like buttons.", "I don’t like tea."]),
      ask("How do you say \"por favor ayúdame\"?", "Please help me.", ["Please help me.", "Please eat me.", "Please call me."]),
      ask("How do you say \"llévame al otro lado del río\"?", "Take me across the river.", ["Take me across the river.", "Put me in the oven.", "Run me down the road."]),
      ask("How do you say \"salta sobre mi espalda\"?", "Jump on my back!", ["Jump on my back!", "Jump on my table!", "Jump on my window!"]),
      ask("How do you say \"salta sobre mi nariz\"?", "Jump on my nose!", ["Jump on my nose!", "Jump on my feet!", "Jump on my buttons!"]),
    ],
  },
  {
    id: "characters",
    title: "Characters",
    emoji: "👥",
    description: "Who is in the story?",
    questions: [
      ask("Who is in the kitchen with Billy?", "Grandma", ["Grandma", "the fox", "the cow"]),
      ask("Who asks Grandma to make a gingerbread man?", "Billy", ["Billy", "the horse", "the fox"]),
      ask("Who comes in at four o’clock?", "Grandpa", ["Grandpa", "the dog", "the cow"]),
      ask("Who jumps off the table?", "the gingerbread man", ["the gingerbread man", "Grandma", "the cat"]),
      ask("Who runs after Billy?", "Grandma and Grandpa", ["Grandma and Grandpa", "the fox and cow", "the cat and horse"]),
      ask("Which animals run after the gingerbread man?", "the dog, the horse, and the cow", ["the dog, the horse, and the cow", "the cat, the fox, and the fish", "the sheep, the duck, and the hen"]),
      ask("Who helps the gingerbread man at the river?", "the fox", ["the fox", "Billy", "the cow"]),
      ask("Who eats the gingerbread man?", "the fox", ["the fox", "the dog", "Grandpa"]),
    ],
  },
  {
    id: "story-order",
    title: "Story Order",
    emoji: "⬇️",
    description: "Practice story events from beginning to end.",
    keepOrder: true,
    questions: [
      sequence(
        "Tap the kitchen order from top to bottom.",
        [
          "Billy is hungry.",
          "Grandma makes a gingerbread man.",
          "Grandma puts him in the oven.",
          "It is time for tea.",
        ],
        "Billy is hungry. Grandma makes a gingerbread man. Grandma puts him in the oven. It is time for tea.",
        "Review order: hungry Billy -> make gingerbread man -> oven -> tea time",
      ),
      sequence(
        "Tap the chase order from top to bottom.",
        [
          "The gingerbread man runs out of the kitchen.",
          "Billy, Grandma, and Grandpa chase him.",
          "The dog runs after him.",
          "The horse runs after him.",
          "The cow runs after him.",
        ],
        "The gingerbread man runs out of the kitchen. Billy, Grandma, and Grandpa chase him. The dog runs after him. The horse runs after him. The cow runs after him.",
        "Review order: kitchen -> family -> dog -> horse -> cow",
      ),
      sequence(
        "Tap the river ending from top to bottom.",
        [
          "The gingerbread man comes to a river.",
          "He says he does not like water.",
          "The fox says, Jump on my back.",
          "The fox says, Jump on my nose.",
          "The fox opens his mouth. Snap!",
        ],
        "The gingerbread man comes to a river. He says he does not like water. The fox says, Jump on my back. The fox says, Jump on my nose. The fox opens his mouth. Snap!",
        "Review order: river -> water problem -> fox's back -> fox's nose -> snap",
      ),
      sequence(
        "Tap the whole story summary from top to bottom.",
        [
          "Grandma makes a gingerbread man for tea.",
          "The gingerbread man runs away.",
          "Grandma, Grandpa, Billy, and the animals chase him.",
          "He comes to a river and cannot swim.",
          "The fox tricks him and eats him.",
        ],
        "Grandma makes a gingerbread man for tea. The gingerbread man runs away. Grandma, Grandpa, Billy, and the animals chase him. He comes to a river and cannot swim. The fox tricks him and eats him.",
        "Review order: Grandma makes him -> he runs -> everyone chases -> river -> fox ending",
      ),
    ],
  },
  {
    id: "story-check",
    title: "Story Check",
    emoji: "✅",
    description: "Answer with the story in mind.",
    questions: [
      story("Billy and Grandma are in the kitchen.", "Where are Billy and Grandma?", "in the kitchen", ["in the kitchen", "by the river", "on the hill"], "kitchen"),
      story("It’s three o’clock, Grandma. Is it time for tea?", "What time is it first?", "three o’clock", ["three o’clock", "four o’clock", "one o’clock"], "three"),
      story("Grandma gives him a mouth and eyes.", "What does Grandma give him?", "a mouth and eyes", ["a mouth and eyes", "a hat and coat", "a cow and horse"], "mouth"),
      story("One, two, three, four buttons.", "How many buttons does he have?", "four", ["two", "three", "four"], "four"),
      story("It’s four o’clock. It’s time for tea.", "When is it time for tea?", "four o’clock", ["three o’clock", "four o’clock", "five o’clock"], "four"),
      story("I’m NOT for tea. I want to play.", "What does the gingerbread man want?", "to play", ["to play", "to sleep", "to cook"], "play"),
      story("Oh, no! I don’t like water.", "What does the gingerbread man not like?", "water", ["water", "buttons", "tea"], "water"),
      story("The fox opens his mouth. Snap!", "What happens at the end?", "the fox eats the gingerbread man", ["the fox eats the gingerbread man", "Billy eats the fox", "the cow swims away"], "Snap"),
    ],
  },
  {
    id: "test-mode",
    title: "Test Mode",
    emoji: "📝",
    description: "Story comprehension practice.",
    levels: [
      {
        id: "test-who",
        title: "Who",
        emoji: "🟢",
        description: "Practice character questions.",
        questions: [
          testQuestion("Who makes the gingerbread man?", "Grandma", ["Grandma", "Grandpa", "the fox"]),
          testQuestion("Who is hungry at the beginning?", "Billy", ["Billy", "the cow", "the fox"]),
          testQuestion("Who comes in for tea?", "Grandpa", ["Grandpa", "the horse", "the dog"]),
          testQuestion("Who runs after the dog?", "Billy, Grandma, and Grandpa", ["Billy, Grandma, and Grandpa", "the fox and the cow", "the cat and the horse"]),
          testQuestion("Who is hungry at the river?", "the fox", ["the fox", "Billy", "Grandma"]),
        ],
      },
      {
        id: "test-what",
        title: "What",
        emoji: "🟡",
        description: "Practice direct what questions.",
        questions: [
          testQuestion("What does Grandma make?", "a gingerbread man", ["a gingerbread man", "a cake", "a horse"]),
          testQuestion("What does Grandma put on the gingerbread man?", "a mouth, eyes, and buttons", ["a mouth, eyes, and buttons", "a hat and shoes", "a coat and scarf"]),
          testQuestion("What does the gingerbread man want to do?", "play", ["play", "sleep", "swim"]),
          testQuestion("What does everyone want to do?", "eat him for tea", ["eat him for tea", "put him in water", "open the window"]),
          testQuestion("What does the gingerbread man not like?", "water", ["water", "buttons", "roads"]),
        ],
      },
      {
        id: "test-where",
        title: "Where",
        emoji: "🔵",
        description: "Practice places in the story.",
        questions: [
          testQuestion("Where does the story begin?", "in the kitchen", ["in the kitchen", "in the river", "on the hill"]),
          testQuestion("Where does Grandma put the gingerbread man?", "in the oven", ["in the oven", "in the garden", "on the road"]),
          testQuestion("Where does Grandma put him after the oven?", "on the table", ["on the table", "under the path", "in the window"]),
          testQuestion("Where does the gingerbread man run after the garden?", "down the road", ["down the road", "into the oven", "under the table"]),
          testQuestion("Where does the gingerbread man stop?", "at a river", ["at a river", "in the kitchen", "on a chair"]),
        ],
      },
      {
        id: "test-why",
        title: "Why",
        emoji: "⚫",
        description: "Practice simple inference questions.",
        questions: [
          testQuestion("Why does the gingerbread man run away?", "He does not want to be eaten.", ["He does not want to be eaten.", "He wants to cook tea.", "He wants four buttons."]),
          testQuestion("Why do the animals chase him?", "They are hungry.", ["They are hungry.", "They are cold.", "They are sleepy."]),
          testQuestion("Why does he ask the fox for help?", "He cannot swim across the river.", ["He cannot swim across the river.", "He wants buttons.", "He wants to go in the oven."]),
          testQuestion("Why does the fox tell him to jump on his nose?", "to trick him and eat him", ["to trick him and eat him", "to give him tea", "to open the window"]),
        ],
      },
      {
        id: "test-short-answer",
        title: "Short Answer",
        emoji: "🧠",
        description: "Practice likely test answers.",
        questions: [
          testQuestion("What happens after the gingerbread man jumps off the table?", "He runs out of the kitchen.", ["He runs out of the kitchen.", "He goes to bed.", "He calls Grandpa."]),
          testQuestion("Which animal sees him first?", "the dog", ["the dog", "the horse", "the cow"]),
          testQuestion("Which animal sees him last before the river?", "the cow", ["the dog", "the cow", "the cat"]),
          testQuestion("What does the fox say first?", "Jump on my back!", ["Jump on my back!", "Open the window!", "Come in for tea!"]),
          testQuestion("What word tells us the fox eats him?", "Snap!", ["Snap!", "Cuckoo!", "Hooray!"]),
        ],
      },
    ],
  },
];

function q(spanish, answer, options) {
  return { prompt: `Tap the English word for "${spanish}".`, question: "Choose the English word.", target: spanish, answer, options };
}

function story(prompt, question, answer, options, target) {
  return { prompt, question, answer, options, target };
}

function ask(question, answer, options) {
  const quotedTarget = question.match(/"([^"]+)"/)?.[1];
  if (!quotedTarget) return { question, answer, options };

  return { prompt: question, question: "Choose the English phrase.", target: quotedTarget, answer, options };
}

function testQuestion(question, answer, options) {
  return { question, answer, options };
}

function sequence(prompt, words, answer, note) {
  return {
    type: "sequence",
    prompt,
    words,
    answer,
    note,
    emptyText: "Tap events below...",
    checkLabel: "Check order! ✅",
  };
}
