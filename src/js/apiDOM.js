import {
  capitalize,
  formatDate,
  formatTime,
  renderWeatherIcon,
} from "./utils.js";

function renderWeatherData(data, cityLocation) {
  const { cityName, cityState } = cityLocation;

  // render city name
  const currentCity = document.querySelector(".city");
  currentCity.textContent = cityName;

  // render state name
  const currentState = document.querySelector(".state");
  currentState.textContent = cityState;

  const currentDate = document.querySelector(".date");
  currentDate.textContent = formatDate(
    data.current.dt,
    data.timezone_offset,
    "full"
  );

  const currentTime = document.querySelector(".time");
  currentTime.textContent = formatTime(data.current.dt, data.timezone_offset);

  const tempContainer = document.querySelector(".day-temp");
  tempContainer.innerHTML = `<div>High: <span class="high">${Math.round(
    data.daily[0].temp.max
  )}°</span></div>
              <div>Low: <span class="low">${Math.round(
                data.daily[0].temp.min
              )}°</span></div>`;

  const sunrise = document.querySelector(".sunrise");
  sunrise.innerHTML = `<img src="assets/sunrise.svg" alt="sunrise" />
                <div>
                  <h4>Sunrise</h4>
                  <div class="sunrise-time">${formatTime(
                    data.current.sunrise,
                    data.timezone_offset
                  )}</div>
                </div>`;

  const sunset = document.querySelector(".sunset");
  sunset.innerHTML = `<img src="assets/sunset.svg" alt="sunset" />
                <div>
                  <h4>Sunset</h4>
                  <div class="sunset-time">${formatTime(
                    data.current.sunset,
                    data.timezone_offset
                  )}</div>
                </div>`;

  const currentTemperature = document.querySelector(".temperature");
  currentTemperature.textContent = `${Math.round(data.current.temp)}`;

  const degree = document.querySelector(".degree");
  degree.textContent = "°";

  const currentIcon = document.querySelector(".icon");
  currentIcon.src = renderWeatherIcon(data.current.weather[0].icon);

  // render weather description
  const currentDescription = document.querySelector(".description");
  currentDescription.textContent = capitalize(
    data.current.weather[0].description
  );

  // WEATHER DETAILS
  const feelsLike = document.querySelector(".feels-like .weather-detail");
  feelsLike.innerHTML = `<img
            src="assets/temperature.svg"
            alt="feels like"
            class="img2Svg"
            id="tempSvg"
          />
          <h4 class="feels-like-data h4">${Math.round(
            data.current.feels_like
          )}°</h4>`;

  const windSpeed = document.querySelector(".wind-speed .weather-detail");
  windSpeed.innerHTML = `<img
            src="assets/wind.svg"
            alt="feels like"
            class="img2Svg"
            id="windSvg"
          />
          <h4 class="feels-like-data h4">${Math.round(
            data.current.wind_speed
          )}km/h</h4>`;

  const humidity = document.querySelector(".humidity .weather-detail");
  humidity.innerHTML = `<img
            src="assets/humidity.svg"
            id="humiSvg"
            alt="humidity"
            class="img2Svg"
          />
          <h4 class="humidity-data h4">${Math.round(
            data.current.humidity
          )}%</h4>`;

  const precipitation = document.querySelector(
    ".precipitation .weather-detail"
  );
  precipitation.innerHTML = `<img
            src="assets/rainChance.svg"
            alt="rain chance"
            id="rainSvg"
            class="img2Svg"
          />
          <h4 class="precipitation-data h4">${Math.round(
            data.daily[0].pop * 100
          )}%</h4>`;

  const uv = document.querySelector(".uv .weather-detail");
  uv.innerHTML = `<img src="assets/uv.svg" alt="uv index" id="uvSvg" class="img2Svg" />
          <h4 class="uv-data h4">${data.current.uvi}</h4>`;
}

/**************************************************************** */

