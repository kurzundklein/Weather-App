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
  document.querySelector("#city").innerHTML = `${response.data.name}`;

  let temperatureCelsius = response.data.main.temp;
  document.querySelector("#temperature-today").innerHTML = `${Math.round(
    temperatureCelsius
  )} °C`;

  let iconElement = document.querySelector(".icon-today");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

  getForecast(response.data.coord);
}

//Default City
function showDefaultCity() {
  let cityInput = "Meran";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
}

//Search City
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
}

document.querySelector("form").addEventListener("submit", showCity);

//Current location
function showLatitudeLongitude(positionLatitudeLongitude) {
  let currentLatitude = positionLatitudeLongitude.coords.latitude;
  let currentLongitude = positionLatitudeLongitude.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&units=${unitTemperature}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeatherToday);
}

function showCurrentCity(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showLatitudeLongitude);
}

document.querySelector(".current").addEventListener("click", showCurrentCity);

// Forecast
function getForecast(coords) {
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lat}&exclude=current,minutely,hourly,alerts&units=${unitTemperature}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayForecast = date.getDay();
  return days[dayForecast];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-6">
      ${formatDay(forecastDay.dt)}
      <div class="temperature">
      ${Math.round(
        forecastDay.temp.min
      )}-<span class="temperature-max">${Math.round(
          forecastDay.temp.max
        )}°C</span>
      </div>
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" class="icon-today+1" />
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Basics
let unitTemperature = "metric";
let apiKey = "0f129b9a789d17793d44ec3aef53281f";
showDefaultCity();
