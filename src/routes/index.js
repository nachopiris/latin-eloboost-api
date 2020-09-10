const { Router } = require("express");
const summonerRouter = require("./summonerLeague.js");
const mercadopagoRouter = require("./mercadopago.js");
const redirectRouter = require("./redirect.js");

const router = Router();

router.use("/summoner-league", summonerRouter);
router.use("/mercadopago", mercadopagoRouter);
router.use("/redirect", redirectRouter);

module.exports = router;
