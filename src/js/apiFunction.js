// import { api_key, geoCode_api_key } from "../../config";

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

// function getUserLocation(latitude, longitude) {
//   return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${geoCode_api_key}`;
//   // return `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;
// }

// function getCityCoords(cityName) {
//   return `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${geoCode_api_key}`;
//   // return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
// }

// function getWeatherDataByCoords(lat, lon) {
//   return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${api_key}`;
// }

export { formData, getUserLocation, getCityCoords, getWeatherDataByCoords };
