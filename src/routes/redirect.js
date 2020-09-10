const server = require("express").Router();

server.get("/success", (req, res) => {
  res.send("OK");
});

server.get("/pending", (req, res) => {
  res.send("PENDING");
});

server.get("/failure", (req, res) => {
  res.send("FAILURE");
});

module.exports = server;
