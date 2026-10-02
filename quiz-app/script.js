const questions = [
  {
    en: {
      question: "Which keyword is used to declare a variable that cannot be reassigned?",
      answers: ["let", "var", "const", "static"]
    },
    fa: {
      question: "کدام کلمه برای تعریف متغیری استفاده می‌شود که نمی‌توان مقدار آن را دوباره تغییر داد؟",
      answers: ["let", "var", "const", "static"]
    },
    correct: 2
  },
  {
    en: {
      question: "Which method converts a JSON string into a JavaScript value?",
      answers: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"]
    },
    fa: {
      question: "کدام متد یک رشته JSON را به یک مقدار JavaScript تبدیل می‌کند؟",
      answers: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"]
    },
    correct: 0
  },
  {
    en: {
      question: "Which method adds an item to the end of an array?",
      answers: ["shift()", "push()", "pop()", "unshift()"]
    },
    fa: {
      question: "کدام متد یک آیتم را به انتهای آرایه اضافه می‌کند؟",
      answers: ["shift()", "push()", "pop()", "unshift()"]
    },
    correct: 1
  },
  {
    en: {
      question: "Which keyword waits for a Promise to settle inside an async function?",
      answers: ["wait", "pause", "await", "async"]
    },
    fa: {
      question: "کدام کلمه در یک تابع async منتظر کامل شدن Promise می‌ماند؟",
      answers: ["wait", "pause", "await", "async"]
    },
    correct: 2
  },
  {
    en: {
      question: "Which browser API is commonly used to select an element by its id?",
      answers: ["document.getElementById()", "document.getId()", "window.getElement()", "document.selectId()"]
    },
    fa: {
      question: "برای انتخاب یک عنصر با استفاده از id معمولاً از کدام متد استفاده می‌شود؟",
      answers: ["document.getElementById()", "document.getId()", "window.getElement()", "document.selectId()"]
    },
    correct: 0
  },
  {
    en: {
      question: "Which method creates a new array by transforming every element?",
      answers: ["filter()", "forEach()", "map()", "find()"]
    },
    fa: {
      question: "کدام متد با تغییر هر عنصر، یک آرایه جدید ایجاد می‌کند؟",
      answers: ["filter()", "forEach()", "map()", "find()"]
    },
    correct: 2
  },
  {
    en: {
      question: "Which storage API keeps data after the browser is refreshed?",
      answers: ["sessionOnly", "LocalStorage", "tempStorage", "memoryStorage"]
    },
    fa: {
      question: "کدام API داده‌ها را بعد از Refresh شدن مرورگر نیز نگه می‌دارد؟",
      answers: ["sessionOnly", "LocalStorage", "tempStorage", "memoryStorage"]
    },
    correct: 1
  },
  {
    en: {
      question: "What does addEventListener() do?",
      answers: ["Creates an API", "Listens for events", "Starts a server", "Stores data"]
    },
    fa: {
      question: "متد addEventListener() چه کاری انجام می‌دهد؟",
      answers: ["یک API می‌سازد", "به رویدادها گوش می‌دهد", "یک سرور اجرا می‌کند", "داده ذخیره می‌کند"]
    },
    correct: 1
  },
  {
    en: {
      question: "Which function runs code repeatedly after a fixed time interval?",
      answers: ["setTimeout()", "setInterval()", "repeat()", "loopTime()"]
    },
    fa: {
      question: "کدام تابع کد را در فاصله‌های زمانی مشخص به صورت تکراری اجرا می‌کند؟",
      answers: ["setTimeout()", "setInterval()", "repeat()", "loopTime()"]
    },
    correct: 1
  },
  {
    en: {
      question: "What does === compare?",
      answers: ["Only values", "Only types", "Value and type", "Variables only"]
    },
    fa: {
      question: "عملگر === چه چیزی را مقایسه می‌کند؟",
      answers: ["فقط مقدار", "فقط نوع داده", "مقدار و نوع داده", "فقط متغیرها"]
    },
    correct: 2
  }
];

