const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  type: String,
  toDo: String,
  summonerName: String,
  server: String,
  email: String,
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["created", "approved", "pending", "in_process", "delivered"],
    default: "created",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
