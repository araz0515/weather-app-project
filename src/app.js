function currentDate(date) {
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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}
let now = new Date();
let today = document.querySelector("#date");
today.innerHTML = currentDate(now);

function search(city) {
  let apiKey = "aaf4aefb5cfd88c1dc393518ce4188fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function searchPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function getTemp(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector("#high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}˚`;

  document.querySelector("#low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}˚`;

  document.querySelector("#humidity").innerHTML = ` ${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector("#weather").innerHTML = response.data.weather[0].main;

  document.querySelector("#feels-like").innerHTML = ` ${Math.round(
    response.data.main.feels_like
  )}˚C`;
}

function getCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "aaf4aefb5cfd88c1dc393518ce4188fe";
  let unit = "metric";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemp);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

search("New York");

let button = document.querySelector("#current-location");
button.addEventListener("click", getPosition);

let searchCity = document.querySelector("#search-input");
searchCity.addEventListener("submit", searchPlace);
