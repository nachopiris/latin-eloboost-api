const { Router, response } = require("express");
const axios = require("axios");
const Order = require("../models/Order");

const router = Router();

router.post("/create", async (req, res) => {
  const {
    productName,
    summonerName,
    section,
    server,
    price,
    unit,
    email,
  } = req.body;

  const newOrder = await Order.create({
    type: section,
    toDo: productName,
    summonerName,
    server,
    email,
  });

  axios
    .post(
      "https://latin-eloboost-api.herokuapp.com/api/mercadopago/preference",
      {
        productName,
        price,
        unit,
        orderId: newOrder.id,
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error).status(500);
    });
});

router.put("/update", (req, res) => {
  const paymentId = req.body;

  axios
    .get(
      `https://latin-eloboost-api.herokuapp.com/api/mercadopago/${paymentId}`
    )
    .then(async (response) => {
      const payment = response.data;
      const updatedOrder = await Order.findOneAndUpdate(
        { id: payment.external_reference },
        { status: payment.status }
      );
      console.log(updatedOrder);
      res.sendStatus(200);
    });
});

module.exports = router;
