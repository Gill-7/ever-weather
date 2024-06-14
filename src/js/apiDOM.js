import {
  capitalize,
  formatDate,
  formatTime,
  renderWeatherIcon,
} from "./untils.js";

function changeHoursPage(hoursPage) {
  const hoursForecasts = document.querySelectorAll(".forecast-hourly");
  const dots = document.querySelectorAll(".dot");
  const dot1 = document.querySelector(".dot1");
  const dot2 = document.querySelector(".dot2");
  const dot3 = document.querySelector(".dot3");

  hoursForecasts.forEach((forecast) => {
    forecast.style.display = "none";
  });

  dots.forEach((dot) => {
    dot.classList.remove("dot-selected");
  });

  if (hoursPage === 1) {
    document.querySelector("#hourly-time-1").style.display = "grid";
    document.querySelector("#hourly-time-2").style.display = "grid";
    document.querySelector("#hourly-time-3").style.display = "grid";
    document.querySelector("#hourly-time-4").style.display = "grid";
    document.querySelector("#hourly-time-5").style.display = "grid";
    document.querySelector("#hourly-time-6").style.display = "grid";
    document.querySelector("#hourly-time-7").style.display = "grid";
    document.querySelector("#hourly-time-8").style.display = "grid";

    dot1.classList.add("dot-selected");
  }

  if (hoursPage === 2) {
    document.querySelector("#hourly-time-9").style.display = "grid";
    document.querySelector("#hourly-time-10").style.display = "grid";
    document.querySelector("#hourly-time-11").style.display = "grid";
    document.querySelector("#hourly-time-12").style.display = "grid";
    document.querySelector("#hourly-time-13").style.display = "grid";
    document.querySelector("#hourly-time-14").style.display = "grid";
    document.querySelector("#hourly-time-15").style.display = "grid";
    document.querySelector("#hourly-time-16").style.display = "grid";

    dot2.classList.add("dot-selected");
  }

  if (hoursPage === 3) {
    document.querySelector("#hourly-time-17").style.display = "grid";
    document.querySelector("#hourly-time-18").style.display = "grid";
    document.querySelector("#hourly-time-19").style.display = "grid";
    document.querySelector("#hourly-time-20").style.display = "grid";
    document.querySelector("#hourly-time-21").style.display = "grid";
    document.querySelector("#hourly-time-22").style.display = "grid";
    document.querySelector("#hourly-time-23").style.display = "grid";
    document.querySelector("#hourly-time-24").style.display = "grid";

    dot3.classList.add("dot-selected");
  }
}

function renderWeatherData(data, CityName) {
  // update the weather description
  const weatherInfoDescription = document.querySelector(
    ".weather-info__description"
  );
  weatherInfoDescription.textContent = capitalize(
    data.current.weather[0].description
  );

  // update the city name based on search input
  const weatherInfoCity = document.querySelector(".weather-info__city");
  weatherInfoCity.textContent = CityName;

  // show the current temperature
  const weatherInfoTemperature = document.querySelector(
    ".weather-info__temperature"
  );
  weatherInfoTemperature.textContent = `${Math.round(data.current.temp)}`;

  const weatherDate = document.querySelector(".weather-day-date");
  weatherDate.textContent = formatDate(
    data.current.dt,
    data.timezone_offset,
    "day"
  );

  const weatherTime = document.querySelector(".weather-time");
  weatherTime.textContent = formatTime(data.current.dt, data.timezone_offset);

  const weatherIcon = document.querySelector(".weather-info__icon");
  weatherIcon.src = renderWeatherIcon(data.current.weather[0].icon);

  const weatherFeelslike = document.querySelector(".weather-feelslike");
  weatherFeelslike.textContent = `${Math.round(data.current.feels_like)} °C`;

  const weatherWindSpeed = document.querySelector(".weather-speed");
  weatherWindSpeed.textContent = `${Math.round(data.current.wind_speed)} km/h`;

  const weatherHumidity = document.querySelector(".weather-humidity");
  weatherHumidity.textContent = `${Math.round(data.current.humidity)} %`;

  const weatherPrecp = document.querySelector(".weather-precp");
  weatherPrecp.textContent = `${Math.round(data.daily[0].pop * 100)} %`;
}

