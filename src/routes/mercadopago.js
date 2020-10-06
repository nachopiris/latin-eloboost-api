const { Router } = require("express");
const mercadopago = require("mercadopago");
const axios = require("axios");

const mpAccessToken =
  "APP_USR-6598461348116788-092518-7155868d5ab76566022e9a4fc6413bf0-651261130";

const router = Router();

mercadopago.configure({
  access_token: mpAccessToken,
});

router.get("/payment/:prefId", (req, res) => {
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
      res.json(response.data);
    })
    .catch((err) => {
      res.json({ error: { message: err, status: 500 } }).status(500);
    });
});

router.post("/payment/new", (req, res) => {
  const { productName, productDescription, price, unit, email } = req.body;
  let preference = {
    items: [
      {
        title: productName,
        description: productDescription,
        unit_price: parseFloat(price),
        quantity: parseInt(unit),
      },
    ],
    payer: {
      email: email,
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const init_point = response.body.init_point;
      res.send(init_point).status(200);
    })
    .catch((error) => {
      res.send(error).status(500);
    });
});

module.exports = router;
