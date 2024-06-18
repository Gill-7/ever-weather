import {
  formData,
  getCityName,
  getCityCoords,
  getWeatherDataByCoords,
} from "./apiFunction.js";

import "../styles/index.css";

import {
  renderWeatherInfo,
  displayDailyForecast,
  displayHourlyForecast,
  // changeHoursPage,
} from "./apiDOM.js";

//   // var image = document.images[0];
//   // var downImg = new Image();
//   // downImg.onload = function () {
//   //   image.src = this.src;
//   // };

//   // downImg.src = "../svg/weather.jpg";

const searchBtn = document.querySelector(".search-btn");
const input = document.querySelector(".search-input");

//   const dailyBtn = document.querySelector(".daily-btn");
//   const hourlyBtn = document.querySelector(".hourly-btn");

//   const changeHoursLeft = document.querySelector(".change-hours__left");
//   const changeHoursRight = document.querySelector(".change-hours__right");

//   const dots = document.querySelectorAll(".dot");

//   let hoursPage = 1;

//   document.querySelector("body").style.visibility = "hidden";

//   document.querySelector("#loader").style.visibility = "visible";

function getPosition() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    }
  });
}

const getWeatherData = async (initialLoad = false) => {
  try {
    let cityName;
    let latitude;
    let longitude;

    if (initialLoad) {
      const { coords } = await getPosition();
      latitude = coords.latitude;
      longitude = coords.longitude;
      const cityCoords = await fetch(getCityName(latitude, longitude));

      const cityData = await cityCoords.json();
      cityName = cityData[0].name;
    } else {
      cityName = formData();
      const cityCoords = await fetch(getCityCoords(cityName));
      const cityLatlon = await cityCoords.json();
      latitude = cityLatlon[0].lat;
      longitude = cityLatlon[0].lon;
    }
    if (!cityName) {
      return;
    }

    const weatherData = await fetch(
      getWeatherDataByCoords(latitude, longitude)
    );
    const data = await weatherData.json();
    document.querySelector(".error-msg").style.visibility = "hidden";
    renderWeatherInfo(data, cityName);

    //       document.querySelector("body").style.visibility = "visible";

    //       document.querySelector("#loader").style.visibility = "hidden";

    // document.querySelector(".degree").style.display = "show";
    // document.querySelector(".celcius").style.display = "block";
    document.querySelector(".form").style.display = "block";
    //       document.querySelector(".weather-details-temp").style.display = "flex";
    //       document.querySelector(".weather-details-humidity").style.display = "flex";
    //       document.querySelector(".weather-details-speed").style.display = "flex";
    //       document.querySelector(".weather-details-chance").style.display = "flex";
    //       document.querySelector(".change-forecast").style.display = "flex";
  } catch (err) {
    document.querySelector(".error-msg").style.visibility = "visible";
  }
  input.value = "";
};

getWeatherData(true);

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherData();
});

//   dailyBtn.addEventListener("click", displayDailyForecast);
//   hourlyBtn.addEventListener("click", displayHourlyForecast);

//   changeHoursLeft.addEventListener("click", () => {
//     if (hoursPage > 1) {
//       hoursPage--;
//       changeHoursPage(hoursPage);
//     }
//   });

//   changeHoursRight.addEventListener("click", () => {
//     if (hoursPage < 3) {
//       hoursPage++;
//       changeHoursPage(hoursPage);
//     }
//   });

//   dots.forEach((dot) => {
//     dot.addEventListener("click", (e) => {
//       // hoursPage =
//       hoursPage = parseInt(e.target.dataset.dot, 10);
//       changeHoursPage(hoursPage);
//     });
//   });
