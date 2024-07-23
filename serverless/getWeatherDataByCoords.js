const fetch = require("node-fetch");

const { API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const { lat, lon } = event.queryStringParameters;

    if (!lat || !lon) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Latitude and Longitude are required" }),
      };
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    let response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
    );

    let data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.stack,
    };
  }
};
