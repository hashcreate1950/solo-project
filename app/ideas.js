export const ideas = [
  {
    id: "todo",
    role: "frontend",
    level: "beginner",
    title: { en: "Simple To-Do List", mn: "Энгийн хийх ажлын жагсаалт" },
    description: {
      en: "Add, complete, and delete daily tasks.",
      mn: "Өдөр тутмын ажлыг нэмэх, гүйцэтгэсэн бол тэмдэглэх, устгах.",
    },
    difficulty: "easy",
    category: "frontend",
    coreSkills: ["html", "css", "javascript"],
    stretchSkills: ["localstorage"],
    steps: {
      en: [
        "Create the basic HTML layout",
        "Style the layout with CSS",
        "Add JavaScript to create and delete tasks",
        "Add task completion toggle",
        "Save tasks using localStorage",
      ],
      mn: [
        "HTML-ийн үндсэн бүтэц хийх",
        "CSS-ээр загварчлах",
        "JavaScript ашиглан ажил нэмэх, устгах",
        "Гүйцэтгэсэн төлөв нэмэх",
        "localStorage ашиглан хадгалах",
      ],
    },
  },

  {
    id: "notes",
    role: "frontend",
    level: "intermediate",
    title: { en: "Notes App", mn: "Тэмдэглэл апп" },
    description: {
      en: "Create, edit, and delete personal notes.",
      mn: "Хувийн тэмдэглэл үүсгэх, засах, устгах.",
    },
    difficulty: "medium",
    category: "frontend",
    coreSkills: ["react", "state"],
    stretchSkills: ["localstorage"],
    steps: {
      en: [
        "Create UI",
        "Add create/edit logic",
        "Persist notes",
      ],
      mn: [
        "UI хийх",
        "Үүсгэх, засах логик",
        "Өгөгдөл хадгалах",
      ],
    },
  },

  {
    id: "chat",
    role: "fullstack",
    level: "capstone",
    title: { en: "Chat App", mn: "Чат апп" },
    description: {
      en: "Real-time messaging app.",
      mn: "Бодит цагийн чат апп.",
    },
    difficulty: "hard",
    category: "fullstack",
    coreSkills: ["react", "api", "auth"],
    stretchSkills: ["websockets"],
    steps: {
      en: [
        "Build UI",
        "Auth system",
        "Realtime messaging",
        "Deploy",
      ],
      mn: [
        "UI хийх",
        "Нэвтрэлт",
        "Бодит цагийн мессеж",
        "Deploy хийх",
      ],
    },
  },
];
