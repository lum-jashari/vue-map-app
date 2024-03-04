const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//init express
const app = express();

// enable cors
app.use(cors());

// routes
app.use("/api/search", require("./routes/searchResults.js"));

// Handle Production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(`${__dirname}/public`));
// }

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ✅`));
