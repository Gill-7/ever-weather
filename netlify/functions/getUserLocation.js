const axios = require("axios");
require("dotenv").config();

exports.handler = async function (event, context) {
  const { GEOCODE_API_KEY } = process.env;
  const { latitude, longitude } = event.queryStringParameters;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODE_API_KEY}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
