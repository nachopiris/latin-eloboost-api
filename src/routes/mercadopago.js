const server = require("express").Router();

const PaymentController = require("../controllers/PaymentController.js");
const PaymentService = require("../services/PaymentService.js");
const PaymentInstance = new PaymentController(new PaymentService());

server.post("/payment/new", (req, res) => {
  PaymentInstance.getMercadoPagoLink(req, res);
});

server.post("/webhook", (req, res) => {
  console.log(req);
  PaymentInstance.webhook(req, res);
});

module.exports = server;
