const mongoose = require("mongoose");

const URI =
  "mongodb+srv://nachoblack:asd61323@cluster0.pomwo.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
