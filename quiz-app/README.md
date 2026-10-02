# Quiz App 🎯

A professional, responsive, and bilingual JavaScript Quiz App built with HTML, CSS, and JavaScript.

## ✨ Features

- 🎯 10 JavaScript questions
- 🌐 Bilingual questions and answers (English / Persian)
- ⏱️ 15-second timer for each question
- ✅ Correct answer detection
- ❌ Wrong answer detection
- 📊 Final score
- 📈 Accuracy percentage
- 🔄 Restart quiz
- 🇬🇧 English and 🇮🇷 Persian interface
- 🌙 Dark / Light mode
- 💾 LocalStorage for language and theme
- 📱 Responsive design
- 🎨 Modern user interface
- 🚫 No external API or library required

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- Arrays and objects
- Functions
- DOM manipulation
- Event listeners
- `setInterval()`
- Conditions
- LocalStorage
- Responsive Web Design

## 🚀 How It Works

The questions are stored in a JavaScript array of objects.

```text
Questions Array
      ↓
Current Question
      ↓
Answer Buttons
      ↓
User Selection
      ↓
Check Answer
      ↓
Score
      ↓
Next Question
      ↓
Final Result
```

Each question contains:

- Question text
- Answer options
- Correct answer index

The application dynamically creates the answer buttons using the DOM.

## ⏱️ Timer

Every question has a 15-second timer.

The timer is implemented using:

```javascript
setInterval()
```

If the time reaches zero, the question is automatically submitted as unanswered.

## 📊 Scoring

Each correct answer gives:

```text
10 points
```

At the end, the application calculates:

- Total score
- Correct answers
- Wrong answers
- Accuracy percentage

## 🌐 Language Support

The interface supports:

- English questions and interface
- Persian questions and interface

Questions and answer choices are localized for both languages.

The selected language is stored using LocalStorage.

## 🌙 Theme

The project includes:

- Light mode
- Dark mode

The selected theme is also saved using LocalStorage.

## 📱 Responsive Design

Designed for:

- Desktop
- Tablet
- Mobile

## ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/kramatniamohammadtaha-hue/JavaScript-Projects.git
```

Open:

```text
quiz-app/index.html
```

No API key or external library is required.

## 🚀 Live Demo

https://kramatniamohammadtaha-hue.github.io/JavaScript-Projects/quiz-app/

## 📂 Project Structure

```text
quiz-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🎯 Purpose

This project was created as part of my JavaScript learning journey.

It focuses on:

- Arrays
- Objects
- Functions
- Conditions
- DOM manipulation
- Event listeners
- Timers
- LocalStorage
- Dynamic UI updates
- Responsive web design

## 👨‍💻 Author

**KeramatNia**

Learning and building with JavaScript 🚀
