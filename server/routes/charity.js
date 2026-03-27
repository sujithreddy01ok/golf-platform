const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const charityController = require("../controllers/charityController");

router.get("/", charityController.getCharities);
router.post("/select", verifyToken, charityController.selectCharity);

module.exports = router;