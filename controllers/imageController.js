var Image = require("../models/image");

exports.getImage = async (req, res, next) => {
  const loadedImg = await Image.findById(req.params.id).exec();
  res.setHeader("content-type", loadedImg.contentType);
  res.send(loadedImg.data);
};
