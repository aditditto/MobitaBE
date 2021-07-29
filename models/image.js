var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema({
  contentType: String,
  data: Buffer,
});
// gambar disimpan di frontend dengan nama file _id.jpg

module.exports = mongoose.model("Image", imageSchema);
