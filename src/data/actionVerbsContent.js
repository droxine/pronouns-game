export const ACTION_VERBS_LEVELS = [
  {
    id: "morning-routine",
    title: "Morning Routine",
    emoji: "☀️",
    description: "Actions before school.",
    keepOrder: true,
    questions: [
      phraseMeaning("get up", "levantarse", ["levantarse", "bañarse", "ver televisión"]),
      phraseMeaning("brush my teeth", "cepillarme los dientes", ["cepillarme los dientes", "peinarme", "tomar agua"]),
      phraseMeaning("get dressed", "vestirme", ["vestirme", "hacer ejercicio", "estudiar inglés"]),
      phraseMeaning("comb my hair", "peinarme", ["peinarme", "lavarme las manos", "hacer mi tarea"]),
      phraseMeaning("take a bath", "bañarme", ["bañarme", "desayunar", "escuchar música"]),
      phraseMeaning("have breakfast", "desayunar", ["desayunar", "ir al colegio", "comer mi lonchera"]),
    ],
  },
  {
    id: "school-routine",
    title: "School Routine",
    emoji: "🎒",
    description: "Actions for school and study.",
    keepOrder: true,
    questions: [
      phraseMeaning("go to school", "ir al colegio", ["ir al colegio", "hacer ejercicio", "ver televisión"]),
      phraseMeaning("eat my snack", "comer mi lonchera", ["comer mi lonchera", "lavarme las manos", "peinarme"]),
      phraseMeaning("wash my hands", "lavarme las manos", ["lavarme las manos", "tomar agua", "levantarme"]),
      phraseMeaning("drink water", "tomar agua", ["tomar agua", "desayunar", "vestirme"]),
      phraseMeaning("study English", "estudiar inglés", ["estudiar inglés", "escuchar música", "bañarme"]),
      phraseMeaning("do my homework", "hacer mi tarea", ["hacer mi tarea", "ir al colegio", "cepillarme los dientes"]),
    ],
  },
  {
    id: "home-routine",
    title: "Home Routine",
    emoji: "🏠",
    description: "Actions at home.",
    keepOrder: true,
    questions: [
      phraseMeaning("do exercise", "hacer ejercicio", ["hacer ejercicio", "hacer mi tarea", "desayunar"]),
      phraseMeaning("watch TV", "ver televisión", ["ver televisión", "tomar agua", "ir al colegio"]),
      phraseMeaning("listen to music", "escuchar música", ["escuchar música", "lavarme las manos", "vestirme"]),
      phraseMeaning("do my homework", "hacer mi tarea", ["hacer mi tarea", "ver televisión", "peinarme"]),
      phraseMeaning("drink water", "tomar agua", ["tomar agua", "bañarme", "estudiar inglés"]),
      phraseMeaning("take a bath", "bañarme", ["bañarme", "comer mi lonchera", "levantarse"]),
    ],
  },
  {
    id: "english-phrases",
    title: "Build the Phrase",
    emoji: "💬",
    description: "Choose the English routine phrase.",
    questions: [
      spanishToEnglish("Me levanto.", "I get up.", ["I get up.", "I drink water.", "I watch TV."]),
      spanishToEnglish("Me cepillo los dientes.", "I brush my teeth.", ["I brush my teeth.", "I comb my hair.", "I study English."]),
      spanishToEnglish("Me visto.", "I get dressed.", ["I get dressed.", "I take a bath.", "I eat my snack."]),
      spanishToEnglish("Desayuno.", "I have breakfast.", ["I have breakfast.", "I go to school.", "I do exercise."]),
      spanishToEnglish("Voy al colegio.", "I go to school.", ["I go to school.", "I do my homework.", "I listen to music."]),
      spanishToEnglish("Como mi lonchera.", "I eat my snack.", ["I eat my snack.", "I wash my hands.", "I watch TV."]),
      spanishToEnglish("Me lavo las manos.", "I wash my hands.", ["I wash my hands.", "I get dressed.", "I drink water."]),
      spanishToEnglish("Tomo agua.", "I drink water.", ["I drink water.", "I get up.", "I take a bath."]),
      spanishToEnglish("Hago mi tarea.", "I do my homework.", ["I do my homework.", "I have breakfast.", "I comb my hair."]),
      spanishToEnglish("Estudio inglés.", "I study English.", ["I study English.", "I listen to music.", "I go to school."]),
      spanishToEnglish("Me peino.", "I comb my hair.", ["I comb my hair.", "I brush my teeth.", "I do exercise."]),
      spanishToEnglish("Hago ejercicio.", "I do exercise.", ["I do exercise.", "I take a bath.", "I eat my snack."]),
      spanishToEnglish("Me baño.", "I take a bath.", ["I take a bath.", "I watch TV.", "I get up."]),
      spanishToEnglish("Veo televisión.", "I watch TV.", ["I watch TV.", "I wash my hands.", "I study English."]),
      spanishToEnglish("Escucho música.", "I listen to music.", ["I listen to music.", "I have breakfast.", "I drink water."]),
    ],
  },
  {
    id: "quick-review",
    title: "Quick Review",
    emoji: "✅",
    description: "All routine verbs mixed together.",
    questions: [
      phraseMeaning("get up", "levantarse", ["levantarse", "vestirme", "tomar agua"]),
      phraseMeaning("brush my teeth", "cepillarme los dientes", ["cepillarme los dientes", "escuchar música", "hacer ejercicio"]),
      phraseMeaning("get dressed", "vestirme", ["vestirme", "desayunar", "bañarme"]),
      phraseMeaning("have breakfast", "desayunar", ["desayunar", "ir al colegio", "peinarme"]),
      phraseMeaning("go to school", "ir al colegio", ["ir al colegio", "ver televisión", "tomar agua"]),
      phraseMeaning("eat my snack", "comer mi lonchera", ["comer mi lonchera", "hacer mi tarea", "lavarme las manos"]),
      phraseMeaning("wash my hands", "lavarme las manos", ["lavarme las manos", "estudiar inglés", "ver televisión"]),
      phraseMeaning("drink water", "tomar agua", ["tomar agua", "cepillarme los dientes", "levantarse"]),
      phraseMeaning("do my homework", "hacer mi tarea", ["hacer mi tarea", "peinarme", "bañarme"]),
      phraseMeaning("study English", "estudiar inglés", ["estudiar inglés", "desayunar", "comer mi lonchera"]),
      phraseMeaning("comb my hair", "peinarme", ["peinarme", "ir al colegio", "escuchar música"]),
      phraseMeaning("do exercise", "hacer ejercicio", ["hacer ejercicio", "hacer mi tarea", "tomar agua"]),
      phraseMeaning("take a bath", "bañarme", ["bañarme", "vestirme", "lavarme las manos"]),
      phraseMeaning("watch TV", "ver televisión", ["ver televisión", "estudiar inglés", "levantarse"]),
      phraseMeaning("listen to music", "escuchar música", ["escuchar música", "hacer ejercicio", "cepillarme los dientes"]),
    ],
  },
];

function phraseMeaning(phrase, answer, options) {
  return {
    prompt: `${phrase} means...`,
    target: phrase,
    hint: "means = significa",
    answer,
    options,
  };
}

function spanishToEnglish(spanish, answer, options) {
  return {
    prompt: `Spanish: ${spanish}`,
    question: "Choose the English sentence.",
    target: spanish,
    answer,
    options,
  };
}
