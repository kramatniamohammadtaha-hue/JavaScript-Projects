# Weather App 🌦️

A professional, responsive, and bilingual Weather App built with HTML, CSS, and JavaScript.

## ✨ Features

* 🌦️ Search weather by city
* 🌡️ Display current temperature
* 💧 Display humidity
* 💨 Display wind speed
* 🌡️ Display feels-like temperature
* ☀️ Weather condition and icon
* 🇬🇧 English and 🇮🇷 Persian language support
* 🌙 Dark / Light mode
* 📱 Responsive design
* 🌐 Real-time weather data
* ⚠️ Input validation and error handling
* 💾 LocalStorage for language and theme preferences

## 🛠️ Technologies

* **HTML5** — Page structure
* **CSS3** — Styling and responsive design
* **JavaScript** — Application logic
* **DOM** — Dynamic page updates
* **Fetch API** — Requesting data from APIs
* **Async / Await** — Handling asynchronous operations
* **JSON** — Working with API data
* **REST API** — Connecting to weather services
* **LocalStorage** — Saving language and theme preferences

## 🌐 API

This project uses **Open-Meteo** to retrieve geocoding and weather information.

No API key is required.

The application uses:

* Open-Meteo Geocoding API
* Open-Meteo Weather API

## 🚀 How It Works

1. Enter a city name in the search box.
2. The application sends a request to the geocoding API.
3. The city coordinates are received.
4. The application uses the coordinates to request current weather data.
5. The weather information is displayed on the page.
6. JavaScript updates the interface dynamically using the DOM.

```text
City Name
    ↓
Geocoding API
    ↓
Latitude + Longitude
    ↓
Weather API
    ↓
JSON Data
    ↓
JavaScript
    ↓
DOM
    ↓
Weather Information
```

## 📱 Responsive Design

The application is designed to work on:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

## 🎨 User Interface

The application includes:

* Modern weather dashboard
* Responsive search box
* Weather condition icons
* Temperature display
* Weather information cards
* Dark / Light theme
* English / Persian interface

## 💾 LocalStorage

The application stores:

* Selected language
* Selected theme

This means the user's preferences remain available after refreshing the page.

## ▶️ Run Locally

Clone the repository:

```bash
git clone https://github.com/kramatniamohammadtaha-hue/JavaScript-Projects.git
```

Open the project folder:

```text
weather-app
```

Then open:

```text
index.html
```

in a modern web browser.

An internet connection is required to retrieve weather data from the API.

## 🚀 Live Demo

[Open Weather App](https://kramatniamohammadtaha-hue.github.io/JavaScript-Projects/weather-app/)

## 📂 Project Structure

```text
weather-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🎯 Purpose

This project was created as part of my JavaScript learning journey.

It focuses on practicing:

* Fetch API
* Async / Await
* JSON
* REST APIs
* DOM manipulation
* LocalStorage
* Error handling
* Responsive web design

## 👨‍💻 Author

**KeramatNia**

Learning and building with JavaScript 🚀
