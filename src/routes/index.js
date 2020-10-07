const { Router } = require("express");
const riotRouter = require("./riot.js");
const mercadopagoRouter = require("./mercadopago.js");
const ordersRouter = require("./orders.js");

const router = Router();

router.use("/riot", riotRouter);
router.use("/mercadopago", mercadopagoRouter);
router.use("/orders", ordersRouter);

module.exports = router;
