const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const requestPost = require("./requestServer.js");

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

app.post("/sentiments", function (req, res, next) {
  try {
    requestPost.checkRequest(req, res, next);
    requestPost.post(req, res, next);
  } catch (error) {
    return next(error);
  }
});
