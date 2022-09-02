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

//2
function showTemperature(response) {
  console.log(response.data);
  let city = (document.querySelector("#cityName").innerHTML =
    response.data.name);
  let tempa = (document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  ));
  let feels = (document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  ));
  let wind_spees = (document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let visibility = (document.querySelector("#visibility").innerHTML =
    Math.round(response.data.visibility / 5280));
  let pressure = (document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure * 0.0295301
  ));
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

search("New York");

function searchLocation(position) {
  let apiKey = "fc5e25b8c524cb4b4ebd4ca86a442c09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#enterCity");
searchForm.addEventListener("submit", searchCity);

//3

function toCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#cityTemp");
  celsiusTemperature.innerHTML = response.data.main.temp;
}

function toFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#cityTemp");
  fahrenheitTemperature.innerHTML = Math.round(
    response.data.main.temp * 1,
    8 + 32
  );
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

//

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);