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

function displayForecast() {
  let forecastElement = document.querySelector("#weather_forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thi", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="forecast_day">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/11d@2x.png"
        alt="weather icon"
        width="65px"
      />
      <div class="forecast_day_temperature">
        <span class="forecast_day_temperature_min">20°</span>/
        <span class="forecast_day_temperature_max">24°</span>
      </div>
    </div> 
    `;
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

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
}

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
}

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
}

let celsiusMax = null;
let celsiusMin = null;
let celsiusFeel = null;
let celsiusTemp = null;

let searchForm = document.querySelector("#enterCity");
searchForm.addEventListener("submit", searchCity);

let celsiusLink = document.querySelector(".celsius-link");
celsiusLink.addEventListener("click", toCelsius);

let fahrenheitLink = document.querySelector(".fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

search("New York");
displayForecast();
