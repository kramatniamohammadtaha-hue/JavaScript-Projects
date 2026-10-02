# Digital Clock & Stopwatch ⏱️

A professional, responsive, and bilingual Digital Clock and Stopwatch built with HTML, CSS, and JavaScript.

## ✨ Features

- 🕐 Real-time digital clock
- 📅 Current date display
- ⏱️ Stopwatch with centisecond precision
- ▶️ Start, Pause and Reset
- 🏁 Lap time recording
- 🇬🇧 English and 🇮🇷 Persian language support
- 🌙 Dark / Light mode
- 💾 LocalStorage for language and theme preferences
- 📱 Responsive design
- 🎨 Modern user interface

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Date Object
- `Intl.DateTimeFormat`
- `setInterval()`
- `Date.now()`
- LocalStorage
- Responsive Web Design

## 🚀 How It Works

The digital clock uses the JavaScript `Date` object and updates every second with `setInterval()`.

The stopwatch calculates elapsed time using timestamps from `Date.now()` and updates the display continuously.

Lap times are added dynamically to the page using DOM manipulation.

```text
Date Object
    ↓
Current Time
    ↓
JavaScript
    ↓
DOM
    ↓
Digital Clock
```

## 🌐 Language Support

English and Persian are supported. The selected language is saved with LocalStorage.

## 🌙 Theme

Light and Dark modes are available and the selected theme is saved with LocalStorage.

## 📱 Responsive Design

Designed for Desktop, Tablet and Mobile.

## ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/kramatniamohammadtaha-hue/JavaScript-Projects.git
```

Open:

```text
digital-clock-stopwatch/index.html
```

No API key or external library is required.

## 🚀 Live Demo

https://kramatniamohammadtaha-hue.github.io/JavaScript-Projects/digital-clock-stopwatch/

## 📂 Project Structure

```text
digital-clock-stopwatch/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🎯 Purpose

This project was created as part of my JavaScript learning journey.

It focuses on Date and Time, `setInterval()`, `Date.now()`, DOM manipulation, event listeners, LocalStorage, internationalization and responsive web design.

## 👨‍💻 Author

**KeramatNia**

Learning and building with JavaScript 🚀
