const translations = {
  en: {
    eyebrow:"JAVASCRIPT PROJECT", title:"To-Do List",
    subtitle:"Organize your tasks and keep moving forward.",
    placeholder:"Enter a task...", add:"Add Task", total:"Total",
    completed:"Completed", pending:"Pending", emptyTitle:"No tasks yet",
    emptyText:"Add your first task to get started.", clear:"Clear All Tasks",
    footer:"Built with HTML, CSS and JavaScript.",
    confirmClear:"Are you sure you want to clear all tasks?"
  },
  fa: {
    eyebrow:"پروژه جاوااسکریپت", title:"لیست کارها",
    subtitle:"کارهایت را مرتب کن و قدم‌به‌قدم جلو برو.",
    placeholder:"یک کار وارد کنید...", add:"افزودن کار", total:"کل",
    completed:"انجام‌شده", pending:"در انتظار", emptyTitle:"هنوز کاری وجود ندارد",
    emptyText:"اولین کار خود را اضافه کنید.", clear:"پاک کردن همه کارها",
    footer:"ساخته شده با HTML، CSS و JavaScript.",
    confirmClear:"آیا مطمئن هستید که می‌خواهید همه کارها پاک شوند؟"
  }
};

let language = localStorage.getItem("todo-language") || "en";
let tasks = JSON.parse(localStorage.getItem("todo-tasks") || "[]");

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const empty = document.getElementById("emptyState");

function save() { localStorage.setItem("todo-tasks", JSON.stringify(tasks)); }

function render() {
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task ${task.done ? "done" : ""}`;

    const check = document.createElement("button");
    check.className = "check";
    check.type = "button";
    check.textContent = task.done ? "✓" : "";
    check.setAttribute("aria-label", "Toggle task");
    check.addEventListener("click", () => {
      task.done = !task.done; save(); render();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const del = document.createElement("button");
    del.className = "delete";
    del.type = "button";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task");
    del.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id); save(); render();
    });

    li.append(check, span, del);
    list.appendChild(li);
  });

  const completed = tasks.filter(t => t.done).length;
  document.getElementById("totalCount").textContent = tasks.length;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = tasks.length - completed;
  empty.hidden = tasks.length !== 0;
}

function updateLanguage() {
  const t = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t[el.dataset.i18nPlaceholder]);
  document.getElementById("languageBtn").textContent = language === "en" ? "FA" : "EN";
  document.title = t.title;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) { input.focus(); return; }
  tasks.push({ id: Date.now(), text, done:false });
  input.value = "";
  save(); render(); input.focus();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  if (!tasks.length) return;
  if (confirm(translations[language].confirmClear)) {
    tasks = []; save(); render();
  }
});

document.getElementById("languageBtn").addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  localStorage.setItem("todo-language", language);
  updateLanguage();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("todo-theme", dark ? "dark" : "light");
  document.getElementById("themeBtn").textContent = dark ? "☀" : "☾";
});

if (localStorage.getItem("todo-theme") === "dark") document.body.classList.add("dark");
document.getElementById("themeBtn").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
updateLanguage();
render();
