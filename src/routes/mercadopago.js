const { Router } = require("express");
const mercadopago = require("mercadopago");
const axios = require("axios");

const mpAccessToken = process.env.MP_ACCESS_TOKEN;

const router = Router();

mercadopago.configure({
  access_token: mpAccessToken,
});

router.get("/preference/:prefId", (req, res) => {
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

router.get("/payment/:paymentId", (req, res) => {
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

router.post("/notification", async (req, res) => {
  await axios.put(
    "https://latin-eloboost-api.herokuapp.com/api/orders/update",
    { paymentId: req.query.id }
  );
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
