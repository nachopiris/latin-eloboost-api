const { Router } = require("express");
const mercadopago = require("mercadopago");
const axios = require("axios");

const mpAccessToken =
  "APP_USR-6598461348116788-092518-7155868d5ab76566022e9a4fc6413bf0-651261130";

const router = Router();

mercadopago.configure({
  access_token: mpAccessToken,
});

router.get("/:prefId", (req, res) => {
  axios
    .get(
      `https://api.mercadopago.com/checkout/preferences/${req.params.prefId}`,
      {
        headers: {
          Authorization: `Bearer ${mpAccessToken}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error).status(500);
    });
});

router.get("/:paymentId", (req, res) => {
  axios
    .get(`https://api.mercadopago.com/v1/payments/${req.params.paymentId}`, {
      headers: {
        Authorization: `Bearer ${mpAccessToken}`,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error).status(500);
    });
});

router.post("/notification", (req, res) => {
  const paymentId = req.query.payment;
  res.sendStatus(200);
});

router.post("/preference", (req, res) => {
  const { productName, price, unit, orderId } = req.body;
  let preference = {
    items: [
      {
        title: productName,
        unit_price: parseFloat(price),
        quantity: parseInt(unit),
      },
    ],
    external_reference: orderId,
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const prefId = response.body.id;
      res.send(prefId).status(200);
    })
    .catch((error) => {
      res.send(error).status(500);
    });
});

module.exports = router;
