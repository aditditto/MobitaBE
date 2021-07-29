var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dorayakiSchema = new Schema({
  flavor: { type: String, required: true },
  description: String,
  imgUrl: String,
});

module.exports = mongoose.model("Dorayaki", dorayakiSchema);
