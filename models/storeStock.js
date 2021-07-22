var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var storeStockSchema = new Schema({
  storeID: { type: Schema.Types.ObjectId, required: true },
  dorayakiID: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 0 },
  flavor: { type: String, required: true },
  description: String,
  imgUrl: String,
});

module.exports = mongoose.model("storeStock", storeStockSchema);
