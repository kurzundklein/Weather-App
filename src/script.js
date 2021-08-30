//Date & Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

document.querySelector("#today").innerHTML = `Today, ${day} ${hour}:${minutes}`;

//Fahrenheit & Celsius
function convertFahrenheit(event) {
  event.preventDefault;
  document.querySelector("#temperature-today").innerHTML = "66 °F";
}

document
  .querySelector(".fahrenheit")
  .addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault;
  document.querySelector("#temperature-today").innerHTML = "17 °C";
}

document.querySelector(".celsius").addEventListener("click", convertCelsius);

//City Name & Temperature
function showWeatherToday(response) {
  let weatherCity = `${Math.round(response.data.main.temp)}°C`;

  document.querySelector("#temperature-today").innerHTML = `${weatherCity}`;
  document.querySelector("#city").innerHTML = `${response.data.name}`;
}

//Search City
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let unitTemperature = "metric";
  let apiKey = "0f129b9a789d17793d44ec3aef53281f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
}

document.querySelector("form").addEventListener("submit", showCity);

//Current location
function showCurrentCity(event) {
  event.preventDefault();

  function showLatitudeLongitude(positionLatitudeLongitude) {
    let currentLatitude = positionLatitudeLongitude.coords.latitude;
    let currentLongitude = positionLatitudeLongitude.coords.longitude;
    let unitTemperature = "metric";
    let apiKey = "0f129b9a789d17793d44ec3aef53281f";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${unitTemperature}&appid=${apiKey}`;

    axios.get(`${apiUrl}`).then(showWeatherToday);
  }

  navigator.geolocation.getCurrentPosition(showLatitudeLongitude);
}

document.querySelector(".current").addEventListener("click", showCurrentCity);