function displayDailyForecast() {
  document.querySelector(".daily-btn").classList.toggle("forecast-selected");
  document.querySelector(".hourly-btn").classList.toggle("forecast-selected");

  //hide the change hourly forecast buttons
  document.querySelector(".change-hours").style.display = "none";

  document.querySelector(".forecast-hourly-main-container").style.display =
    "none";

  // show the daily forecast data when daily button is clicked
  document.querySelector(".forecast-daily-container").style.display = "grid";
}

function displayHourlyForecast() {
  document.querySelector(".hourly-btn").classList.toggle("forecast-selected");
  document.querySelector(".daily-btn").classList.toggle("forecast-selected");

  // show the change hourly forecast buttons
  document.querySelector(".change-hours").style.display = "flex";

  document.querySelector(".forecast-hourly-main-container").style.display =
    "block";

  // hide the daily forecast data when hourly button is clicked
  document.querySelector(".forecast-daily-container").style.display = "none";
}

function renderDailyForecast(data) {
  /*  RENDER DAILY DAYS  */
  const firstDay = document.querySelector("#first-day .forecast-daily-day");
  firstDay.textContent = `${formatDate(
    data.daily[0].dt,
    data.timezone_offset
  )}`;

  const secondDay = document.querySelector("#second-day .forecast-daily-day");
  secondDay.textContent = formatDate(data.daily[1].dt, data.timezone_offset);

  const thirdDay = document.querySelector("#third-day .forecast-daily-day");
  thirdDay.textContent = formatDate(data.daily[2].dt, data.timezone_offset);

  const fourthDay = document.querySelector("#fourth-day .forecast-daily-day");
  fourthDay.textContent = formatDate(data.daily[3].dt, data.timezone_offset);

  const fifthDay = document.querySelector("#fifth-day .forecast-daily-day");
  fifthDay.textContent = formatDate(data.daily[4].dt, data.timezone_offset);

  const sixthDay = document.querySelector("#sixth-day .forecast-daily-day");
  sixthDay.textContent = formatDate(data.daily[5].dt, data.timezone_offset);

  const seventhDay = document.querySelector("#seventh-day .forecast-daily-day");
  seventhDay.textContent = formatDate(data.daily[6].dt, data.timezone_offset);

  /*  RENDER DAILY MAX TEMP  */

  const firstMaxTemp = document.querySelector(
    "#first-day .forecast-daily-temp-max"
  );
  firstMaxTemp.textContent = `${Math.round(data.daily[0].temp.max)} °C`;

  const secondMaxTemp = document.querySelector(
    "#second-day .forecast-daily-temp-max"
  );
  secondMaxTemp.textContent = `${Math.round(data.daily[1].temp.max)} °C`;

  const thirdMaxTemp = document.querySelector(
    "#third-day .forecast-daily-temp-max"
  );
  thirdMaxTemp.textContent = `${Math.round(data.daily[2].temp.max)} °C`;

  const fourthMaxTemp = document.querySelector(
    "#fourth-day .forecast-daily-temp-max"
  );
  fourthMaxTemp.textContent = `${Math.round(data.daily[3].temp.max)} °C`;

  const fifthMaxTemp = document.querySelector(
    "#fifth-day .forecast-daily-temp-max"
  );
  fifthMaxTemp.textContent = `${Math.round(data.daily[4].temp.max)} °C`;

  const sixthMaxTemp = document.querySelector(
    "#sixth-day .forecast-daily-temp-max"
  );
  sixthMaxTemp.textContent = `${Math.round(data.daily[5].temp.max)} °C`;

  const seventhMaxTemp = document.querySelector(
    "#seventh-day .forecast-daily-temp-max"
  );
  seventhMaxTemp.textContent = `${Math.round(data.daily[6].temp.max)} °C`;

  /*  RENDER DAILY MIN TEMP  */

  const firstMinTemp = document.querySelector(
    "#first-day .forecast-daily-temp-min"
  );
  firstMinTemp.textContent = `${Math.round(data.daily[0].temp.min)} °C`;

  const secondMinTemp = document.querySelector(
    "#second-day .forecast-daily-temp-min"
  );
  secondMinTemp.textContent = `${Math.round(data.daily[1].temp.min)} °C`;

  const thirdMinTemp = document.querySelector(
    "#third-day .forecast-daily-temp-min"
  );
  thirdMinTemp.textContent = `${Math.round(data.daily[2].temp.min)} °C`;

  const fourthMinTemp = document.querySelector(
    "#fourth-day .forecast-daily-temp-min"
  );
  fourthMinTemp.textContent = `${Math.round(data.daily[3].temp.min)} °C`;

  const fifthMinTemp = document.querySelector(
    "#fifth-day .forecast-daily-temp-min"
  );
  fifthMinTemp.textContent = `${Math.round(data.daily[4].temp.min)} °C`;

  const sixthMinTemp = document.querySelector(
    "#sixth-day .forecast-daily-temp-min"
  );
  sixthMinTemp.textContent = `${Math.round(data.daily[5].temp.min)} °C`;

  const seventhMinTemp = document.querySelector(
    "#seventh-day .forecast-daily-temp-min"
  );
  seventhMinTemp.textContent = `${Math.round(data.daily[6].temp.min)} °C`;

  /*  RENDER DAILY WEATHER ICON  */

  const firstDayWeatherIcon = document.querySelector("#first-day img");
  firstDayWeatherIcon.src = renderWeatherIcon(data.daily[0].weather[0].icon);

  const secondDayWeatherIcon = document.querySelector("#second-day img");
  secondDayWeatherIcon.src = renderWeatherIcon(data.daily[1].weather[0].icon);

  const thirdDayWeatherIcon = document.querySelector("#third-day img");
  thirdDayWeatherIcon.src = renderWeatherIcon(data.daily[2].weather[0].icon);

  const fourthDayWeatherIcon = document.querySelector("#fourth-day img");
  fourthDayWeatherIcon.src = renderWeatherIcon(data.daily[3].weather[0].icon);

  const fifthDayWeatherIcon = document.querySelector("#fifth-day img");
  fifthDayWeatherIcon.src = renderWeatherIcon(data.daily[4].weather[0].icon);

  const sixthDayWeatherIcon = document.querySelector("#sixth-day img");
  sixthDayWeatherIcon.src = renderWeatherIcon(data.daily[5].weather[0].icon);

  const seventhDayWeatherIcon = document.querySelector("#seventh-day img");
  seventhDayWeatherIcon.src = renderWeatherIcon(data.daily[6].weather[0].icon);
}

