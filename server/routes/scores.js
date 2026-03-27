const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const checkSubscription = require("../middleware/subscriptionMiddleware");
const scoreController = require("../controllers/scoreController");

router.post("/", verifyToken, checkSubscription, scoreController.addScore);
router.get("/", verifyToken, checkSubscription, scoreController.getScores);

module.exports = router;