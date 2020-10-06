const { Router } = require("express");
const axios = require("axios");

const router = Router();

router.post("/new", (req, res) => {
  const data = {
    id: req.query.id,
    payment: req.query.topic,
  };

  console.log(data);

  res.sendStatus(200);
});

module.exports = router;