const translations = {
  en: {
    title:"JavaScript Quiz", challenge:"CHALLENGE",
    ready:"Ready to test your JavaScript?",
    intro:"Answer the questions, beat the timer, and see your final score.",
    questions:"Questions", perQuestion:"Per Question",
    start:"Start Quiz", next:"Next", complete:"COMPLETE",
    resultTitle:"Quiz Completed!", points:"Points", correct:"Correct",
    wrong:"Wrong", accuracy:"Accuracy", restart:"Try Again",
    footer:"Part of my JavaScript learning journey"
  },
  fa: {
    title:"آزمون JavaScript", challenge:"چالش",
    ready:"آماده‌ای JavaScript خودت را امتحان کنی؟",
    intro:"به سؤال‌ها جواب بده، زمان را مدیریت کن و امتیاز نهایی‌ات را ببین.",
    questions:"سؤال", perQuestion:"برای هر سؤال",
    start:"شروع آزمون", next:"بعدی", complete:"پایان",
    resultTitle:"آزمون تمام شد!", points:"امتیاز", correct:"درست",
    wrong:"غلط", accuracy:"درصد موفقیت", restart:"دوباره امتحان کن",
    footer:"بخشی از مسیر یادگیری JavaScript من"
  }
};

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const answersElement = document.getElementById("answers");
const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const scoreText = document.getElementById("scoreText");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");
const correctCount = document.getElementById("correctCount");
const wrongCount = document.getElementById("wrongCount");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("resultMessage");
const languageBtn = document.getElementById("languageBtn");
const themeBtn = document.getElementById("themeBtn");
const questionCount = document.getElementById("questionCount");

let language = localStorage.getItem("quizLanguage") || "en";
let isDark = localStorage.getItem("quizTheme") === "dark";
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selected = false;
let timeLeft = 15;
let timerId = null;

questionCount.textContent = questions.length;

function applyTheme() {
  document.body.classList.toggle("dark", isDark);
  themeBtn.textContent = isDark ? "☀" : "☾";
}

function applyTranslations() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (translations[language][key]) element.textContent = translations[language][key];
  });

  languageBtn.textContent = language === "en" ? "FA" : "EN";

  if (!quizScreen.classList.contains("hidden")) {
    renderQuestion();
  }
}

function toggleLanguage() {
  language = language === "en" ? "fa" : "en";
  localStorage.setItem("quizLanguage", language);
  applyTranslations();
}

function toggleTheme() {
  isDark = !isDark;
  localStorage.setItem("quizTheme", isDark ? "dark" : "light");
  applyTheme();
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  wrongAnswers = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];

  selected = false;
  timeLeft = 15;
  clearInterval(timerId);

  const localizedQuestion = question[language];
  questionNumber.textContent = language === "fa"
    ? `سؤال ${currentQuestion + 1} از ${questions.length}`
    : `Question ${currentQuestion + 1} / ${questions.length}`;

  questionText.textContent = localizedQuestion.question;
  scoreText.textContent = language === "fa" ? `امتیاز: ${score}` : `Score: ${score}`;
  timerElement.textContent = timeLeft;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  answersElement.innerHTML = "";

  localizedQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.appendChild(button);
  });

  nextBtn.disabled = true;
  startTimer();
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      selectAnswer(-1);
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  if (selected) return;

  selected = true;
  clearInterval(timerId);

  const question = questions[currentQuestion];
  const buttons = [...answersElement.querySelectorAll(".answer")];

  buttons.forEach(button => button.disabled = true);

  buttons[question.correct].classList.add("correct");

  if (selectedIndex === question.correct) {
    score += 10;
    correctAnswers++;
  } else {
    wrongAnswers++;
    if (selectedIndex >= 0) {
      buttons[selectedIndex].classList.add("wrong");
    }
  }

  scoreText.textContent = language === "fa" ? `امتیاز: ${score}` : `Score: ${score}`;
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (!selected) return;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  renderQuestion();
}

function showResult() {
  clearInterval(timerId);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const accuracy = Math.round((correctAnswers / questions.length) * 100);

  finalScore.textContent = score;
  correctCount.textContent = correctAnswers;
  wrongCount.textContent = wrongAnswers;
  percentage.textContent = `${accuracy}%`;

  if (language === "fa") {
    resultMessage.textContent =
      accuracy >= 80 ? "عالی بود! 🔥" :
      accuracy >= 50 ? "خوب بود! ادامه بده 💪" :
      "تمرین بیشتر یعنی پیشرفت بیشتر 🚀";
  } else {
    resultMessage.textContent =
      accuracy >= 80 ? "Excellent work! 🔥" :
      accuracy >= 50 ? "Good job! Keep going! 💪" :
      "More practice means more progress! 🚀";
  }
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
languageBtn.addEventListener("click", toggleLanguage);
themeBtn.addEventListener("click", toggleTheme);

applyTheme();
applyTranslations();
