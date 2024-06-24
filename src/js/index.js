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
} from "./apiDOM.js";

import { Loader } from "@googlemaps/js-api-loader";

//   // var image = document.images[0];
//   // var downImg = new Image();
//   // downImg.onload = function () {
//   //   image.src = this.src;
//   // };

//   // downImg.src = "../svg/weather.jpg";

function getPosition() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    }
  });
}

function createCenterControl(map, latitude, longitude) {
  const controlButton = document.createElement("button");
  controlButton.className = "centered-location";
  controlButton.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';

  let currentLocation = { lat: latitude, lng: longitude };
  controlButton.addEventListener("click", () => {
    map.setCenter(currentLocation);
  });

  return controlButton;
}

const styles = {
  map: [],
  night: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      // stylers: [{ color: "#38414e" }],
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f19657" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
      // stylers: [{ color: "#f19657" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      // stylers: [{ color: "#17263c" }],
      stylers: [{ color: "#1d2024" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      // stylers: [{ color: "#17263c" }],
      stylers: [{ color: "#1d2024" }],
    },
  ],
};

let map;

const changeMapWithThemeHandler = () => {
  let theme = localStorage.getItem("theme");
  if (theme === "dark") {
    map.setOptions({ styles: styles["night"] });
  } else {
    map.setOptions({ styles: styles["map"] });
  }
};

const loadMap = async (latitude, longitude) => {
  const loader = new Loader({
    apiKey: "AIzaSyAypl2SGejMVaKR05ABZSfx6bgkrb9WR3Y",
    version: "weekly",
    // ...additionalOptions,
  });

  let { Map } = await loader.importLibrary("maps");
  map = new Map(document.querySelector(".map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 7,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    mapTypeControl: false,
    fullscreenControl: true,
  });

  if (theme === "dark") {
    map.setOptions({ styles: styles["night"] });
  } else {
    map.setOptions({ styles: styles["map"] });
  }

  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl(map, latitude, longitude);
  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
};

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
      loadMap(latitude, longitude);
      const cityData = await cityCoords.json();
      cityName = cityData[0].name;
    } else {
      cityName = formData();
      const cityCoords = await fetch(getCityCoords(cityName));
      const cityLatlon = await cityCoords.json();
      latitude = cityLatlon[0].lat;
      longitude = cityLatlon[0].lon;
      loadMap(latitude, longitude);
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
    // document.querySelector(".form").style.display = "block";
  } catch (err) {
    document.querySelector(".error-msg").style.visibility = "visible";
  }
  input.value = "";
};

getWeatherData(true);

const form = document.querySelector(".form");
const input = document.querySelector(".search-input");

let lightThemeBtn = document.querySelector(".lightTheme-button");
let darkThemeBtn = document.querySelector(".darkTheme-button");
let theme = localStorage.getItem("theme");

const themeLoad = () => {
  if (theme !== null) {
    if (theme === "dark") {
      darkThemeBtn.classList.add("hidden"); //remove moon
      lightThemeBtn.classList.remove("hidden"); //show sun
    } else {
      darkThemeBtn.classList.remove("hidden");
      lightThemeBtn.classList.add("hidden");
    }
    return theme;
  }
  return "dark";
};

const setTheme = (theme) => {
  document.documentElement.className = theme;
};

const themeLocalStorage = themeLoad();
setTheme(themeLocalStorage);

lightThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
  let themeFromStorage = localStorage.getItem("theme");
  setTheme(themeFromStorage);

  changeMapWithThemeHandler();

  darkThemeBtn.classList.remove("hidden");
  lightThemeBtn.classList.add("hidden");
});

darkThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  let themeFromStorage = localStorage.getItem("theme");
  setTheme(themeFromStorage);

  changeMapWithThemeHandler();

  darkThemeBtn.classList.add("hidden");
  lightThemeBtn.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});
