var Store = require("../models/store");
var storeStock = require("../models/storeStock");

exports.getAllStores = (req, res, next) => {
  res.send("TODO endpoint to get all stores");
};

exports.newStore = (req, res, next) => {
  res.send("TODO endpoint to post a new store");
};

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
