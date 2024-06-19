import {
  capitalize,
  formatDate,
  formatTime,
  renderWeatherIcon,
} from "./utils.js";

function renderWeatherData(data, CityName) {
  // update the weather description
  const currentDescription = document.querySelector(".description");
  currentDescription.textContent = capitalize(
    data.current.weather[0].description
  );

  // update the city name based on search input
  const currentCity = document.querySelector(".city");
  currentCity.textContent = CityName;

  // show the current temperature
  const currentTemperature = document.querySelector(".temperature");
  currentTemperature.textContent = `${Math.round(data.current.temp)}`;

  const currentDate = document.querySelector(".date");
  currentDate.textContent = formatDate(
    data.current.dt,
    data.timezone_offset,
    "full"
  );

  const currentTime = document.querySelector(".time");
  currentTime.textContent = formatTime(data.current.dt, data.timezone_offset);

  const currentIcon = document.querySelector(".icon");
  currentIcon.src = renderWeatherIcon(data.current.weather[0].icon);

  // WEATHER DETAILS
  const feelsLike = document.querySelector(".feels-like-data");
  feelsLike.textContent = `${Math.round(data.current.feels_like)}°`;

  const windSpeed = document.querySelector(".wind-speed-data");
  windSpeed.textContent = `${Math.round(data.current.wind_speed)}km/h`;

  const humidity = document.querySelector(".humidity-data");
  humidity.textContent = `${Math.round(data.current.humidity)}%`;

  const precipitation = document.querySelector(".precipitation-data");
  precipitation.textContent = `${Math.round(data.daily[0].pop * 100)}%`;

  const uv = document.querySelector(".uv-data");
  uv.textContent = data.current.uvi;
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
  console.log(data);

  // RENDER DAILY DATE
  const secondDate = document.querySelector(
    "#second-container .forecast-daily-date"
  );
  const thirdDate = document.querySelector(
    "#third-container .forecast-daily-date"
  );
  const fourthDate = document.querySelector(
    "#fourth-container .forecast-daily-date"
  );
  const fifthDate = document.querySelector(
    "#fifth-container .forecast-daily-date"
  );
  const sixthDate = document.querySelector(
    "#sixth-container .forecast-daily-date"
  );
  const seventhDate = document.querySelector(
    "#seventh-container .forecast-daily-date"
  );
  secondDate.textContent = `${formatDate(
    data.daily[1].dt,
    data.timezone_offset,
    "date"
  )}`;
  thirdDate.textContent = `${formatDate(
    data.daily[2].dt,
    data.timezone_offset,
    "date"
  )}`;
  fourthDate.textContent = `${formatDate(
    data.daily[3].dt,
    data.timezone_offset,
    "date"
  )}`;
  fifthDate.textContent = `${formatDate(
    data.daily[4].dt,
    data.timezone_offset,
    "date"
  )}`;
  sixthDate.textContent = `${formatDate(
    data.daily[5].dt,
    data.timezone_offset,
    "date"
  )}`;
  seventhDate.textContent = `${formatDate(
    data.daily[6].dt,
    data.timezone_offset,
    "date"
  )}`;

  /*  RENDER DAILY DAYS  */
  const firstDay = document.querySelector(
    "#first-container .forecast-daily-day"
  );
  firstDay.textContent = `Today`;

  const secondDay = document.querySelector(
    "#second-container .forecast-daily-day"
  );
  secondDay.textContent = formatDate(data.daily[1].dt, data.timezone_offset);

  const thirdDay = document.querySelector(
    "#third-container .forecast-daily-day"
  );
  thirdDay.textContent = formatDate(data.daily[2].dt, data.timezone_offset);

  const fourthDay = document.querySelector(
    "#fourth-container .forecast-daily-day"
  );
  fourthDay.textContent = formatDate(data.daily[3].dt, data.timezone_offset);

  const fifthDay = document.querySelector(
    "#fifth-container .forecast-daily-day"
  );
  fifthDay.textContent = formatDate(data.daily[4].dt, data.timezone_offset);

  const sixthDay = document.querySelector(
    "#sixth-container .forecast-daily-day"
  );
  sixthDay.textContent = formatDate(data.daily[5].dt, data.timezone_offset);

  const seventhDay = document.querySelector(
    "#seventh-container .forecast-daily-day"
  );
  seventhDay.textContent = formatDate(data.daily[6].dt, data.timezone_offset);

  /*  RENDER DAILY MAX TEMP  */

  const firstMaxTemp = document.querySelector(
    "#first-container .forecast-daily-temp-max"
  );
  firstMaxTemp.textContent = `${Math.round(data.daily[0].temp.max)}°`;

  const secondMaxTemp = document.querySelector(
    "#second-container .forecast-daily-temp-max"
  );
  secondMaxTemp.textContent = `${Math.round(data.daily[1].temp.max)}°`;

  const thirdMaxTemp = document.querySelector(
    "#third-container .forecast-daily-temp-max"
  );
  thirdMaxTemp.textContent = `${Math.round(data.daily[2].temp.max)}°`;

  const fourthMaxTemp = document.querySelector(
    "#fourth-container .forecast-daily-temp-max"
  );
  fourthMaxTemp.textContent = `${Math.round(data.daily[3].temp.max)}°`;

  const fifthMaxTemp = document.querySelector(
    "#fifth-container .forecast-daily-temp-max"
  );
  fifthMaxTemp.textContent = `${Math.round(data.daily[4].temp.max)}°`;

  const sixthMaxTemp = document.querySelector(
    "#sixth-container .forecast-daily-temp-max"
  );
  sixthMaxTemp.textContent = `${Math.round(data.daily[5].temp.max)}°`;

  const seventhMaxTemp = document.querySelector(
    "#seventh-container .forecast-daily-temp-max"
  );
  seventhMaxTemp.textContent = `${Math.round(data.daily[6].temp.max)}°`;

  /*  RENDER DAILY MIN TEMP  */

  const firstMinTemp = document.querySelector(
    "#first-container .forecast-daily-temp-min"
  );
  firstMinTemp.textContent = `${Math.round(data.daily[0].temp.min)}°`;

  const secondMinTemp = document.querySelector(
    "#second-container .forecast-daily-temp-min"
  );
  secondMinTemp.textContent = `${Math.round(data.daily[1].temp.min)}°`;

  const thirdMinTemp = document.querySelector(
    "#third-container .forecast-daily-temp-min"
  );
  thirdMinTemp.textContent = `${Math.round(data.daily[2].temp.min)}°`;

  const fourthMinTemp = document.querySelector(
    "#fourth-container .forecast-daily-temp-min"
  );
  fourthMinTemp.textContent = `${Math.round(data.daily[3].temp.min)}°`;

  const fifthMinTemp = document.querySelector(
    "#fifth-container .forecast-daily-temp-min"
  );
  fifthMinTemp.textContent = `${Math.round(data.daily[4].temp.min)}°`;

  const sixthMinTemp = document.querySelector(
    "#sixth-container .forecast-daily-temp-min"
  );
  sixthMinTemp.textContent = `${Math.round(data.daily[5].temp.min)}°`;

  const seventhMinTemp = document.querySelector(
    "#seventh-container .forecast-daily-temp-min"
  );
  seventhMinTemp.textContent = `${Math.round(data.daily[6].temp.min)}°`;

  /*  RENDER DAILY WEATHER ICON  */

  const firstDayWeatherIcon = document.querySelector("#first-container img");
  firstDayWeatherIcon.src = renderWeatherIcon(data.daily[0].weather[0].icon);

  const secondDayWeatherIcon = document.querySelector("#second-container img");
  secondDayWeatherIcon.src = renderWeatherIcon(data.daily[1].weather[0].icon);

  const thirdDayWeatherIcon = document.querySelector("#third-container img");
  thirdDayWeatherIcon.src = renderWeatherIcon(data.daily[2].weather[0].icon);

  const fourthDayWeatherIcon = document.querySelector("#fourth-container img");
  fourthDayWeatherIcon.src = renderWeatherIcon(data.daily[3].weather[0].icon);

  const fifthDayWeatherIcon = document.querySelector("#fifth-container img");
  fifthDayWeatherIcon.src = renderWeatherIcon(data.daily[4].weather[0].icon);

  const sixthDayWeatherIcon = document.querySelector("#sixth-container img");
  sixthDayWeatherIcon.src = renderWeatherIcon(data.daily[5].weather[0].icon);

  const seventhDayWeatherIcon = document.querySelector(
    "#seventh-container img"
  );
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
  hourlyTemp1.textContent = `${Math.round(data.hourly[0].temp)}°`;

  const hourlyTemp2 = document.querySelector(
    "#hourly-time-2 .forecast-hourly-temp"
  );
  hourlyTemp2.textContent = `${Math.round(data.hourly[1].temp)}°`;

  const hourlyTemp3 = document.querySelector(
    "#hourly-time-3 .forecast-hourly-temp"
  );
  hourlyTemp3.textContent = `${Math.round(data.hourly[2].temp)}°`;

  const hourlyTemp4 = document.querySelector(
    "#hourly-time-4 .forecast-hourly-temp"
  );
  hourlyTemp4.textContent = `${Math.round(data.hourly[3].temp)}°`;

  const hourlyTemp5 = document.querySelector(
    "#hourly-time-5 .forecast-hourly-temp"
  );
  hourlyTemp5.textContent = `${Math.round(data.hourly[4].temp)}°`;

  const hourlyTemp6 = document.querySelector(
    "#hourly-time-6 .forecast-hourly-temp"
  );
  hourlyTemp6.textContent = `${Math.round(data.hourly[5].temp)}°`;

  const hourlyTemp7 = document.querySelector(
    "#hourly-time-7 .forecast-hourly-temp"
  );
  hourlyTemp7.textContent = `${Math.round(data.hourly[6].temp)}°`;

  const hourlyTemp8 = document.querySelector(
    "#hourly-time-8 .forecast-hourly-temp"
  );
  hourlyTemp8.textContent = `${Math.round(data.hourly[7].temp)}°`;

  const hourlyTemp9 = document.querySelector(
    "#hourly-time-9 .forecast-hourly-temp"
  );
  hourlyTemp9.textContent = `${Math.round(data.hourly[8].temp)}°`;

  const hourlyTemp10 = document.querySelector(
    "#hourly-time-10 .forecast-hourly-temp"
  );
  hourlyTemp10.textContent = `${Math.round(data.hourly[9].temp)}°`;

  const hourlyTemp11 = document.querySelector(
    "#hourly-time-11 .forecast-hourly-temp"
  );
  hourlyTemp11.textContent = `${Math.round(data.hourly[10].temp)}°`;

  const hourlyTemp12 = document.querySelector(
    "#hourly-time-12 .forecast-hourly-temp"
  );
  hourlyTemp12.textContent = `${Math.round(data.hourly[11].temp)}°`;

  const hourlyTemp13 = document.querySelector(
    "#hourly-time-13 .forecast-hourly-temp"
  );
  hourlyTemp13.textContent = `${Math.round(data.hourly[12].temp)}°`;

  const hourlyTemp14 = document.querySelector(
    "#hourly-time-14 .forecast-hourly-temp"
  );
  hourlyTemp14.textContent = `${Math.round(data.hourly[13].temp)}°`;

  const hourlyTemp15 = document.querySelector(
    "#hourly-time-15 .forecast-hourly-temp"
  );
  hourlyTemp15.textContent = `${Math.round(data.hourly[14].temp)}°`;

  const hourlyTemp16 = document.querySelector(
    "#hourly-time-16 .forecast-hourly-temp"
  );
  hourlyTemp16.textContent = `${Math.round(data.hourly[15].temp)}°`;

  const hourlyTemp17 = document.querySelector(
    "#hourly-time-17 .forecast-hourly-temp"
  );
  hourlyTemp17.textContent = `${Math.round(data.hourly[16].temp)}°`;

  const hourlyTemp18 = document.querySelector(
    "#hourly-time-18 .forecast-hourly-temp"
  );
  hourlyTemp18.textContent = `${Math.round(data.hourly[17].temp)}°`;

  const hourlyTemp19 = document.querySelector(
    "#hourly-time-19 .forecast-hourly-temp"
  );
  hourlyTemp19.textContent = `${Math.round(data.hourly[18].temp)}°`;

  const hourlyTemp20 = document.querySelector(
    "#hourly-time-20 .forecast-hourly-temp"
  );
  hourlyTemp20.textContent = `${Math.round(data.hourly[19].temp)}°`;

  const hourlyTemp21 = document.querySelector(
    "#hourly-time-21 .forecast-hourly-temp"
  );
  hourlyTemp21.textContent = `${Math.round(data.hourly[20].temp)}°`;

  const hourlyTemp22 = document.querySelector(
    "#hourly-time-22 .forecast-hourly-temp"
  );
  hourlyTemp22.textContent = `${Math.round(data.hourly[21].temp)}°`;

  const hourlyTemp23 = document.querySelector(
    "#hourly-time-23 .forecast-hourly-temp"
  );
  hourlyTemp23.textContent = `${Math.round(data.hourly[22].temp)}°`;

  const hourlyTemp24 = document.querySelector(
    "#hourly-time-24 .forecast-hourly-temp"
  );
  hourlyTemp24.textContent = `${Math.round(data.hourly[23].temp)}°`;

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

  // RENDER HOURLY DESCRIPTION
  const hourlyDesc1 = document.querySelector(
    "#hourly-time-1 .forecast-hourly-desc"
  );
  hourlyDesc1.textContent = data.hourly[0].weather[0].main;

  const hourlyDesc2 = document.querySelector(
    "#hourly-time-2 .forecast-hourly-desc"
  );
  hourlyDesc2.textContent = data.hourly[1].weather[0].main;

  const hourlyDesc3 = document.querySelector(
    "#hourly-time-3 .forecast-hourly-desc"
  );
  hourlyDesc3.textContent = data.hourly[2].weather[0].main;

  const hourlyDesc4 = document.querySelector(
    "#hourly-time-4 .forecast-hourly-desc"
  );
  hourlyDesc4.textContent = data.hourly[3].weather[0].main;

  const hourlyDesc5 = document.querySelector(
    "#hourly-time-5 .forecast-hourly-desc"
  );
  hourlyDesc5.textContent = data.hourly[4].weather[0].main;

  const hourlyDesc6 = document.querySelector(
    "#hourly-time-6 .forecast-hourly-desc"
  );
  hourlyDesc6.textContent = data.hourly[5].weather[0].main;

  const hourlyDesc7 = document.querySelector(
    "#hourly-time-7 .forecast-hourly-desc"
  );
  hourlyDesc7.textContent = data.hourly[6].weather[0].main;

  const hourlyDesc8 = document.querySelector(
    "#hourly-time-8 .forecast-hourly-desc"
  );
  hourlyDesc8.textContent = data.hourly[7].weather[0].main;

  const hourlyDesc9 = document.querySelector(
    "#hourly-time-9 .forecast-hourly-desc"
  );
  hourlyDesc9.textContent = data.hourly[8].weather[0].main;

  const hourlyDesc10 = document.querySelector(
    "#hourly-time-10 .forecast-hourly-desc"
  );
  hourlyDesc10.textContent = data.hourly[9].weather[0].main;

  const hourlyDesc11 = document.querySelector(
    "#hourly-time-11 .forecast-hourly-desc"
  );
  hourlyDesc11.textContent = data.hourly[10].weather[0].main;

  const hourlyDesc12 = document.querySelector(
    "#hourly-time-12 .forecast-hourly-desc"
  );
  hourlyDesc12.textContent = data.hourly[11].weather[0].main;

  const hourlyDesc13 = document.querySelector(
    "#hourly-time-13 .forecast-hourly-desc"
  );
  hourlyDesc13.textContent = data.hourly[12].weather[0].main;

  const hourlyDesc14 = document.querySelector(
    "#hourly-time-14 .forecast-hourly-desc"
  );
  hourlyDesc14.textContent = data.hourly[13].weather[0].main;

  const hourlyDesc15 = document.querySelector(
    "#hourly-time-15 .forecast-hourly-desc"
  );
  hourlyDesc15.textContent = data.hourly[14].weather[0].main;

  const hourlyDesc16 = document.querySelector(
    "#hourly-time-16 .forecast-hourly-desc"
  );
  hourlyDesc16.textContent = data.hourly[15].weather[0].main;

  const hourlyDesc17 = document.querySelector(
    "#hourly-time-17 .forecast-hourly-desc"
  );
  hourlyDesc17.textContent = data.hourly[16].weather[0].main;

  const hourlyDesc18 = document.querySelector(
    "#hourly-time-18 .forecast-hourly-desc"
  );
  hourlyDesc18.textContent = data.hourly[17].weather[0].main;

  const hourlyDesc19 = document.querySelector(
    "#hourly-time-19 .forecast-hourly-desc"
  );
  hourlyDesc19.textContent = data.hourly[18].weather[0].main;

  const hourlyDesc20 = document.querySelector(
    "#hourly-time-20 .forecast-hourly-desc"
  );
  hourlyDesc20.textContent = data.hourly[19].weather[0].main;

  const hourlyDesc21 = document.querySelector(
    "#hourly-time-21 .forecast-hourly-desc"
  );
  hourlyDesc21.textContent = data.hourly[20].weather[0].main;

  const hourlyDesc22 = document.querySelector(
    "#hourly-time-22 .forecast-hourly-desc"
  );
  hourlyDesc22.textContent = data.hourly[21].weather[0].main;

  const hourlyDesc23 = document.querySelector(
    "#hourly-time-23 .forecast-hourly-desc"
  );
  hourlyDesc23.textContent = data.hourly[22].weather[0].main;

  const hourlyDesc24 = document.querySelector(
    "#hourly-time-24 .forecast-hourly-desc"
  );
  hourlyDesc24.textContent = data.hourly[23].weather[0].main;
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
  // changeHoursPage,
};
