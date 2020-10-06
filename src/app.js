const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index.js");

const { mongoose } = require("./database.js");

const server = express();

server.use(bodyParser.json());
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.use("/api", routes);

module.exports = server;