function renderHourlyForecast(data) {
  // RENDER HOURLY TIME
  const hourlyTime1 = document.querySelector(
    "#hourly-time-1 .forecast-hourly-time"
  );
  hourlyTime1.textContent = formatTime(
    data.hourly[0].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime2 = document.querySelector(
    "#hourly-time-2 .forecast-hourly-time"
  );
  hourlyTime2.textContent = formatTime(
    data.hourly[1].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime3 = document.querySelector(
    "#hourly-time-3 .forecast-hourly-time"
  );
  hourlyTime3.textContent = formatTime(
    data.hourly[2].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime4 = document.querySelector(
    "#hourly-time-4 .forecast-hourly-time"
  );
  hourlyTime4.textContent = formatTime(
    data.hourly[3].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime5 = document.querySelector(
    "#hourly-time-5 .forecast-hourly-time"
  );
  hourlyTime5.textContent = formatTime(
    data.hourly[4].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime6 = document.querySelector(
    "#hourly-time-6 .forecast-hourly-time"
  );
  hourlyTime6.textContent = formatTime(
    data.hourly[5].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime7 = document.querySelector(
    "#hourly-time-7 .forecast-hourly-time"
  );
  hourlyTime7.textContent = formatTime(
    data.hourly[6].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime8 = document.querySelector(
    "#hourly-time-8 .forecast-hourly-time"
  );
  hourlyTime8.textContent = formatTime(
    data.hourly[7].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime9 = document.querySelector(
    "#hourly-time-9 .forecast-hourly-time"
  );
  hourlyTime9.textContent = formatTime(
    data.hourly[8].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime10 = document.querySelector(
    "#hourly-time-10 .forecast-hourly-time"
  );
  hourlyTime10.textContent = formatTime(
    data.hourly[9].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime11 = document.querySelector(
    "#hourly-time-11 .forecast-hourly-time"
  );
  hourlyTime11.textContent = formatTime(
    data.hourly[10].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime12 = document.querySelector(
    "#hourly-time-12 .forecast-hourly-time"
  );
  hourlyTime12.textContent = formatTime(
    data.hourly[11].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime13 = document.querySelector(
    "#hourly-time-13 .forecast-hourly-time"
  );
  hourlyTime13.textContent = formatTime(
    data.hourly[12].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime14 = document.querySelector(
    "#hourly-time-14 .forecast-hourly-time"
  );
  hourlyTime14.textContent = formatTime(
    data.hourly[13].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime15 = document.querySelector(
    "#hourly-time-15 .forecast-hourly-time"
  );
  hourlyTime15.textContent = formatTime(
    data.hourly[14].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime16 = document.querySelector(
    "#hourly-time-16 .forecast-hourly-time"
  );
  hourlyTime16.textContent = formatTime(
    data.hourly[15].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime17 = document.querySelector(
    "#hourly-time-17 .forecast-hourly-time"
  );
  hourlyTime17.textContent = formatTime(
    data.hourly[16].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime18 = document.querySelector(
    "#hourly-time-18 .forecast-hourly-time"
  );
  hourlyTime18.textContent = formatTime(
    data.hourly[17].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime19 = document.querySelector(
    "#hourly-time-19 .forecast-hourly-time"
  );
  hourlyTime19.textContent = formatTime(
    data.hourly[18].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime20 = document.querySelector(
    "#hourly-time-20 .forecast-hourly-time"
  );
  hourlyTime20.textContent = formatTime(
    data.hourly[19].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime21 = document.querySelector(
    "#hourly-time-21 .forecast-hourly-time"
  );
  hourlyTime21.textContent = formatTime(
    data.hourly[20].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime22 = document.querySelector(
    "#hourly-time-22 .forecast-hourly-time"
  );
  hourlyTime22.textContent = formatTime(
    data.hourly[21].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime23 = document.querySelector(
    "#hourly-time-23 .forecast-hourly-time"
  );
  hourlyTime23.textContent = formatTime(
    data.hourly[22].dt,
    data.timezone_offset,
    "hour"
  );

  const hourlyTime24 = document.querySelector(
    "#hourly-time-24 .forecast-hourly-time"
  );
  hourlyTime24.textContent = formatTime(
    data.hourly[23].dt,
    data.timezone_offset,
    "hour"
  );

  // RENDER HOURLY TEMP
  const hourlyTemp1 = document.querySelector(
    "#hourly-time-1 .forecast-hourly-temp"
  );
  hourlyTemp1.textContent = `${Math.round(data.hourly[0].temp)} °C`;

  const hourlyTemp2 = document.querySelector(
    "#hourly-time-2 .forecast-hourly-temp"
  );
  hourlyTemp2.textContent = `${Math.round(data.hourly[1].temp)} °C`;

  const hourlyTemp3 = document.querySelector(
    "#hourly-time-3 .forecast-hourly-temp"
  );
  hourlyTemp3.textContent = `${Math.round(data.hourly[2].temp)} °C`;

  const hourlyTemp4 = document.querySelector(
    "#hourly-time-4 .forecast-hourly-temp"
  );
  hourlyTemp4.textContent = `${Math.round(data.hourly[3].temp)} °C`;

  const hourlyTemp5 = document.querySelector(
    "#hourly-time-5 .forecast-hourly-temp"
  );
  hourlyTemp5.textContent = `${Math.round(data.hourly[4].temp)} °C`;

  const hourlyTemp6 = document.querySelector(
    "#hourly-time-6 .forecast-hourly-temp"
  );
  hourlyTemp6.textContent = `${Math.round(data.hourly[5].temp)} °C`;

  const hourlyTemp7 = document.querySelector(
    "#hourly-time-7 .forecast-hourly-temp"
  );
  hourlyTemp7.textContent = `${Math.round(data.hourly[6].temp)} °C`;

  const hourlyTemp8 = document.querySelector(
    "#hourly-time-8 .forecast-hourly-temp"
  );
  hourlyTemp8.textContent = `${Math.round(data.hourly[7].temp)} °C`;

  const hourlyTemp9 = document.querySelector(
    "#hourly-time-9 .forecast-hourly-temp"
  );
  hourlyTemp9.textContent = `${Math.round(data.hourly[8].temp)} °C`;

  const hourlyTemp10 = document.querySelector(
    "#hourly-time-10 .forecast-hourly-temp"
  );
  hourlyTemp10.textContent = `${Math.round(data.hourly[9].temp)} °C`;

  const hourlyTemp11 = document.querySelector(
    "#hourly-time-11 .forecast-hourly-temp"
  );
  hourlyTemp11.textContent = `${Math.round(data.hourly[10].temp)} °C`;

  const hourlyTemp12 = document.querySelector(
    "#hourly-time-12 .forecast-hourly-temp"
  );
  hourlyTemp12.textContent = `${Math.round(data.hourly[11].temp)} °C`;

  const hourlyTemp13 = document.querySelector(
    "#hourly-time-13 .forecast-hourly-temp"
  );
  hourlyTemp13.textContent = `${Math.round(data.hourly[12].temp)} °C`;

  const hourlyTemp14 = document.querySelector(
    "#hourly-time-14 .forecast-hourly-temp"
  );
  hourlyTemp14.textContent = `${Math.round(data.hourly[13].temp)} °C`;

  const hourlyTemp15 = document.querySelector(
    "#hourly-time-15 .forecast-hourly-temp"
  );
  hourlyTemp15.textContent = `${Math.round(data.hourly[14].temp)} °C`;

  const hourlyTemp16 = document.querySelector(
    "#hourly-time-16 .forecast-hourly-temp"
  );
  hourlyTemp16.textContent = `${Math.round(data.hourly[15].temp)} °C`;

  const hourlyTemp17 = document.querySelector(
    "#hourly-time-17 .forecast-hourly-temp"
  );
  hourlyTemp17.textContent = `${Math.round(data.hourly[16].temp)} °C`;

  const hourlyTemp18 = document.querySelector(
    "#hourly-time-18 .forecast-hourly-temp"
  );
  hourlyTemp18.textContent = `${Math.round(data.hourly[17].temp)} °C`;

  const hourlyTemp19 = document.querySelector(
    "#hourly-time-19 .forecast-hourly-temp"
  );
  hourlyTemp19.textContent = `${Math.round(data.hourly[18].temp)} °C`;

  const hourlyTemp20 = document.querySelector(
    "#hourly-time-20 .forecast-hourly-temp"
  );
  hourlyTemp20.textContent = `${Math.round(data.hourly[19].temp)} °C`;

  const hourlyTemp21 = document.querySelector(
    "#hourly-time-21 .forecast-hourly-temp"
  );
  hourlyTemp21.textContent = `${Math.round(data.hourly[20].temp)} °C`;

  const hourlyTemp22 = document.querySelector(
    "#hourly-time-22 .forecast-hourly-temp"
  );
  hourlyTemp22.textContent = `${Math.round(data.hourly[21].temp)} °C`;

  const hourlyTemp23 = document.querySelector(
    "#hourly-time-23 .forecast-hourly-temp"
  );
  hourlyTemp23.textContent = `${Math.round(data.hourly[22].temp)} °C`;

  const hourlyTemp24 = document.querySelector(
    "#hourly-time-24 .forecast-hourly-temp"
  );
  hourlyTemp24.textContent = `${Math.round(data.hourly[23].temp)} °C`;

  // RENDER HOURLY ICON
  const hourlyIcon1 = document.querySelector(
    "#hourly-time-1 .forecast-hourly-icon"
  );
  hourlyIcon1.src = renderWeatherIcon(data.hourly[0].weather[0].icon);

  const hourlyIcon2 = document.querySelector(
    "#hourly-time-2 .forecast-hourly-icon"
  );
  hourlyIcon2.src = renderWeatherIcon(data.hourly[1].weather[0].icon);

  const hourlyIcon3 = document.querySelector(
    "#hourly-time-3 .forecast-hourly-icon"
  );
  hourlyIcon3.src = renderWeatherIcon(data.hourly[2].weather[0].icon);

  const hourlyIcon4 = document.querySelector(
    "#hourly-time-4 .forecast-hourly-icon"
  );
  hourlyIcon4.src = renderWeatherIcon(data.hourly[3].weather[0].icon);

  const hourlyIcon5 = document.querySelector(
    "#hourly-time-5 .forecast-hourly-icon"
  );
  hourlyIcon5.src = renderWeatherIcon(data.hourly[4].weather[0].icon);

  const hourlyIcon6 = document.querySelector(
    "#hourly-time-6 .forecast-hourly-icon"
  );
  hourlyIcon6.src = renderWeatherIcon(data.hourly[5].weather[0].icon);

  const hourlyIcon7 = document.querySelector(
    "#hourly-time-7 .forecast-hourly-icon"
  );
  hourlyIcon7.src = renderWeatherIcon(data.hourly[6].weather[0].icon);

  const hourlyIcon8 = document.querySelector(
    "#hourly-time-8 .forecast-hourly-icon"
  );
  hourlyIcon8.src = renderWeatherIcon(data.hourly[7].weather[0].icon);

  const hourlyIcon9 = document.querySelector(
    "#hourly-time-9 .forecast-hourly-icon"
  );
  hourlyIcon9.src = renderWeatherIcon(data.hourly[8].weather[0].icon);

  const hourlyIcon10 = document.querySelector(
    "#hourly-time-10 .forecast-hourly-icon"
  );
  hourlyIcon10.src = renderWeatherIcon(data.hourly[9].weather[0].icon);

  const hourlyIcon11 = document.querySelector(
    "#hourly-time-11 .forecast-hourly-icon"
  );
  hourlyIcon11.src = renderWeatherIcon(data.hourly[10].weather[0].icon);

  const hourlyIcon12 = document.querySelector(
    "#hourly-time-12 .forecast-hourly-icon"
  );
  hourlyIcon12.src = renderWeatherIcon(data.hourly[11].weather[0].icon);

  const hourlyIcon13 = document.querySelector(
    "#hourly-time-13 .forecast-hourly-icon"
  );
  hourlyIcon13.src = renderWeatherIcon(data.hourly[12].weather[0].icon);

  const hourlyIcon14 = document.querySelector(
    "#hourly-time-14 .forecast-hourly-icon"
  );
  hourlyIcon14.src = renderWeatherIcon(data.hourly[13].weather[0].icon);

  const hourlyIcon15 = document.querySelector(
    "#hourly-time-15 .forecast-hourly-icon"
  );
  hourlyIcon15.src = renderWeatherIcon(data.hourly[14].weather[0].icon);

  const hourlyIcon16 = document.querySelector(
    "#hourly-time-16 .forecast-hourly-icon"
  );
  hourlyIcon16.src = renderWeatherIcon(data.hourly[15].weather[0].icon);

  const hourlyIcon17 = document.querySelector(
    "#hourly-time-17 .forecast-hourly-icon"
  );
  hourlyIcon17.src = renderWeatherIcon(data.hourly[16].weather[0].icon);

  const hourlyIcon18 = document.querySelector(
    "#hourly-time-18 .forecast-hourly-icon"
  );
  hourlyIcon18.src = renderWeatherIcon(data.hourly[17].weather[0].icon);

  const hourlyIcon19 = document.querySelector(
    "#hourly-time-19 .forecast-hourly-icon"
  );
  hourlyIcon19.src = renderWeatherIcon(data.hourly[18].weather[0].icon);

  const hourlyIcon20 = document.querySelector(
    "#hourly-time-20 .forecast-hourly-icon"
  );
  hourlyIcon20.src = renderWeatherIcon(data.hourly[19].weather[0].icon);

  const hourlyIcon21 = document.querySelector(
    "#hourly-time-21 .forecast-hourly-icon"
  );
  hourlyIcon21.src = renderWeatherIcon(data.hourly[20].weather[0].icon);

  const hourlyIcon22 = document.querySelector(
    "#hourly-time-22 .forecast-hourly-icon"
  );
  hourlyIcon22.src = renderWeatherIcon(data.hourly[21].weather[0].icon);

  const hourlyIcon23 = document.querySelector(
    "#hourly-time-23 .forecast-hourly-icon"
  );
  hourlyIcon23.src = renderWeatherIcon(data.hourly[22].weather[0].icon);

  const hourlyIcon24 = document.querySelector(
    "#hourly-time-24 .forecast-hourly-icon"
  );
  hourlyIcon24.src = renderWeatherIcon(data.hourly[23].weather[0].icon);
}

function renderWeatherInfo(data, CityName) {
  renderWeatherData(data, CityName);
  renderDailyForecast(data);
  renderHourlyForecast(data);
}

export {
  renderWeatherInfo,
  displayDailyForecast,
  displayHourlyForecast,
  changeHoursPage,
};
