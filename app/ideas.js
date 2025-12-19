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
        "Create the HTML layout",
        "Style with CSS",
        "Add task logic in JavaScript",
        "Persist tasks with localStorage",
      ],
      mn: [
        "HTML бүтэц хийх",
        "CSS-ээр загварчлах",
        "JavaScript логик нэмэх",
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
      en: ["Create UI", "Edit notes", "Persist notes"],
      mn: ["UI хийх", "Засах боломж нэмэх", "Өгөгдөл хадгалах"],
    },
  },

  {
    id: "expense-tracker",
    role: "frontend",
    level: "intermediate",
    title: { en: "Expense Tracker", mn: "Зардал хянагч" },
    description: {
      en: "Track income and expenses with charts.",
      mn: "Орлого, зардлыг графикаар хянах.",
    },
    difficulty: "medium",
    category: "frontend",
    coreSkills: ["react", "state", "charts"],
    stretchSkills: ["localstorage"],
    steps: {
      en: ["Add transactions", "Visualize data", "Store history"],
      mn: ["Гүйлгээ нэмэх", "График харуулах", "Түүх хадгалах"],
    },
  },

  {
    id: "password-checker",
    role: "logic",
    level: "beginner",
    title: { en: "Password Strength Checker", mn: "Нууц үгийн шалгагч" },
    description: {
      en: "Validate password strength using rules.",
      mn: "Дүрмээр нууц үгийн бат бөх байдлыг шалгах.",
    },
    difficulty: "easy",
    category: "logic",
    coreSkills: ["javascript", "regex"],
    stretchSkills: [],
    steps: {
      en: ["Create rules", "Test passwords", "Show feedback"],
      mn: ["Дүрэм үүсгэх", "Шалгах", "Үр дүн харуулах"],
    },
  },

  {
    id: "weather",
    role: "frontend",
    level: "intermediate",
    title: { en: "Weather App", mn: "Цаг агаарын апп" },
    description: {
      en: "Fetch live weather data from an API.",
      mn: "API-аас цаг агаарын мэдээлэл авах.",
    },
    difficulty: "medium",
    category: "frontend",
    coreSkills: ["api", "javascript"],
    stretchSkills: ["geolocation"],
    steps: {
      en: ["Call weather API", "Display data", "Use location"],
      mn: ["API дуудах", "Мэдээлэл харуулах", "Байршил ашиглах"],
    },
  },

  {
    id: "auth-dashboard",
    role: "fullstack",
    level: "intermediate",
    title: { en: "Auth Dashboard", mn: "Нэвтрэлтийн самбар" },
    description: {
      en: "Login-protected dashboard.",
      mn: "Нэвтрэлт шаардсан самбар.",
    },
    difficulty: "medium",
    category: "fullstack",
    coreSkills: ["auth", "backend"],
    stretchSkills: ["admin-panel"],
    steps: {
      en: ["Create login", "Protect routes", "Build dashboard"],
      mn: ["Нэвтрэх хэсэг хийх", "Route хамгаалах", "Самбар хийх"],
    },
  },

  {
    id: "ecommerce",
    role: "fullstack",
    level: "advanced",
    title: { en: "E-commerce Store", mn: "Онлайн дэлгүүр" },
    description: {
      en: "Buy and sell products online.",
      mn: "Бараа худалдаж авах, зарах.",
    },
    difficulty: "hard",
    category: "fullstack",
    coreSkills: ["payment", "backend"],
    stretchSkills: ["auth"],
    steps: {
      en: ["Product listing", "Checkout", "Payments"],
      mn: ["Бараа жагсаах", "Төлбөр", "Захиалга"],
    },
  },

  {
    id: "realtime-chat",
    role: "fullstack",
    level: "capstone",
    title: { en: "Real-time Chat", mn: "Бодит цагийн чат" },
    description: {
      en: "Live messaging with sockets.",
      mn: "WebSocket ашигласан чат.",
    },
    difficulty: "hard",
    category: "fullstack",
    coreSkills: ["websockets", "react"],
    stretchSkills: ["auth"],
    steps: {
      en: ["Socket setup", "Send messages", "Deploy"],
      mn: ["Socket тохируулах", "Мессеж илгээх", "Deploy хийх"],
    },
  },

  {
    id: "seo-blog",
    role: "frontend",
    level: "intermediate",
    title: { en: "SEO Blog", mn: "SEO блог" },
    description: {
      en: "SEO-optimized blog platform.",
      mn: "SEO-д оновчтой блог.",
    },
    difficulty: "medium",
    category: "frontend",
    coreSkills: ["seo", "react"],
    stretchSkills: ["export"],
    steps: {
      en: ["Create posts", "Optimize SEO", "Export content"],
      mn: ["Нийтлэл хийх", "SEO тохируулах", "Экспорт хийх"],
    },
  },

  {
    id: "animations-playground",
    role: "frontend",
    level: "beginner",
    title: { en: "Animations Playground", mn: "Анимацын туршилт" },
    description: {
      en: "Practice UI animations.",
      mn: "UI анимац сурч турших.",
    },
    difficulty: "easy",
    category: "frontend",
    coreSkills: ["animations", "css"],
    stretchSkills: ["javascript"],
    steps: {
      en: ["Create animations", "Trigger effects"],
      mn: ["Анимац хийх", "Эффект асаах"],
    },
  },

  {
    id: "data-exporter",
    role: "frontend",
    level: "intermediate",
    title: { en: "Data Export Tool", mn: "Өгөгдөл экспортлогч" },
    description: {
      en: "Export data to CSV or PDF.",
      mn: "Өгөгдлийг CSV эсвэл PDF болгох.",
    },
    difficulty: "medium",
    category: "frontend",
    coreSkills: ["export", "javascript"],
    stretchSkills: ["charts"],
    steps: {
      en: ["Collect data", "Export files"],
      mn: ["Өгөгдөл цуглуулах", "Файл үүсгэх"],
    },
  },

  {
    id: "admin-panel",
    role: "fullstack",
    level: "advanced",
    title: { en: "Admin Panel", mn: "Админ самбар" },
    description: {
      en: "Manage users and content.",
      mn: "Хэрэглэгч, контент удирдах.",
    },
    difficulty: "hard",
    category: "fullstack",
    coreSkills: ["admin-panel", "backend"],
    stretchSkills: ["auth"],
    steps: {
      en: ["CRUD operations", "Permissions"],
      mn: ["CRUD хийх", "Эрх удирдах"],
    },
  },
];
