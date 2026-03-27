const supabase = require("../config/supabase");

// ADD SCORE
exports.addScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score } = req.body;

    console.log("Adding score:", score, "for user:", userId);

    // Validate
    if (score < 1 || score > 45) {
      return res.status(400).json({
        message: "Score must be between 1 and 45",
      });
    }

    // Get existing scores
    const { data: existingScores } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    // Delete oldest if 5 exist
    if (existingScores.length >= 5) {
      const oldest = existingScores[0];

      await supabase
        .from("scores")
        .delete()
        .eq("id", oldest.id);
    }

    // Insert new score
    const { data, error } = await supabase
      .from("scores")
      .insert([{ user_id: userId, score }])
      .select();

    console.log("Insert result:", data, "Error:", error);

    if (error) return res.status(400).json(error);

    res.json({
      message: "Score added",
      score: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SCORES
exports.getScores = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json(error);

  res.json(data);
};