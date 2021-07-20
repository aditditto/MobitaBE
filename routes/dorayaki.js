var express = require("express");
var router = express.Router();
var dorayakiController = require("../controllers/dorayakiController");

router.get("/", dorayakiController.getAllDorayaki);

router.post("/", dorayakiController.newDorayaki);

router.get("/:id", dorayakiController.getDorayaki);

router.delete("/:id", dorayakiController.deleteDorayaki);

router.put("/:id", dorayakiController.updateDorayaki);

module.exports = router;
