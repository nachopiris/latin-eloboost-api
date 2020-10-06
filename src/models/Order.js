const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  type: String,
  toDo: String,
  summonerName: String,
  server: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["payment_completed", "payment_pending", "in_process", "delivered"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
