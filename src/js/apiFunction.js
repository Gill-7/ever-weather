import { api_key } from "../../config";

function formData() {
  const input = document.querySelector(".search-input");
  const cityName = input.value;
  if (cityName) {
    return cityName
      .replace(/(\s+$|^\s+)/g, "")
      .replace(/(,\s+)/g, ",")
      .replace(/(\s+,)/g, ",")
      .replace(/\s+/g, "+");
  }
  return "";
}

function getCityName(latitude, longitude) {
  return `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
}

function getCityCoords(cityName) {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
}

function getWeatherDataByCoords(lat, lon) {
  return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${api_key}`;
}

export { formData, getCityName, getCityCoords, getWeatherDataByCoords };
