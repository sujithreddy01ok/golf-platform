const supabase = require("../config/supabase");

exports.createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: userId,
          status: "active",
          plan: "monthly",
        },
      ])
      .select();

    if (error) return res.status(400).json(error);

    res.json({
      message: "Subscription created",
      subscription: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};