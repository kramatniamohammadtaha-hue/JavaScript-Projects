const form = document.getElementById("bmiForm");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const result = document.getElementById("result");
const bmiValue = document.getElementById("bmiValue");
const statusBadge = document.getElementById("statusBadge");
const resultMessage = document.getElementById("resultMessage");
const marker = document.getElementById("marker");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const languageToggle = document.getElementById("languageToggle");
const languageIcon = document.getElementById("languageIcon");

const translations = {
    fa: {
        eyebrow: "ابزار سلامت",
        title: "محاسبه‌گر BMI",
        subtitle: "شاخص توده بدنی خود را در چند ثانیه محاسبه کنید.",
        weightLabel: "وزن",
        weightPlaceholder: "مثلاً 70",
        heightLabel: "قد",
        heightPlaceholder: "مثلاً 1.75",
        heightHint: "قد را بر حسب متر وارد کنید.",
        calculate: "محاسبه BMI",
        reset: "پاک کردن",
        yourBmi: "BMI شما",
        underweight: "کمبود وزن",
        normal: "وزن نرمال",
        overweight: "اضافه وزن",
        obesity: "چاقی",
        footer: "ساخته‌شده با HTML، CSS و JavaScript",
        weightError: "وزن را بین 1 تا 500 کیلوگرم وارد کنید.",
        heightError: "قد را بین 0.5 تا 2.5 متر وارد کنید.",
        messages: {
            underweight: "BMI شما پایین‌تر از محدوده معمول است.",
            normal: "BMI شما در محدوده نرمال قرار دارد.",
            overweight: "BMI شما در محدوده اضافه وزن قرار دارد.",
            obesity: "BMI شما در محدوده چاقی قرار دارد."
        }
    },
    en: {
        eyebrow: "HEALTH TOOL",
        title: "BMI Calculator",
        subtitle: "Calculate your Body Mass Index in seconds.",
        weightLabel: "Weight",
        weightPlaceholder: "e.g. 70",
        heightLabel: "Height",
        heightPlaceholder: "e.g. 1.75",
        heightHint: "Enter your height in meters.",
        calculate: "Calculate BMI",
        reset: "Reset",
        yourBmi: "Your BMI",
        underweight: "Underweight",
        normal: "Normal",
        overweight: "Overweight",
        obesity: "Obesity",
        footer: "Built with HTML, CSS & JavaScript",
        weightError: "Enter a weight between 1 and 500 kg.",
        heightError: "Enter a height between 0.5 and 2.5 meters.",
        messages: {
            underweight: "Your BMI is below the usual range.",
            normal: "Your BMI is within the normal range.",
            overweight: "Your BMI is within the overweight range.",
            obesity: "Your BMI is within the obesity range."
        }
    }
};

let language = localStorage.getItem("bmi-language") || "en";

function setError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    setError("weightError", "");
    setError("heightError", "");
}

function getCategory(bmi) {
    if (bmi < 18.5) return { key: "underweight", position: 12 };
    if (bmi < 25) return { key: "normal", position: 37 };
    if (bmi < 30) return { key: "overweight", position: 62 };
    return { key: "obesity", position: Math.min(94, 75 + (bmi - 30) / 2) };
}

function updateLanguage() {
    const t = translations[language];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.body.dataset.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        if (t[key]) element.textContent = t[key];
    });

    document.querySelectorAll("[data-placeholder]").forEach((element) => {
        const key = element.dataset.placeholder;
        element.placeholder = t[key];
    });

    languageIcon.textContent = language === "fa" ? "EN" : "FA";
    languageToggle.setAttribute(
        "aria-label",
        language === "fa" ? "Switch to English" : "تغییر به فارسی"
    );

    document.title = language === "fa"
        ? "BMI Calculator | محاسبه‌گر BMI"
        : "BMI Calculator";

    if (!result.classList.contains("hidden")) {
        const bmi = Number(bmiValue.textContent);
        const category = getCategory(bmi);
        statusBadge.textContent = t[category.key];
        resultMessage.textContent = t.messages[category.key];
    }

    localStorage.setItem("bmi-language", language);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);
    const t = translations[language];
    let valid = true;

    if (!weight || weight <= 0 || weight > 500) {
        setError("weightError", t.weightError);
        valid = false;
    }

    if (!height || height < 0.5 || height > 2.5) {
        setError("heightError", t.heightError);
        valid = false;
    }

    if (!valid) {
        result.classList.add("hidden");
        return;
    }

    const bmi = weight / (height * height);
    const roundedBMI = Number(bmi.toFixed(2));
    const category = getCategory(bmi);

    bmiValue.textContent = roundedBMI;
    statusBadge.textContent = t[category.key];
    resultMessage.textContent = t.messages[category.key];
    marker.style.left = `${category.position}%`;
    result.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
    form.reset();
    clearErrors();
    result.classList.add("hidden");
    weightInput.focus();
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeIcon.textContent = dark ? "☀" : "☾";
    localStorage.setItem("bmi-theme", dark ? "dark" : "light");
});

languageToggle.addEventListener("click", () => {
    language = language === "fa" ? "en" : "fa";
    updateLanguage();
});

if (localStorage.getItem("bmi-theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☀";
}

updateLanguage();
