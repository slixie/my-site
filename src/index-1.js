let now = new Date();
let p = document.querySelector("#currentTime");

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

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

p.innerHTML = `${day} ${hours}:${minutes}`;

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
}

function search(city) {
  let apiKey = "fc5e25b8c524cb4b4ebd4ca86a442c09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  search(city);
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

let searchForm = document.querySelector("#enterCity");
searchForm.addEventListener("submit", searchCity);

//3

function toCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#cityTemp");
  celsiusTemperature.innerHTML = 19;
}

function toFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#cityTemp");
  fahrenheitTemperature.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

//

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

search("New York");
