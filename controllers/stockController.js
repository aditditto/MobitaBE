const Stock = require("../models/storeStock");
const Store = require("../models/store");
const Dorayaki = require("../models/dorayaki");

const { body, validationResult } = require("express-validator");

const quantityValidation = body("quantity", "Invalid quantity").isInt({
  min: 0,
  allow_leading_zeroes: false,
});

exports.getAllStocks = (req, res, next) => {
  Stock.find({})
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

exports.getStoreStocks = (req, res, next) => {
  Stock.find({ storeID: req.params.id })
    .then((result) => res.json(result))
    .catch((error) => next(error));
};

exports.getStock = (req, res, next) => {
  Stock.findById(req.params.stockID)
    .exec()
    .then((stock) =>
      stock ? res.status(200).send(stock) : res.sendStatus(404)
    )
    .catch((error) => next(error));
};

exports.newStock = [
  quantityValidation,
  async (req, res, next) => {
    // send validation errors if exist
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check if objectID's refer to real objects
    try {
      var store = await Store.exists({ _id: req.params.id });
      var dorayaki = await Dorayaki.findById(req.body.dorayakiID).lean();
    } catch (err) {
      next(err);
    }

    if (!store)
      return res.status(400).json("Store with given ID does not exist");
    if (!dorayaki)
      return res.status(400).json("dorayaki with given ID does not exist");

    //   valid objectID's
    Stock({
      storeID: req.params.id,
      dorayakiID: dorayaki._id,
      flavor: dorayaki.flavor,
      quantity: req.body.quantity,
      description: dorayaki.description,
      imgUrl: dorayaki.imgUrl,
    })
      .save()
      .then((stock) =>
        stock
          ? res
              .status(201)
              .location(`/stores/${req.params.id}/stocks/${stock._id}`)
              .end()
          : res.sendStatus(400)
      )
      .catch((err) => next(err));
  },
];

exports.updateStock = [
  quantityValidation,
  (req, res, next) => {
    // send validation errors if exist
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Stock.findByIdAndUpdate(req.params.stockID, {
      quantity: req.body.quantity,
    })
      .exec()
      .then((stock) => {
        stock ? res.sendStatus(204) : res.sendStatus(404);
      })
      .catch((error) => next(error));
  },
];

exports.deleteStock = (req, res, next) => {
  Stock.findByIdAndDelete(req.params.stockID)
    .exec()
    .then((stock) => {
      stock ? res.sendStatus(200) : res.sendStatus(404);
    })
    .catch((error) => next(error));
};
