const supabase = require("../config/supabase");

// GET charities
exports.getCharities = async (req, res) => {
  const { data, error } = await supabase.from("charities").select("*");

  if (error) return res.status(400).json(error);

  res.json(data);
};

// SELECT charity
exports.selectCharity = async (req, res) => {
  const userId = req.user.id;
  const { charity_id, percentage } = req.body;

  if (percentage < 10) {
    return res.status(400).json({
      message: "Minimum 10% required",
    });
  }

  const { data, error } = await supabase
    .from("users")
    .update({
      charity_id,
      contribution_percentage: percentage,
    })
    .eq("id", userId)
    .select();

  if (error) return res.status(400).json(error);

  res.json({
    message: "Charity selected",
    user: data[0],
  });
};