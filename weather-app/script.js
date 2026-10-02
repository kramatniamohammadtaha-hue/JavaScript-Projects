const translations = {
  en: {
    eyebrow:"JAVASCRIPT PROJECT", title:"Weather App",
    subtitle:"Check the weather for any city.", placeholder:"Enter city name...",
    search:"Search", humidity:"Humidity", wind:"Wind", feels:"Feels like",
    emptyTitle:"Search for a city",
    emptyText:"Enter a city name to see weather information.",
    footer:"Built with HTML, CSS and JavaScript.",
    notFound:"City not found. Please check the city name.",
    emptySearch:"Please enter a city name."
  },
  fa: {
    eyebrow:"پروژه جاوااسکریپت", title:"برنامه آب‌وهوا",
    subtitle:"آب‌وهوای هر شهری را بررسی کنید.", placeholder:"نام شهر را وارد کنید...",
    search:"جستجو", humidity:"رطوبت", wind:"باد", feels:"دمای احساس‌شده",
    emptyTitle:"یک شهر را جستجو کنید",
    emptyText:"نام شهر را وارد کنید تا اطلاعات آب‌وهوا نمایش داده شود.",
    footer:"ساخته شده با HTML، CSS و JavaScript.",
    notFound:"شهر پیدا نشد. نام شهر را بررسی کنید.",
    emptySearch:"لطفاً نام شهر را وارد کنید."
  }
};

let language = localStorage.getItem("weather-language") || "en";

const form = document.getElementById("searchForm");
const input = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const emptyState = document.getElementById("emptyState");
const message = document.getElementById("message");

function updateLanguage() {
  const t = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t[el.dataset.i18nPlaceholder]);
  document.getElementById("languageBtn").textContent = language === "en" ? "FA" : "EN";
  document.title = t.title;
}

function setMessage(text = "") {
  message.textContent = text;
}

function iconFor(code) {
  if (code === 0) return "☀";
  if ([1,2,3].includes(code)) return "⛅";
  if ([45,48].includes(code)) return "🌫";
  if ([51,53,55,56,57].includes(code)) return "🌦";
  if ([61,63,65,66,67,80,81,82].includes(code)) return "🌧";
  if ([71,73,75,77,85,86].includes(code)) return "❄";
  if ([95,96,99].includes(code)) return "⛈";
  return "🌤";
}

function conditionFor(code) {
  const en = {
    0:"Clear sky",1:"Mainly clear",2:"Partly cloudy",3:"Overcast",
    45:"Fog",48:"Depositing rime fog",51:"Light drizzle",53:"Drizzle",
    55:"Heavy drizzle",61:"Light rain",63:"Rain",65:"Heavy rain",
    71:"Light snow",73:"Snow",75:"Heavy snow",80:"Rain showers",
    81:"Rain showers",82:"Heavy rain showers",95:"Thunderstorm",
    96:"Thunderstorm with hail",99:"Thunderstorm with heavy hail"
  };
  const fa = {
    0:"آسمان صاف",1:"عمدتاً صاف",2:"نیمه‌ابری",3:"ابری",
    45:"مه",48:"مه یخی",51:"نم‌نم باران",53:"باران ملایم",
    55:"باران شدید",61:"باران سبک",63:"باران",65:"باران شدید",
    71:"برف سبک",73:"برف",75:"برف شدید",80:"رگبار باران",
    81:"رگبار باران",82:"رگبار شدید",95:"رعدوبرق",
    96:"رعدوبرق و تگرگ",99:"رعدوبرق و تگرگ شدید"
  };
  return (language === "fa" ? fa : en)[code] || (language === "fa" ? "وضعیت نامشخص" : "Unknown");
}

async function getWeather(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) throw new Error("network");
  const geo = await geoResponse.json();
  if (!geo.results?.length) throw new Error("not-found");

  const place = geo.results[0];
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error("network");
  const data = await weatherResponse.json();

  return { place, current:data.current };
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const city = input.value.trim();
  const t = translations[language];

  if (!city) {
    setMessage(t.emptySearch);
    input.focus();
    return;
  }

  setMessage(language === "fa" ? "در حال دریافت اطلاعات..." : "Loading weather...");
  weatherCard.hidden = true;
  emptyState.hidden = true;

  try {
    const { place, current } = await getWeather(city);
    document.getElementById("cityName").textContent = place.name;
    document.getElementById("countryName").textContent =
      [place.admin1, place.country].filter(Boolean).join(" • ");
    document.getElementById("temperature").textContent = Math.round(current.temperature_2m);
    document.getElementById("condition").textContent = conditionFor(current.weather_code);
    document.getElementById("weatherIcon").textContent = iconFor(current.weather_code);
    document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
    document.getElementById("wind").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    document.getElementById("feels").textContent = `${Math.round(current.apparent_temperature)}°C`;
    setMessage("");
    weatherCard.hidden = false;
  } catch (error) {
    weatherCard.hidden = true;
    emptyState.hidden = false;
    setMessage(error.message === "not-found" ? t.notFound : (language === "fa" ? "خطا در دریافت اطلاعات آب‌وهوا." : "Could not load weather data."));
  }
});

document.getElementById("languageBtn").addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  localStorage.setItem("weather-language", language);
  updateLanguage();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("weather-theme", dark ? "dark" : "light");
  document.getElementById("themeBtn").textContent = dark ? "☀" : "☾";
});

if (localStorage.getItem("weather-theme") === "dark") document.body.classList.add("dark");
document.getElementById("themeBtn").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
updateLanguage();
