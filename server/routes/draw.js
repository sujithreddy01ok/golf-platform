const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const drawController = require("../controllers/drawController");

router.get("/run", verifyToken, drawController.runDraw);

module.exports = router;