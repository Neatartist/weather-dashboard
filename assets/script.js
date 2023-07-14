const ApiKey = "d176e1f9cd4b69d9ed7a09f6a87b1247";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const weatherState = document.getElementById("weather-state");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const uvIndex = document.getElementById("uv-index");


searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherByCity(searchInput.value);
  searchInput.value = "";
});

// Get weather by city name
const getWeatherByCity = async (city) => {
  // this is the api call to get the weather data
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
    const weatherData = await response.json();
    console.log(weatherData);
    // this is the function to show the weather data
    showWeatherData(weatherData);
  } catch (error) {
    console.log(error);
    alert("City not found");
  }
};

// Show weather data
const showWeatherData = (weatherData) => {
  cityName.innerText = weatherData.name;
  weatherState.innerText = weatherData.weather[0].main;
  temperature.innerText = `${Math.round(weatherData.main.temp)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
}

// Get weather by location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}

// Set user's position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeatherByLocation(latitude, longitude);
}

// Show error when there is an issue with geolocation service
function showError(error) {
  console.log(error.message);
}

// Get weather by location using latitude & longitude
const getWeatherByLocation = async (latitude, longitude) => {
  // this is the api call to get the weather data
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=metric`);
  const weatherData = await response.json();
  console.log
  // this is the function to show the weather data
  showWeatherData(weatherData);
};


