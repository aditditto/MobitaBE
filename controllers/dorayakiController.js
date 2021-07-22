var Dorayaki = require("../models/dorayaki");
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
  ...dorayakiValidation,
  (req, res, next) => {
    // send errors if exist
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Dorayaki({
      flavor: req.body.flavor,
      description: req.body.description,
    })
      .save()
      .then((dorayaki) => {
        res
          .status(201)
          .location("/dorayaki/" + dorayaki._id)
          .end();
      })
      .catch((error) => {
        next(error);
      });
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

exports.deleteDorayaki = (req, res, next) => {
  Dorayaki.findByIdAndDelete(req.params.id)
    .exec()
    .then((dorayaki) => {
      dorayaki ? res.sendStatus(200) : res.sendStatus(404);
    })
    .catch((error) => next(error));
};
