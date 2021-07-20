var Store = require("../models/store");
var storeStock = require("../models/storeStock");

const { body, validationResult } = require("express-validator");

exports.getAllStores = (req, res, next) => {
  res.send("TODO endpoint to get all stores");
};

exports.newStore = [
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
        res.status(200).json(store._id);
      })
      .catch((error) => {
        next(error);
      });
  },
];

exports.getStore = (req, res, next) => {
  res.send("TODO endpoint to get store with specific ID");
};

exports.updateStore = (req, res, next) => {
  res.send("TODO endpoint to update a store");
};

exports.deleteStore = (req, res, next) => {
  res.send("TODO endpoint to delete store");
};

exports.getAllStocks = (req, res, next) => {
  res.send("TODO endpoint to get all stock of a specific store");
};

exports.newStock = (req, res, next) => {
  res.send("TODO endpoint to add new dorayaki stock to a specific store");
};

exports.getStock = (req, res, next) => {
  res.send("TODO endpoint to get specific stock of a store");
};

exports.updateStock = (req, res, next) => {
  res.send("TODO endpoint to update specific stock of a store");
};

exports.deleteStock = (req, res, next) => {
  res.send("TODO endpoint to delete specific stock of a store");
};
