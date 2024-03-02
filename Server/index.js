const express = require("express");
const cors = require("cors");
const axios = require("axios");
const URL = require("url");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//init express
const app = express();

// enable cors
app.use(cors());

// routes
app.use("/api/search", require("./routes/searchResults.js"));

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ✅`));
