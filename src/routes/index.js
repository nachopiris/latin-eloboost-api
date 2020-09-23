const { Router } = require("express");
const summonerRouter = require("./summonerLeague.js");
const mercadopagoRouter = require("./mercadopago.js");

const router = Router();

router.use("/summoner-league", summonerRouter);
router.use("/mercadopago", mercadopagoRouter);

module.exports = router;
