const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//init express
const app = express();

// enable cors
app.use(cors());

// routes
app.get("/api/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`
    );
    console.log(results.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ✅`));
