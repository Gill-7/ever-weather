const fetch = require("node-fetch");
const { GEOCODE_API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const { cityName } = event.queryStringParameters;
    if (!cityName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "City name is required" }),
      };
    }
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${GEOCODE_API_KEY}`
    );

    let data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
