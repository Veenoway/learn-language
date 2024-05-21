const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  address: String,
  tabs: [{ type: Schema.Types.ObjectId, ref: "Tab" }],
});

module.exports = mongoose.model("User", userSchema, "user");
