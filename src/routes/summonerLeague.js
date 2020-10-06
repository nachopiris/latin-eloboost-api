const { Router } = require("express");
const axios = require("axios");

const router = Router();

const apiKey = "RGAPI-26bab40e-eed0-4eae-9ef2-37f48cadebe4";

router.post("/", (req, res) => {
  const { name, server } = req.body;
  axios
    .get(
      `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
    )
    .then((response) => {
      const summonerId = response.data.id;
      axios
        .get(
          `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
        )
        .then((response) => {
          const filteredMode = response.data.find(
            (el) => el.queueType === "RANKED_SOLO_5x5"
          );
          if (filteredMode) {
            const position = {
              league: filteredMode.tier,
              division: filteredMode.rank,
            };
            res.send(position);
          } else {
            res.send({
              league: "UNRANKED",
              division: "I",
            });
          }
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
