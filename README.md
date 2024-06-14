# Ever Weather
This app provides a robust and user-friendly platform for weather updates.

[Live app](https://everweather.netlify.app)

### Features
- Utilizes the OpenWeatherMap API to fetch up-to-date weather information, including temperature, humidity, wind speed, and weather conditions for any given location.
- Built with HTML and styled using responsive CSS, the app adapts beautifully across various devices, providing a consistent and engaging experience whether accessed on a desktop, tablet, or mobile phone.
- The UI features dynamic elements such as animated weather icons.
- JavaScript drives the app's core functionality, including data fetching, user input handling, and dynamic content updates. Javascript library
- Webpack handles the bundling of JavaScript modules, CSS, and other assets, optimizing the app for performance and reducing load times.
- The app employs CSS Grid and Flexbox for a flexible layout that adapts to different screen sizes and orientations.
- The app also provides geolocation support, allowing users to quickly get weather updates for their current location.
- "date-fns" library provides robust and lightweight utilities for formatting and manipulating date and time data.


### Installing
```
git clone https://github.com/Gill-7/weather-application.git
cd weather-application
npm install
```
Enter your API key in ```config.js```
```
const api_key = 'YOUR API KEY';
npm run build
```

### Tools and Technologies
- **Technologies** - Javascript, CSS, HTML
- **Tools** - Webpack
- **API** - OpenWeather
- **Javascript Library** - date-fns
