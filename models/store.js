var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var storeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  address: { street: String, district: String, province: String },
});

storeSchema.virtual("address").get(function () {
  return (
    this.address.street +
    ", " +
    this.address.district +
    ", " +
    this.address.province
  );
});

module.exports = mongoose.model("Store", storeSchema);
