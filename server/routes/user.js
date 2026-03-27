const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const checkSubscription = require("../middleware/subscriptionMiddleware");

router.get("/profile", verifyToken, checkSubscription, (req, res) => {
  console.log("Profile route hit");

  res.json({
    message: "Protected data",
    user: req.user,
  });
});

module.exports = router;