const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  hanzi: String,
  francais: String,
  pinyin: String,
});

module.exports = mongoose.model("Card", cardSchema, "cards");
