const apiKey = "5e8067550e4165d3baaecb955a638c8f"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        weatherInfo.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = "City not found. Please try again.";
        weatherInfo.classList.add("hidden");
    }
}

function displayWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = Math.round(data.main.temp);
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind-speed").textContent = data.wind.speed;

    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("error-message").textContent = "";

    // Temperature conversion functionality
    const toggleUnitBtn = document.getElementById("toggle-unit");
    toggleUnitBtn.textContent = "C";
    toggleUnitBtn.dataset.unit = "C";
    toggleUnitBtn.onclick = () => toggleTemperature(data.main.temp);
}

function toggleTemperature(tempCelsius) {
    const tempElement = document.getElementById("temperature");
    const toggleUnitBtn = document.getElementById("toggle-unit");

    if (toggleUnitBtn.dataset.unit === "C") {
        tempElement.textContent = Math.round((tempCelsius * 9/5) + 32);
        toggleUnitBtn.textContent = "F";
        toggleUnitBtn.dataset.unit = "F";
    } else {
        tempElement.textContent = Math.round(tempCelsius);
        toggleUnitBtn.textContent = "C";
        toggleUnitBtn.dataset.unit = "C";
    }
}
