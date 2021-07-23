var Store = require("../models/store");

const { body, validationResult } = require("express-validator");

const storeValidation = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("address.street", "address.street must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("address.district", "address.district must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("address.province", "address.province must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
];

exports.getAllStores = (req, res, next) => {
  Store.find({})
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

exports.newStore = [
  ...storeValidation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Store({
      name: req.body.name,
      address: {
        street: req.body.address.street,
        district: req.body.address.district,
        province: req.body.address.province,
      },
    })
      .save()
      .then((store) => {
        res
          .status(201)
          .location("/stores/" + store._id)
          .end();
      })
      .catch((error) => {
        next(error);
      });
  },
];

exports.getStore = (req, res, next) => {
  Store.findById(req.params.id)
    .exec()
    .then((store) =>
      store ? res.status(200).send(store) : res.sendStatus(404)
    )
    .catch((error) => next(error));
};

exports.updateStore = [
  ...storeValidation,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Store.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        district: req.body.address.district,
        province: req.body.address.province,
      },
    })
      .exec()
      .then((store) => {
        store ? res.sendStatus(204) : res.sendStatus(404);
      })
      .catch((error) => next(error));
  },
];

exports.deleteStore = (req, res, next) => {
  Store.findByIdAndDelete(req.params.id)
    .exec()
    .then((store) => {
      store ? res.sendStatus(200) : res.sendStatus(404);
    })
    .catch((error) => next(error));
};
