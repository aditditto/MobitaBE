var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dorayakiSchema = new Schema({
  flavor: { type: String, required: true },
  description: String,
});
// gambar disimpan di frontend dengan nama file _id.jpg

module.exports = mongoose.model("Dorayaki", dorayakiSchema);
