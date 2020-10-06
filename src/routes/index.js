const { Router } = require("express");
const summonerRouter = require("./summonerLeague.js");
const mercadopagoRouter = require("./mercadopago.js");
const ordersRouter = require("./orders.js");

const router = Router();

router.use("/summoner-league", summonerRouter);
router.use("/mercadopago", mercadopagoRouter);
router.use("/orders", ordersRouter);

module.exports = router;
