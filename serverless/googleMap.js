const fetch = require("node-fetch");

const { GOOGLEMAP_API_KEY } = process.env;

exports.handler = async (event, context) => {
  try {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=weekly&key=${GOOGLEMAP_API_KEY}`;
    const response = await fetch(mapUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch Google Maps API data");
    }

    const data = await response.text();
    // console.log(data);
    // const loader = new Loader({
    //   apiKey: GOOGLEMAP_API_KEY,
    //   version: "weekly",
    // });
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
