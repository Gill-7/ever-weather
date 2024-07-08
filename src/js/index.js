import {
  formData,
  getUserLocation,
  getCityCoords,
  getWeatherDataByCoords,
} from "./apiFunction.js";
import "../styles/index.css";
import renderWeatherInfo from "./apiDOM.js";
import { googleMap_api_key } from "../../config.js";
import { Loader } from "@googlemaps/js-api-loader";

//   // var image = document.images[0];
//   // var downImg = new Image();
//   // downImg.onload = function () {
//   //   image.src = this.src;
//   // };

//   // downImg.src = "../svg/weather.jpg";

// APPLICATION STATE VARIABLES
let userCityName;
let userCoordinates;
let latitude;
let longitude;
let cityLocation = {};

// MAP STATE VARIABLES
let map;
let mapNightID = "3998899cbaa99a34";
let mapLightID = "22a0cf5343257c72";
let MAPID;
let marker;
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

const loadMapLibrary = async () => {
  const loader = new Loader({
    apiKey: googleMap_api_key,
    version: "weekly",
  });
  let { Map } = await loader.importLibrary("maps");
  let { AdvancedMarkerElement, PinElement } = await loader.importLibrary(
    "marker"
  );
  return { Map, AdvancedMarkerElement, PinElement };
};

const createCenterControl = (map, latitude, longitude) => {
  const controlButton = document.createElement("button");
  controlButton.className = "centered-location";
  controlButton.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i>';

  let currentLocation = { lat: latitude, lng: longitude };
  controlButton.addEventListener("click", () => {
    map.setCenter(currentLocation);
    map.setZoom(11);
    marker.setMap(null);

    if (cityLocation.cityName !== userCityName) {
      weatherDataByCoords(latitude, longitude);
    }
  });
  return controlButton;
};

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
  const { Map, AdvancedMarkerElement, PinElement } = await loadMapLibrary();
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
    position: { lat: userCoordinates.lat, lng: userCoordinates.lng },
    content: homePinStyles.element,
    title: "Your location",
  });

  // if (theme === "dark") {
  //   MAPID = mapNightID;
  // } else {
  //   MAPID = mapLightID;
  // }

  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl(
    map,
    userCoordinates.lat, //latitude
    userCoordinates.lng, //longitude
    AdvancedMarkerElement,
    homePinStyles
  );
  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

  // GET COORDINATES ON MAP CLICK
  map.addListener("click", async (e) => {
    latitude = e.latLng.lat();
    longitude = e.latLng.lng();
    marker = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      content: pinStyles.element,
    });
    const { cityName, cityState } = await handleUserLocation(
      latitude,
      longitude
    );
    cityLocation.cityName = cityName;
    cityLocation.cityState = cityState;
    await weatherDataByCoords(latitude, longitude);
  });
};

const getStateData = (address_components) => {
  let state;
  address_components.map((data) => {
    if (data.types[0] === "administrative_area_level_1") {
      state = data.long_name;
    }
  });
  return state;
};

const handleLocationData = (data) => {
  let loc;
  let bool = true;
  data.map((location) => {
    if (location.types[0] === "locality") {
      let city = location.address_components[0].long_name;
      let state = getStateData(location.address_components);
      loc = {
        cityName: city,
        cityState: state,
      };
      bool = false;
    }
  });
  bool &&
    data.map((location) => {
      if (location.types[0] === "administrative_area_level_2") {
        let city = location.address_components[0].long_name;
        let state = getStateData(location.address_components);
        loc = {
          cityName: city,
          cityState: state,
        };
        bool = true;
      }
    });
  return loc;
};

const weatherDataByCoords = async (latitude, longitude) => {
  const weatherData = await fetch(getWeatherDataByCoords(latitude, longitude));
  const data = await weatherData.json();
  renderWeatherInfo(data, cityLocation);
};

const handleUserLocation = async (latitude, longitude) => {
  const data = await fetch(getUserLocation(latitude, longitude));
  let { results } = await data.json();
  let { cityName, cityState } = handleLocationData(results);
  return { cityName, cityState };
};

const getWeatherData = async (initialLoad = false) => {
  try {
    if (initialLoad) {
      const { coords } = await getPosition();
      console.log("javascript after running");
      latitude = coords.latitude;
      longitude = coords.longitude;
      userCoordinates = { lat: latitude, lng: longitude };
      const { cityName, cityState } = await handleUserLocation(
        latitude,
        longitude
      );
      cityLocation.cityName = cityName;
      cityLocation.cityState = cityState;
      loadMap(latitude, longitude);
    } else {
      let searchLocation = formData(); //location name
      const cityCoords = await fetch(getCityCoords(searchLocation)); // lat lng
      const cityLatLng = await cityCoords.json();

      const { address_components, geometry } = cityLatLng.results[0];
      latitude = geometry.location.lat;
      longitude = geometry.location.lng;

      cityLocation.cityName = address_components[0].long_name;
      cityLocation.cityState = getStateData(address_components);

      loadMap(latitude, longitude);

      const { AdvancedMarkerElement } = await loadMapLibrary();
      marker = new AdvancedMarkerElement({
        map,
        position: { lat: latitude, lng: longitude },
        content: pinStyles.element,
      });
    }
    if (!cityLocation.cityName) {
      return;
    }
    await weatherDataByCoords(latitude, longitude);

    document.querySelector(".error-msg").style.display = "none";
    input.value = "";
  } catch (err) {
    console.log(err);
    document.querySelector(".error-msg").style.display = "block";
  }
};
console.log("javascript before running");
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

const markerLoadTheme = async () => {
  const { AdvancedMarkerElement } = await loadMapLibrary();
  marker = new AdvancedMarkerElement({
    map,
    position: { lat: latitude, lng: longitude },
    content: pinStyles.element,
  });
};

lightThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
  let themeFromStorage = localStorage.getItem("theme");
  setTheme(themeFromStorage);

  changeMapWithThemeHandler();
  loadMap(latitude, longitude);

  markerLoadTheme();

  darkThemeBtn.classList.remove("hidden");
  lightThemeBtn.classList.add("hidden");
});

darkThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  let themeFromStorage = localStorage.getItem("theme");
  setTheme(themeFromStorage);

  changeMapWithThemeHandler();
  loadMap(latitude, longitude);

  markerLoadTheme();

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
