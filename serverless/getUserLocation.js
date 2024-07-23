const fetch = require("node-fetch");
const { GEOCODE_API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const { latitude, longitude } = event.queryStringParameters;

    if (!latitude || !longitude) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Latitude and Longitude are required" }),
      };
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Latitude and Longitude must be valid numbers",
        }),
      };
    }

    // Construct the URL for the Google Maps API request
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODE_API_KEY}`;

    // Fetch data from the Google Maps API
    const response = await fetch(url);
    const data = await response.json();

    // Return the API response with status code 200
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    // Return an error response with status code 500
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
