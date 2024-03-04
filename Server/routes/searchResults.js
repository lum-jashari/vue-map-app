const express = require("express");
const axios = require("axios");
const URL = require("url");

const router = express.Router();

router.get("/:query", async (req, res) => {
  try {
    // add api key and query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...URL.parse(req.url, true).query,
    });
    console.log(params);
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    // format data to include city and state
    results.data.features.forEach((item) => {
      item.context.forEach((type) => {
        item.city = type.text;
      });
    });

    const data = results.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
