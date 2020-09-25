const { Router } = require("express");
const mercadopago = require("mercadopago");

const router = Router();

mercadopago.configure({
  access_token:
    "APP_USR-1473567962389678-092515-3ae6ae1cfb6a00ff49005474c76e49ca-197123651",
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
