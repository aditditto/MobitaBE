var express = require("express");
var router = express.Router();
var storesController = require("../controllers/storesController");

router.get("/", storesController.getAllStores);

router.post("/", storesController.newStore);

router.get("/:id", storesController.getStore);

router.delete("/:id", storesController.deleteStore);

router.put("/:id", storesController.updateStore);

router.get("/:id/stocks", storesController.getAllStocks);

router.post("/:id/stocks", storesController.newStock);

router.get("/:id/stocks/:stockID", storesController.getStock);

router.delete("/:id/stocks/:stockID", storesController.deleteStock);

router.put("/:id/stocks/:stockID", storesController.updateStock);

module.exports = router;
