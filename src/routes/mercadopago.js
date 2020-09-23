const { Router } = require("express");
const mercadopago = require("mercadopago");

const router = Router();

mercadopago.configure({
  access_token:
    "TEST-1520402290814953-092000-9711550a934ab2e34bacf7346ff23d3a-199025745",
});

router.post("/payment/new", (req, res) => {
  const { productName, price, unit, firstName, lastName, email } = req.body;
  let preference = {
    items: [
      {
        title: productName,
        unit_price: parseFloat(price),
        quantity: parseInt(unit),
      },
    ],
    payer: {
      name: firstName,
      surname: lastName,
      email: email,
      date_created: Date.now(),
      phone: {},
      identification: {},
      address: {},
    },
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      const url = response.body.init_point;
      console.log(url);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