function renderDailyForecast(data) {
  // RENDER DAILY DATE AND DAYS
  const firstDay = document.querySelector(
    "#first-container .forecast-daily-day-container"
  );
  firstDay.innerHTML = `<div class="forecast-daily-day">Today</div>`;

  const secondDate = document.querySelector(
    "#second-container .forecast-daily-day-container"
  );
  secondDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[1].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[1].dt,
              data.timezone_offset
            )}</div>`;

  const thirdDate = document.querySelector(
    "#third-container .forecast-daily-day-container"
  );
  thirdDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[2].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[2].dt,
              data.timezone_offset
            )}</div>`;

  const fourthDate = document.querySelector(
    "#fourth-container .forecast-daily-day-container"
  );
  fourthDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[3].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[3].dt,
              data.timezone_offset
            )}</div>`;

  const fifthDate = document.querySelector(
    "#fifth-container .forecast-daily-day-container"
  );
  fifthDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[4].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[4].dt,
              data.timezone_offset
            )}</div>`;

  const sixthDate = document.querySelector(
    "#sixth-container .forecast-daily-day-container"
  );
  sixthDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[5].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[5].dt,
              data.timezone_offset
            )}</div>`;

  const seventhDate = document.querySelector(
    "#seventh-container .forecast-daily-day-container"
  );
  seventhDate.innerHTML = `<div class="forecast-daily-date">${formatDate(
    data.daily[6].dt,
    data.timezone_offset,
    "date"
  )}</div>
            <div class="forecast-daily-day">${formatDate(
              data.daily[6].dt,
              data.timezone_offset
            )}</div>`;

  /*  RENDER DAILY MAX TEMP AND MIN TEMP  */

  const firstMaxTemp = document.querySelector(
    "#first-container .temp-max-container"
  );
  const firstMinTemp = document.querySelector(
    "#first-container .temp-min-container"
  );
  firstMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[0].temp.max
              )}°</div>`;
  firstMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[0].temp.min
              )}°</div>`;

  const secondMaxTemp = document.querySelector(
    "#second-container .temp-max-container"
  );
  const secondMinTemp = document.querySelector(
    "#second-container .temp-min-container"
  );
  secondMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[1].temp.max
              )}°</div>`;
  secondMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[1].temp.min
              )}°</div>`;

  const thirdMaxTemp = document.querySelector(
    "#third-container .temp-max-container"
  );
  const thirdMinTemp = document.querySelector(
    "#third-container .temp-min-container"
  );
  thirdMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[2].temp.max
              )}°</div>`;
  thirdMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[2].temp.min
              )}°</div>`;

  const fourthMaxTemp = document.querySelector(
    "#fourth-container .temp-max-container"
  );
  const fourthMinTemp = document.querySelector(
    "#fourth-container .temp-min-container"
  );
  fourthMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[3].temp.max
              )}°</div>`;
  fourthMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[3].temp.min
              )}°</div>`;

  const fifthMaxTemp = document.querySelector(
    "#fifth-container .temp-max-container"
  );
  const fifthMinTemp = document.querySelector(
    "#fifth-container .temp-min-container"
  );
  fifthMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[4].temp.max
              )}°</div>`;
  fifthMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[4].temp.min
              )}°</div>`;

  const sixthMaxTemp = document.querySelector(
    "#sixth-container .temp-max-container"
  );
  const sixthMinTemp = document.querySelector(
    "#sixth-container .temp-min-container"
  );
  sixthMaxTemp.innerHTML = `<span>max</span>
              <div class="forecast-daily-temp-max">${Math.round(
                data.daily[5].temp.max
              )}°</div>`;
  sixthMinTemp.innerHTML = `<span>min</span>
              <div class="forecast-daily-temp-min">${Math.round(
                data.daily[5].temp.min
              )}°</div>`;

  const seventhMaxTemp = document.querySelector(
    "#seventh-container .temp-max-container"
  );
  const seventhMinTemp = document.querySelector(
    "#seventh-container .temp-min-container"
  );
  seventhMaxTemp.innerHTML = `<span>max</span>
                <div class="forecast-daily-temp-max">${Math.round(
                  data.daily[6].temp.max
                )}°</div>`;
  seventhMinTemp.innerHTML = `<span>min</span>
                <div class="forecast-daily-temp-min">${Math.round(
                  data.daily[6].temp.min
                )}°</div>`;

  /*  RENDER DAILY WEATHER ICON  */
  const firstDayWeatherIcon = document.querySelector(
    "#first-container .forecast-daily-img-container"
  );
  firstDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[0].weather[0].icon
  )} class="weather-daily-icon" />`;

  const secondDayWeatherIcon = document.querySelector(
    "#second-container .forecast-daily-img-container"
  );
  secondDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[1].weather[0].icon
  )} class="weather-daily-icon" />`;

  const thirdDayWeatherIcon = document.querySelector(
    "#third-container .forecast-daily-img-container"
  );
  thirdDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[2].weather[0].icon
  )} class="weather-daily-icon" />`;

  const fourthDayWeatherIcon = document.querySelector(
    "#fourth-container .forecast-daily-img-container"
  );
  fourthDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[3].weather[0].icon
  )} class="weather-daily-icon" />`;

  const fifthDayWeatherIcon = document.querySelector(
    "#fifth-container .forecast-daily-img-container"
  );
  fifthDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[4].weather[0].icon
  )} class="weather-daily-icon" />`;
  const sixthDayWeatherIcon = document.querySelector(
    "#sixth-container .forecast-daily-img-container"
  );
  sixthDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[5].weather[0].icon
  )} class="weather-daily-icon" />`;

  const seventhDayWeatherIcon = document.querySelector(
    "#seventh-container .forecast-daily-img-container"
  );
  seventhDayWeatherIcon.innerHTML = `<img src=${renderWeatherIcon(
    data.daily[6].weather[0].icon
  )} class="weather-daily-icon" />`;
}

function renderHourlyForecast(data) {
  // RENDER HOURLY TIME
  const hourlyWeather0 = document.querySelector("#hourly-time-0");
  hourlyWeather0.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[0].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[0].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[0].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[0].weather[0].main}</div>`;

  const hourlyWeather1 = document.querySelector("#hourly-time-1");
  hourlyWeather1.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[1].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[1].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[1].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[1].weather[0].main}</div>`;

  const hourlyWeather2 = document.querySelector("#hourly-time-2");
  hourlyWeather2.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[2].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[2].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[2].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[2].weather[0].main}</div>`;

  const hourlyWeather3 = document.querySelector("#hourly-time-3");
  hourlyWeather3.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[3].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[3].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[3].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[3].weather[0].main}</div>`;

  const hourlyWeather4 = document.querySelector("#hourly-time-4");
  hourlyWeather4.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[4].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[4].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[4].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[4].weather[0].main}</div>`;

  const hourlyWeather5 = document.querySelector("#hourly-time-5");
  hourlyWeather5.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[5].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[5].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[5].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[5].weather[0].main}</div>`;

  const hourlyWeather6 = document.querySelector("#hourly-time-6");
  hourlyWeather6.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[6].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[6].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[6].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[6].weather[0].main}</div>`;

  const hourlyWeather7 = document.querySelector("#hourly-time-7");
  hourlyWeather7.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[7].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[7].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[7].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[7].weather[0].main}</div>`;

  const hourlyWeather8 = document.querySelector("#hourly-time-8");
  hourlyWeather8.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[8].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[8].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[8].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[8].weather[0].main}</div>`;

  const hourlyWeather9 = document.querySelector("#hourly-time-9");
  hourlyWeather9.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[9].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[9].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[9].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[9].weather[0].main}</div>`;

  const hourlyWeather10 = document.querySelector("#hourly-time-10");
  hourlyWeather10.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[10].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[10].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[10].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[10].weather[0].main}</div>`;

  const hourlyWeather11 = document.querySelector("#hourly-time-11");
  hourlyWeather11.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[11].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[11].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[11].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[11].weather[0].main}</div>`;

  const hourlyWeather12 = document.querySelector("#hourly-time-12");
  hourlyWeather12.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[12].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[12].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[12].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[12].weather[0].main}</div>`;

  const hourlyWeather13 = document.querySelector("#hourly-time-13");
  hourlyWeather13.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[13].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[13].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[13].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[13].weather[0].main}</div>`;

  const hourlyWeather14 = document.querySelector("#hourly-time-14");
  hourlyWeather14.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[14].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[14].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[14].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[14].weather[0].main}</div>`;

  const hourlyWeather15 = document.querySelector("#hourly-time-15");
  hourlyWeather15.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[15].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[15].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[15].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[15].weather[0].main}</div>`;

  const hourlyWeather16 = document.querySelector("#hourly-time-16");
  hourlyWeather16.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[16].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[16].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[16].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[16].weather[0].main}</div>`;

  const hourlyWeather17 = document.querySelector("#hourly-time-17");
  hourlyWeather17.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[17].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[17].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[17].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[17].weather[0].main}</div>`;

  const hourlyWeather18 = document.querySelector("#hourly-time-18");
  hourlyWeather18.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[18].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[18].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[18].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[18].weather[0].main}</div>`;

  const hourlyWeather19 = document.querySelector("#hourly-time-19");
  hourlyWeather19.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[19].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[19].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[19].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[19].weather[0].main}</div>`;

  const hourlyWeather20 = document.querySelector("#hourly-time-20");
  hourlyWeather20.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[20].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[20].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[20].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[20].weather[0].main}</div>`;

  const hourlyWeather21 = document.querySelector("#hourly-time-21");
  hourlyWeather21.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[21].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[21].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[21].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[21].weather[0].main}</div>`;

  const hourlyWeather22 = document.querySelector("#hourly-time-22");
  hourlyWeather22.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[22].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[22].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[22].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[22].weather[0].main}</div>`;

  const hourlyWeather23 = document.querySelector("#hourly-time-23");
  hourlyWeather23.innerHTML = `<div class="forecast-hourly-time">${formatTime(
    data.hourly[23].dt,
    data.timezone_offset,
    "hour"
  )}</div>
  <img src=${renderWeatherIcon(
    data.hourly[23].weather[0].icon
  )} class="forecast-hourly-icon" />
  <div class="forecast-hourly-temp">${Math.round(data.hourly[23].temp)}°</div>
  <div class="forecast-hourly-desc">${data.hourly[23].weather[0].main}</div>`;
}

function renderWeatherInfo(data, cityLocation) {
  renderWeatherData(data, cityLocation);
  renderDailyForecast(data);
  renderHourlyForecast(data);
}

export default renderWeatherInfo;
