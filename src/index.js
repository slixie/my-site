//set hour and day

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//set the weather forecast

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather_forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast_day">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="weather icon"
        width="65px"
      />
      <div class="forecast_day_temperature">
        <span class="forecast_day_temperature_max">${Math.round(
          forecastDay.temp.max
        )}°</span>/     
        <span class="forecast_day_temperature_min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div> 
    `;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

//forecast

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//set the current weather to the site

function showTemperature(response) {
  console.log(response.data);
  let city = (document.querySelector("#cityName").innerHTML =
    response.data.name);
  let temp = (document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  ));
  let feels = (document.querySelector("#feelsLike").innerHTML =
    Math.round(response.data.main.feels_like) + "°C");
  let wind_speed = (document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let tempMax = (document.querySelector("#temp_max").innerHTML =
    Math.round(response.data.main.temp_max) + "°C");
  let tempMin = (document.querySelector("#temp_min").innerHTML =
    Math.round(response.data.main.temp_min) + "°C");
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let time = (document.querySelector("#currentTime").innerHTML = formatDate(
    response.data.dt * 1000
  ));
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusFeel = response.data.main.feels_like;
  celsiusTemp = response.data.main.temp;
  celsiusMax = response.data.main.temp_max;
  celsiusMin = response.data.main.temp_min;

  getForecast(response.data.coord);
}

//current weather data

function search(city) {
  let apiKey = "fc5e25b8c524cb4b4ebd4ca86a442c09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput");
  search(city.value);
  city.value = " ";
}

function searchLocation(position) {
  let apiKey = "fc5e25b8c524cb4b4ebd4ca86a442c09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//converting degrees to Celsius

function toCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let celsiusTemperature = document.querySelector("#cityTemp");
  celsiusTemperature.innerHTML = Math.round(celsiusTemp);

  let celsiusFeelsLike = document.querySelector("#feelsLike");
  celsiusFeelsLike.innerHTML = Math.round(celsiusFeel) + "°C";

  let tempMaxCelsius = document.querySelector("#temp_max");
  tempMaxCelsius.innerHTML = Math.round(celsiusMax) + "°C";
  let tempMinCelsius = document.querySelector("#temp_min");
  tempMinCelsius.innerHTML = Math.round(celsiusMin) + "°C";
  forecastToCelsius();
}

//converting degrees to Fahrenheit

function toFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = document.querySelector("#cityTemp");
  fahrenheitTemperature.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);

  let fahrenheitFeelsLike = document.querySelector("#feelsLike");
  fahrenheitFeelsLike.innerHTML = Math.round((celsiusFeel * 9) / 5 + 32) + "°F";

  let tempMaxFahrenheit = document.querySelector("#temp_max");
  tempMaxFahrenheit.innerHTML = Math.round((celsiusMax * 9) / 5 + 32) + "°F";
  let tempMinFahrenheit = document.querySelector("#temp_min");
  tempMinFahrenheit.innerHTML = Math.round((celsiusMin * 9) / 5 + 32) + "°F";
  forecastToFahrenheit();
}

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", toCelsius);

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

let searchForm = document.querySelector("#enterCity");
searchForm.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

let celsiusMax = null;
let celsiusMin = null;
let celsiusFeel = null;
let celsiusTemp = null;

//initial weather info

search("New York");
