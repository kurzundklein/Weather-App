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

document.querySelector("#today").innerHTML = `${day}, ${hour}:${minutes}`;

//City Name & Todays Temperature & Icons & Sunrise & Sunset
function showWeatherToday(response) {
  console.log(response);

  document.querySelector("#city").innerHTML = `${response.data.name}`;

  temperatureCelsius = response.data.main.temp;
  document.querySelector("#temperature-today").innerHTML = `${Math.round(
    temperatureCelsius
  )} °C`;

  let iconElement = document.querySelector(".icon-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;

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

  displayForecast();
}

//Default City
function showDefaultCity() {
  let cityInput = "Meran";
  let unitTemperature = "metric";
  let apiKey = "0f129b9a789d17793d44ec3aef53281f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
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

//Fahrenheit & Celsius
function convertFahrenheit(event) {
  event.preventDefault;
  let fahrenheitTemperature = (temperatureCelsius * 9) / 5 + 32;
  document.querySelector("#temperature-today").innerHTML = `${Math.round(
    fahrenheitTemperature
  )} °F`;

  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
}

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault;
  document.querySelector("#temperature-today").innerHTML = `${Math.round(
    temperatureCelsius
  )} °C`;

  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", convertCelsius);

// Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Tomorrow", "Monday", "Tuesday", "Wednesday"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-6">
      ${day}
      <div class="temperature">
      28-<span class="temperature-max">26°C</span>
      </div>
      <img src="" alt="" class="icon-today+1" />
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Basics
let temperatureCelsius = null;
showDefaultCity();
