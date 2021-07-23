var express = require("express");
var router = express.Router();
var storesController = require("../controllers/storesController");
var stockController = require("../controllers/stockController");

router.get("/", storesController.getAllStores);

router.post("/", storesController.newStore);

router.get("/:id", storesController.getStore);

router.delete("/:id", storesController.deleteStore);

router.put("/:id", storesController.updateStore);

router.get("/:id/stocks", stockController.getStoreStocks);

router.post("/:id/stocks", stockController.newStock);

router.get("/:id/stocks/:stockID", stockController.getStock);

router.delete("/:id/stocks/:stockID", stockController.deleteStock);

router.patch("/:id/stocks/:stockID", stockController.updateStock);

module.exports = router;
