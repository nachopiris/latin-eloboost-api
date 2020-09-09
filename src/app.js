const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");

const server = express();

server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

server.use("/api", routes);

module.exports = server;
