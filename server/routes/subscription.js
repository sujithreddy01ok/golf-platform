const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const subController = require("../controllers/subscriptionController");

router.post("/create", verifyToken, subController.createSubscription);

module.exports = router;