const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("dist"));

app.listen(3099, function () {
  console.log("Server app listening on port 3099!");
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/sentiments", async function (req, res, next) {
  try {
    const url = generateURL(req.body.url);
    const response = await axios.post(url);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
  function generateURL(urlInput) {
    const baseURL = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    const url = `${baseURL}?key=${apiKey}&lang=auto&url=${urlInput}`;
    return url;
  }
});
