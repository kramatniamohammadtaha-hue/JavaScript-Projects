const translations = {
  en: {
    eyebrow:"JAVASCRIPT PROJECT", title:"Calculator",
    subtitle:"A simple, fast and responsive calculator.",
    number1:"First number", number2:"Second number", placeholder:"Enter a number",
    add:"Add", subtract:"Subtract", multiply:"Multiply", divide:"Divide",
    result:"Result", ready:"Enter two numbers and choose an operation.",
    invalid:"Please enter two valid numbers.", zero:"Cannot divide by zero.",
    reset:"Reset", footer:"Built with HTML, CSS and JavaScript."
  },
  fa: {
    eyebrow:"پروژه جاوااسکریپت", title:"ماشین حساب",
    subtitle:"یک ماشین حساب ساده، سریع و واکنش‌گرا.",
    number1:"عدد اول", number2:"عدد دوم", placeholder:"یک عدد وارد کنید",
    add:"جمع", subtract:"تفریق", multiply:"ضرب", divide:"تقسیم",
    result:"نتیجه", ready:"دو عدد وارد کنید و یک عملیات را انتخاب کنید.",
    invalid:"لطفاً دو عدد معتبر وارد کنید.", zero:"تقسیم بر صفر امکان‌پذیر نیست.",
    reset:"پاک کردن", footer:"ساخته شده با HTML، CSS و JavaScript."
  }
};

let language = localStorage.getItem("calculator-language") || "en";
const body = document.body;
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const result = document.getElementById("result");
const message = document.getElementById("message");

function updateLanguage() {
  const t = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t[el.dataset.i18nPlaceholder]);
  document.getElementById("languageBtn").textContent = language === "en" ? "FA" : "EN";
  if (result.textContent === "—") message.textContent = t.ready;
  document.title = t.title;
}
function getNumbers() {
  const a = Number(number1.value), b = Number(number2.value);
  if (!number1.value || !number2.value || !Number.isFinite(a) || !Number.isFinite(b)) return null;
  return [a,b];
}
function calculate(operation) {
  const nums = getNumbers();
  if (!nums) { message.textContent = translations[language].invalid; result.textContent = "—"; return; }
  const [a,b] = nums;
  if (operation === "divide" && b === 0) { message.textContent = translations[language].zero; result.textContent = "—"; return; }
  const value = { add:a+b, subtract:a-b, multiply:a*b, divide:a/b }[operation];
  result.textContent = Number.isInteger(value) ? value : Number(value.toFixed(10));
  message.textContent = "";
}
document.querySelectorAll(".op-btn").forEach(btn => btn.addEventListener("click", () => calculate(btn.dataset.operation)));
document.getElementById("resetBtn").addEventListener("click", () => {
  number1.value = ""; number2.value = ""; result.textContent = "—";
  message.textContent = translations[language].ready; number1.focus();
});
document.getElementById("languageBtn").addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  localStorage.setItem("calculator-language", language); updateLanguage();
});
document.getElementById("themeBtn").addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("calculator-theme", body.classList.contains("dark") ? "dark" : "light");
  document.getElementById("themeBtn").textContent = body.classList.contains("dark") ? "☀" : "☾";
});
if (localStorage.getItem("calculator-theme") === "dark") body.classList.add("dark");
document.getElementById("themeBtn").textContent = body.classList.contains("dark") ? "☀" : "☾";
updateLanguage();
