const supabase = require("../config/supabase");

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active");

    // 🔥 FIX HERE
    if (error || !data || data.length === 0) {
      return res.status(403).json({
        message: "No active subscription",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkSubscription;