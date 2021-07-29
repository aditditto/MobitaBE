var Dorayaki = require("../models/dorayaki");
var Image = require("../models/image");
var multer = require("multer");
var fs = require("fs");
var upload = multer({ dest: "uploads/" });

const { body, validationResult } = require("express-validator");

const dorayakiValidation = [
  body("flavor", "flavor must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

exports.getAllDorayaki = (req, res, next) => {
  Dorayaki.find({})
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

exports.newDorayaki = [
  upload.single("image"),
  ...dorayakiValidation,
  async (req, res, next) => {
    // send errors if exist
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const filepath = __dirname + "/../" + req.file.path;
      const savedImage = await Image({
        contentType: req.file.mimetype,
        data: fs.readFileSync(filepath),
      }).save();

      const savedDorayaki = await Dorayaki({
        flavor: req.body.flavor,
        description: req.body.description,
        imgUrl: `/mongoImg/${savedImage._id}`,
      }).save();

      fs.unlinkSync(filepath);

      res
        .status(201)
        .location("/dorayaki/" + savedDorayaki._id)
        .end();
    } catch (error) {
      next(error);
    }
  },
];

exports.getDorayaki = (req, res, next) => {
  Dorayaki.findById(req.params.id)
    .exec()
    .then((dorayaki) =>
      dorayaki ? res.status(200).send(dorayaki) : res.sendStatus(404)
    )
    .catch((error) => next(error));
};

exports.updateDorayaki = [
  ...dorayakiValidation,
  (req, res, next) => {
    // send errors if exist
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Dorayaki.findByIdAndUpdate(req.params.id, {
      flavor: req.body.flavor,
      description: req.body.description,
    })
      .exec()
      .then((dorayaki) => {
        dorayaki ? res.sendStatus(204) : res.sendStatus(404);
      })
      .catch((error) => next(error));
  },
];

exports.deleteDorayaki = async (req, res, next) => {
  const dorayaki = await Dorayaki.findById(req.params.id).lean().exec();

  if (!dorayaki) return res.sendStatus(404);

  const imageID = dorayaki.imgUrl.split("/")[2];

  await Promise.all([
    Dorayaki.findByIdAndDelete(req.params.id),
    Image.findByIdAndDelete(imageID),
  ]);

  res.sendStatus(200);
};
