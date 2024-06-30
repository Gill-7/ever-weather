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

let userCityName;
let userLocation;
let map;
let mapNightID = "5142c1d38b016d6a";
let mapLightID = "8779c20f81c729cb";
let MAPID;
let marker;
// let userLocationMarker;
let pinStyles;

function getPosition() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    }
  });
}

async function loadMapLibrary() {
  const loader = new Loader({
    apiKey: "AIzaSyAypl2SGejMVaKR05ABZSfx6bgkrb9WR3Y",
    version: "weekly",
    // libraries: ["places"],
  });

  let { Map } = await loader.importLibrary("maps");
  let { AdvancedMarkerElement, PinElement } = await loader.importLibrary(
    "marker"
  );

  return { loader, Map, AdvancedMarkerElement, PinElement };
}

function createCenterControl(
  map,
  latitude,
  longitude
  // AdvancedMarkerElement,
  // homePinStyles
) {
  const controlButton = document.createElement("button");
  controlButton.className = "centered-location";
  controlButton.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';

  let currentLocation = { lat: latitude, lng: longitude };
  controlButton.addEventListener("click", () => {
    map.setCenter(currentLocation);
    map.setZoom(11);
    marker.setMap(null);
    // userLocationMarker = new AdvancedMarkerElement({
    //   map,
    //   position: userLocation,
    //   content: homePinStyles.element,
    // });

    if (cityName !== userCityName) {
      weatherDataByCoords(latitude, longitude);
    }
  });
  return controlButton;
}

const changeMapWithThemeHandler = () => {
  let theme = localStorage.getItem("theme");
  if (theme === "dark") {
    MAPID = mapNightID;
  } else {
    MAPID = mapLightID;
  }
};

const loadMap = async (latitude, longitude) => {
  changeMapWithThemeHandler();

  const { Map, PinElement, AdvancedMarkerElement } = await loadMapLibrary();

  map = new Map(document.querySelector(".map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 11,
    minZoom: 2.3,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    mapTypeControl: false,
    fullscreenControl: true,
    mapId: MAPID,
  });

  // MARKER FOR FINDING LOCATION WEATHER
  pinStyles = new PinElement({
    background: "#FBBC04",
    scale: 0.6,
  });

  // A MARKER FOR USER LOCATION
  const icon = document.createElement("div");
  icon.innerHTML =
    '<i class="fa-solid fa-house" style="color:#023e8a;fontSize:20px"></i>';

  const homePinStyles = new PinElement({
    glyph: icon,
    glyphColor: "#023e8a",
    background: "#48cae4",
    borderColor: "#023e8a",
  });

  new AdvancedMarkerElement({
    map,
    position: { lat: userLocation.lat, lng: userLocation.lng },
    content: homePinStyles.element,
    title: "Your location",
  });

  if (theme === "dark") {
    MAPID = mapNightID;
  } else {
    MAPID = mapLightID;
  }

  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl(
    map,
    userLocation.lat, //latitude
    userLocation.lng, //longitude
    AdvancedMarkerElement,
    homePinStyles
  );
  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

  // GET COORDINATES ON MAP CLICK
  map.addListener("click", (e) => {
    latitude = e.latLng.lat();
    longitude = e.latLng.lng();
    marker = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      content: pinStyles.element,
    });
    weatherDataByCoords(latitude, longitude);
  });
};

let latitude;
let longitude;
let cityName;

const cityNameByCoords = async (latitude, longitude) => {
  const cityCoords = await fetch(getCityName(latitude, longitude));
  const cityData = await cityCoords.json();
  cityName = cityData[0].name;
  return cityName;
};

const weatherDataByCoords = async (latitude, longitude) => {
  const weatherData = await fetch(getWeatherDataByCoords(latitude, longitude));
  const data = await weatherData.json();
  const cityData = await cityNameByCoords(latitude, longitude);
  renderWeatherInfo(data, cityData);
};

const getWeatherData = async (initialLoad = false) => {
  try {
    if (initialLoad) {
      const { coords } = await getPosition();
      latitude = coords.latitude;
      longitude = coords.longitude;
      userLocation = { lat: latitude, lng: longitude };
      userCityName = await cityNameByCoords(latitude, longitude);
      loadMap(latitude, longitude);
    } else {
      cityName = formData();
      const cityCoords = await fetch(getCityCoords(cityName));
      const cityLatlon = await cityCoords.json();
      latitude = cityLatlon[0].lat;
      longitude = cityLatlon[0].lon;
      loadMap(latitude, longitude);
      const { AdvancedMarkerElement } = await loadMapLibrary();
      marker = new AdvancedMarkerElement({
        map,
        position: { lat: latitude, lng: longitude },
        content: pinStyles.element,
      });
    }
    if (!cityName) {
      return;
    }
    await weatherDataByCoords(latitude, longitude);

    document.querySelector(".error-msg").style.display = "none";
    input.value = "";
  } catch (err) {
    console.log(err);
    document.querySelector(".error-msg").style.display = "block";
  }
  // input.value = "";
};

getWeatherData(true);

const form = document.querySelector(".form");
let input = document.querySelector(".search-input");

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
  loadMap(latitude, longitude);

  darkThemeBtn.classList.remove("hidden");
  lightThemeBtn.classList.add("hidden");
});

darkThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  let themeFromStorage = localStorage.getItem("theme");
  setTheme(themeFromStorage);

  changeMapWithThemeHandler();
  loadMap(latitude, longitude);

  darkThemeBtn.classList.add("hidden");
  lightThemeBtn.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});

// CLOSE ERROR MSG WHEN LOCATION IS INCORRECT

const close = document.querySelector(".close");

close.addEventListener("click", () => {
  document.querySelector(".error-msg").style.display = "none";
});
