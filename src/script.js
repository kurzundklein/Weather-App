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
  hour = `0${hour}`;
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

  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let hourSunrise = sunriseTime.getHours(sunriseTime);
  if (hourSunrise < 10) {
    hourSunrise = `0${hourSunrise}`;
  }
  let minutesSunrise = sunriseTime.getMinutes(sunriseTime);
  if (minutesSunrise < 10) {
    minutesSunrise = `0${minutesSunrise}`;
  }
  document.querySelector(
    "#sunriseTime"
  ).innerHTML = `${hourSunrise}:${minutesSunrise}`;

  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let hourSunset = sunsetTime.getHours(sunsetTime);
  if (hourSunset < 10) {
    hourSunset = `0${hourSunset}`;
  }
  let minutesSunset = sunsetTime.getMinutes(sunsetTime);
  if (minutesSunset < 10) {
    minutesSunset = `0${minutesSunset}`;
  }
  document.querySelector(
    "#sunsetTime"
  ).innerHTML = `${hourSunset}:${minutesSunset}`;
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
function showLatitudeLongitude(positionLatitudeLongitude) {
  let currentLatitude = positionLatitudeLongitude.coords.latitude;
  let currentLongitude = positionLatitudeLongitude.coords.longitude;
  let unitTemperature = "metric";
  let apiKey = "0f129b9a789d17793d44ec3aef53281f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
}

function showCurrentCity(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showLatitudeLongitude);
}

document.querySelector(".current").addEventListener("click", showCurrentCity);
