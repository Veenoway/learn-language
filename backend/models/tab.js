const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tabSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

const Tab = mongoose.model("Tab", tabSchema, "tab");

module.exports = Tab;
