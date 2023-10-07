const path = require("path");

/**
 * Load environment variables from .env file
 */
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

/**
 * Used middleware to parse the request body
 */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Used middleware to enable CORS
 */
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

/**
 * Check if environment variables
 */
let PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}...`);
});

/**
 * TODO: Get data from server side then show in client
 */
app.get("/getSentiment", function (req, res) {
  res.sendFile("index.html", { root: "dist" });
});

/**
 * TODO: Post data from client side to server side, call API
 */
app.post("/postSentiment", callData);

async function callData(req, res) {
  const url = `${process.env.API_URL}?key=${process.env.API_KEY}&lang=auto&url=${req.body.inputUrl}`;
  const response = await fetch(url);

  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
}
