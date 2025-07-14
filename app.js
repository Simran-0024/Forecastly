const apikey = "d1c096217f214e5dac1171030251307";

const searchBox = document.querySelector(".search-col");
const searchBtn = document.querySelector(".search-icon");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=yes`);
  if (!response.ok) {
    alert("City not found!");
    return;
  }

  const data = await response.json();
  console.log(data);

  // Update the DOM elements
  document.querySelector(".city").innerText = data.location.name;
  document.querySelector(".temp").innerText = `${data.current.temp_c}°C`;
  document.querySelector(".humidity").innerText = `${data.current.humidity}%`;
  document.querySelector(".wind").innerText = `${data.current.wind_kph} kph`;

  // Update weather icon based on condition
  const condition = data.current.condition.text.toLowerCase();
  if (condition.includes("rain")) {
    weatherIcon.src = "images/rain.png";
  } else if (condition.includes("cloud")) {
    weatherIcon.src = "images/cloud.png";
  } else if (condition.includes("sun") || condition.includes("clear")) {
    weatherIcon.src = "images/clear.png";
  } else {
    weatherIcon.src = "images/mist.png"; // fallback
  }
}

// Search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Optionally trigger default city on load
checkWeather("London");
