const server = require("express").Router();
const axios = require("axios");

const apiKey = "RGAPI-4d70d298-a19d-42ae-83ab-647cf220f34d";

server.get("/", (req, res) => {
  res.send("holaaaaa");
});

server.post("/", (req, res) => {
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

module.exports = server;
