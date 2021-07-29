var express = require("express");
var router = express.Router();
var imageController = require("../controllers/imageController");

router.get("/:id", imageController.getImage);

module.exports = router;
