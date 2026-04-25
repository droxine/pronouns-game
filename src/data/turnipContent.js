const SPANISH_HINTS = {
  wife: "esposa",
  daughter: "hija",
  son: "hijo",
  cat: "gato",
  dog: "perro",
  mouse: "ratón",
  garden: "jardín",
  flowers: "flores",
  trees: "árboles",
  vegetables: "verduras",
  apple: "manzana",
  turnip: "nabo",
  seed: "semilla",
  earth: "tierra",
  morning: "mañana",
  night: "noche",
  "little / small": "pequeño",
  big: "grande",
  enormous: "enorme",
  call: "llamar",
  come: "venir",
  cook: "cocinar",
  eat: "comer",
  grow: "crecer",
  help: "ayudar",
  "look at": "mirar",
  pull: "jalar",
  put: "poner",
  into: "dentro de",
  "out of": "fuera de",
  under: "debajo de",
  house: "casa",
};

export const TURNIP_SECTIONS = [
  {
    id: "foundations",
    title: "Foundations",
    emoji: "🧰",
    description: "Picture dictionary words from the book.",
    levels: [
      {
        id: "picture-dictionary",
        title: "Picture Dictionary",
        emoji: "🖼️",
        description: "Tap the English word for the picture.",
        qCount: 14,
        questions: [
          picture("👩", "wife", ["wife", "daughter", "son"]),
          picture("👧", "daughter", ["daughter", "wife", "mouse"]),
          picture("👦", "son", ["cat", "son", "dog"]),
          picture("🐱", "cat", ["cat", "mouse", "dog"]),
          picture("🐶", "dog", ["dog", "cat", "turnip"]),
          picture("🐭", "mouse", ["mouse", "wife", "apple"]),
          picture("🏡", "garden", ["garden", "house", "earth"]),
          picture("🌷", "flowers", ["vegetables", "flowers", "trees"]),
          picture("🌳", "trees", ["trees", "flowers", "seed"]),
          picture("🥕", "vegetables", ["fruit", "vegetables", "flowers"]),
          picture("🍎", "apple", ["apple", "turnip", "seed"]),
          picture("🟣", "turnip", ["turnip", "apple", "tree"]),
          picture("🟤", "seed", ["seed", "earth", "night"]),
          picture("🌍", "earth", ["earth", "morning", "garden"]),
          picture("☀️", "morning", ["night", "morning", "little"]),
          picture("🌙", "night", ["night", "big", "morning"]),
          picture("🤏", "little / small", ["little / small", "enormous", "under"]),
          picture("⬆️", "big", ["small", "big", "into"]),
          picture("🗻", "enormous", ["enormous", "little", "under"]),
          picture("📣", "call", ["call", "cook", "eat"]),
          picture("👋", "come", ["come", "grow", "pull"]),
          picture("🍳", "cook", ["look at", "cook", "put"]),
          picture("😋", "eat", ["eat", "help", "call"]),
          picture("🌱", "grow", ["grow", "pull", "cook"]),
          picture("🤝", "help", ["help", "eat", "under"]),
          picture("👀", "look at", ["look at", "come", "out of"]),
          picture("🪢", "pull", ["pull", "grow", "put"]),
          picture("👇", "put", ["put", "eat", "call"]),
          picture("➡️", "into", ["under", "into", "out of"]),
          picture("⬅️", "out of", ["out of", "into", "under"]),
          picture("⬇️", "under", ["under", "big", "help"]),
        ],
      },
      {
        id: "too-big-small",
        title: "Big or Small?",
        emoji: "📏",
        description: "Look at the picture and choose the sentence.",
        questions: [
          sizePicture(1, "It’s too big!"),
          sizePicture(2, "It’s too small!"),
          sizePicture(3, "It’s too big!"),
          sizePicture(4, "It’s too small!"),
          sizePicture(5, "It’s too big!")
        ],
      },
    ],
  },
  {
    id: "small-seed",
    title: "The Small Seed",
    emoji: "🌱",
    description: "Mr Johnson plants a tiny turnip seed.",
    levels: [
      {
        id: "seed-meaning",
        title: "Tap the Meaning",
        emoji: "🌱",
        description: "Learn important words from this part.",
        questions: [
          meaning("Mr Johnson has got a big garden.", "garden", "jardín", ["jardín", "casa", "perro"]),
          meaning("There are flowers and fruit trees in the garden.", "flowers", "flores", ["frutas", "flores", "verduras"]),
          meaning("There are vegetables under the trees.", "vegetables", "verduras", ["verduras", "árboles", "semillas"]),
          meaning("Mr Johnson has got a seed.", "seed", "semilla", ["cama", "semilla", "tierra"]),
          meaning("It is a small turnip seed.", "small", "pequeño", ["grande", "pequeño", "delicioso"]),
          meaning("He puts the seed into the earth.", "earth", "tierra", ["árbol", "tierra", "flor"]),
          meaning("In the night the turnip grows.", "grows", "crece", ["duerme", "crece", "come"]),
          meaning("It is enormous!", "enormous", "enorme", ["pequeño", "enorme", "rápido"]),
        ],
      },
      {
        id: "seed-picture",
        title: "Picture to Word",
        emoji: "🖼️",
        description: "Connect pictures with story words.",
        questions: [
          picture("🏡", "garden", ["garden", "bed", "earth"]),
          picture("🌷", "flowers", ["flowers", "trees", "vegetables"]),
          picture("🌳", "trees", ["seed", "trees", "turnip"]),
          picture("🥕", "vegetables", ["fruit", "vegetables", "flowers"]),
          picture("🟤", "seed", ["seed", "earth", "garden"]),
          picture("🌍", "earth", ["night", "earth", "morning"]),
          picture("🌙", "night", ["morning", "night", "garden"]),
          picture("🗻", "enormous", ["small", "enormous", "under"]),
        ],
      },
      {
        id: "seed-story",
        title: "Story Check",
        emoji: "✅",
        description: "Check the meaning of short story sentences.",
        questions: [
          check("Mr Johnson has got a big garden.", "Is the garden big?", "Yes", ["Yes", "No"], "big"),
          check("There are vegetables under the trees.", "Where are the vegetables?", "under the trees", ["under the trees", "in the bed", "on the flowers"], "under"),
          check("He puts the seed into the earth and goes to bed.", "What does he put into the earth?", "the seed", ["the seed", "the apple", "the dog"], "seed"),
          check("In the night the turnip grows and grows and grows.", "When does the turnip grow?", "in the night", ["in the morning", "in the night", "in the house"], "night"),
          check("It grows very, very big.", "Is the turnip small now?", "No", ["Yes", "No"], "big"),
          check("What a wonderful, enormous turnip!", "How is the turnip?", "enormous", ["enormous", "little", "sad"], "enormous"),
        ],
      },
      {
        id: "seed-build",
        title: "Build a Sentence",
        emoji: "🧩",
        description: "Tap words in order, including the period.",
        questions: [
          build(["Mr", "Johnson", "has", "got", "a", "big", "garden", "."], "Mr Johnson has got a big garden ."),
          build(["There", "are", "vegetables", "under", "the", "trees", "."], "There are vegetables under the trees ."),
          build(["He", "puts", "the", "seed", "into", "the", "earth", "."], "He puts the seed into the earth ."),
          build(["The", "turnip", "grows", "very", "big", "."], "The turnip grows very big ."),
          build(["It", "is", "enormous", "."], "It is enormous ."),
        ],
      },
    ],
  },
  {
    id: "lets-pull",
    title: "It is too big! Let us pull!",
    emoji: "🪢",
    description: "Family, animals, helping, and pulling.",
    levels: [
      {
        id: "pull-meaning",
        title: "Tap the Meaning",
        emoji: "🌱",
        description: "Practice the repeated action words.",
        questions: [
          meaning("Mr Johnson pulls the turnip but nothing happens!", "pulls", "jala", ["jala", "cocina", "come"]),
          meaning("The turnip is too big!", "too big", "demasiado grande", ["muy pequeño", "demasiado grande", "muy rápido"]),
          meaning("Mr Johnson calls his wife, Lizzie.", "calls", "llama", ["llama", "mira", "duerme"]),
          meaning("Come here, Lizzie. Come and help me.", "help", "ayuda", ["ayuda", "come", "crece"]),
          meaning("A little white mouse is under the apple tree.", "mouse", "ratón", ["perro", "gato", "ratón"]),
          meaning("The enormous turnip comes out of the earth!", "out of", "fuera de", ["debajo de", "dentro de", "fuera de"]),
        ],
      },
      {
        id: "pull-picture",
        title: "Picture to Word",
        emoji: "🖼️",
        description: "Recognize the helpers and actions.",
        questions: [
          picture("👩", "wife", ["wife", "daughter", "son"]),
          picture("👦", "son", ["son", "cat", "mouse"]),
          picture("👧", "daughter", ["dog", "daughter", "wife"]),
          picture("🐶", "dog", ["dog", "cat", "turnip"]),
          picture("🐱", "cat", ["mouse", "cat", "son"]),
          picture("🐭", "mouse", ["mouse", "dog", "wife"]),
          picture("🪢", "pull", ["pull", "cook", "grow"]),
          picture("🤝", "help", ["eat", "help", "put"]),
          picture("⬅️", "out of", ["into", "under", "out of"]),
        ],
      },
      {
        id: "pull-story",
        title: "Story Check",
        emoji: "✅",
        description: "Follow the repeated story pattern.",
        questions: [
          check("Mr Johnson pulls the turnip but nothing happens!", "Does the turnip come out?", "No", ["Yes", "No"], "nothing happens"),
          check("Mr Johnson calls his wife, Lizzie.", "Who does Mr Johnson call first?", "his wife", ["his wife", "his cat", "the mouse"], "wife"),
          check("Come here, Ben. Come and help us.", "Why does Mr Johnson call Ben?", "to help", ["to sleep", "to help", "to cook"], "help"),
          check("Mr Johnson calls his daughter, Katie.", "Who is Katie?", "his daughter", ["his daughter", "his wife", "his dog"], "daughter"),
          check("A little white mouse is under the apple tree.", "Where is the mouse?", "under the apple tree", ["under the apple tree", "in the house", "on the turnip"], "under"),
          check("The enormous turnip comes out of the earth!", "What happens at the end of this part?", "The turnip comes out.", ["The turnip comes out.", "The turnip sleeps.", "The turnip cooks."], "comes out"),
        ],
      },
      {
        id: "pull-build",
        title: "Build a Sentence",
        emoji: "🧩",
        description: "Build the most repeated sentences.",
        questions: [
          build(["Mr", "Johnson", "pulls", "the", "turnip", "."], "Mr Johnson pulls the turnip ."),
          build(["The", "turnip", "is", "too", "big", "."], "The turnip is too big ."),
          build(["Come", "and", "help", "me", "."], "Come and help me ."),
          build(["Come", "and", "help", "us", "."], "Come and help us ."),
          build(["The", "mouse", "is", "under", "the", "apple", "tree", "."], "The mouse is under the apple tree ."),
          build(["The", "turnip", "comes", "out", "of", "the", "earth", "."], "The turnip comes out of the earth ."),
        ],
      },
    ],
  },
  {
    id: "time-to-eat",
    title: "Time to Eat!",
    emoji: "🍽️",
    description: "Everyone cooks and eats the turnip.",
    levels: [
      {
        id: "eat-meaning",
        title: "Tap the Meaning",
        emoji: "🌱",
        description: "Learn the final action words.",
        questions: [
          meaning("Come and help me cook this wonderful, enormous turnip!", "cook", "cocinar", ["jalar", "cocinar", "crecer"]),
          meaning("She goes into the house.", "into", "dentro de", ["fuera de", "debajo de", "dentro de"]),
          meaning("They help Mrs Johnson cook the enormous turnip.", "help", "ayudan", ["duermen", "ayudan", "jalan"]),
          meaning("They eat the enormous turnip.", "eat", "comen", ["comen", "miran", "llaman"]),
          meaning("This turnip is delicious!", "delicious", "delicioso", ["pequeño", "delicioso", "blanco"]),
        ],
      },
      {
        id: "eat-picture",
        title: "Picture to Word",
        emoji: "🖼️",
        description: "Recognize final-part words.",
        questions: [
          picture("🍳", "cook", ["cook", "pull", "grow"]),
          picture("😋", "eat", ["call", "eat", "put"]),
          picture("🤝", "help", ["help", "night", "earth"]),
          picture("🏠", "house", ["house", "garden", "tree"]),
          picture("🟣", "turnip", ["turnip", "apple", "seed"]),
          picture("➡️", "into", ["into", "under", "out of"]),
        ],
      },
      {
        id: "eat-story",
        title: "Story Check",
        emoji: "✅",
        description: "Understand the ending.",
        questions: [
          check("Mrs Johnson says, Come and help me cook this wonderful, enormous turnip!", "What does Mrs Johnson want to do?", "cook the turnip", ["cook the turnip", "pull the tree", "plant the seed"], "cook"),
          check("She goes into the house with everyone.", "Where does she go?", "into the house", ["under the tree", "into the house", "out of the earth"], "into"),
          check("Everyone helps Mrs Johnson cook the enormous turnip.", "Who helps?", "everyone", ["no one", "everyone", "only the cat"], "helps"),
          check("Everyone eats the enormous turnip.", "What do they eat?", "the turnip", ["the turnip", "the seed", "the apple tree"], "eat"),
          check("This turnip is delicious!", "Do they like the turnip?", "Yes", ["Yes", "No"], "delicious"),
        ],
      },
      {
        id: "eat-build",
        title: "Build a Sentence",
        emoji: "🧩",
        description: "Build ending sentences.",
        questions: [
          build(["Come", "and", "help", "me", "cook", "this", "turnip", "."], "Come and help me cook this turnip ."),
          build(["She", "goes", "into", "the", "house", "."], "She goes into the house ."),
          build(["They", "cook", "the", "enormous", "turnip", "."], "They cook the enormous turnip ."),
          build(["They", "eat", "the", "enormous", "turnip", "."], "They eat the enormous turnip ."),
          build(["This", "turnip", "is", "delicious", "."], "This turnip is delicious ."),
        ],
      },
    ],
  },
];

function meaning(prompt, target, answer, options) {
  return { type: "choice", prompt, target, question: `What does ${target} mean?`, answer, options };
}

function check(prompt, question, answer, options, target) {
  return { type: "choice", prompt, question, answer, options, target };
}

function picture(fallbackPicture, answer, options) {
  const meaning = SPANISH_HINTS[answer] ?? answer;

  return {
    type: "picture",
    prompt: `Tap the English word for "${meaning}".`,
    fallbackPicture,
    fastImage: `turnip-images/fast/${imageName(answer)}.jpg`,
    image: `turnip-images/${imageName(answer)}.png`,
    answer,
    options,
  };
}

function build(words, answer) {
  return { type: "build", prompt: "Put the words in order.", words, answer };
}

function imageName(answer) {
  return answer.toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-");
}

function sizePicture(number, answer) {
  return {
    type: "picture",
    prompt: "Look at the picture. Choose the sentence.",
    fallbackPicture: answer === "It’s too big!" ? "🗻" : "🤏",
    fastImage: `turnip-images/fast/too-big-small-${number}.jpg`,
    image: `turnip-images/too-big-small-${number}.png`,
    answer,
    options: ["It’s too big!", "It’s too small!"],
  };
}
