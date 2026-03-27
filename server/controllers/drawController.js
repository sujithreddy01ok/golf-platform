const supabase = require("../config/supabase");

const generateDraw = () => {
  const numbers = new Set();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers);
};

exports.runDraw = async (req, res) => {
  try {
    const drawNumbers = generateDraw(); // keep fixed for testing

    const { data: users } = await supabase.from("users").select("*");

    let winners = {
      match5: [],
      match4: [],
      match3: [],
    };

    for (let user of users) {
      const { data: scores } = await supabase
        .from("scores")
        .select("score")
        .eq("user_id", user.id);

      const userScores = scores.map(s => s.score);

      const matches = userScores.filter(s =>
        drawNumbers.includes(s)
      ).length;

      if (matches === 5) winners.match5.push(user.id);
      else if (matches === 4) winners.match4.push(user.id);
      else if (matches === 3) winners.match3.push(user.id);
    }

    // 💰 Prize Pool (example)
    const totalPool = 10000;

    const prize = {
      match5: winners.match5.length
        ? (totalPool * 0.4) / winners.match5.length
        : 0,
      match4: winners.match4.length
        ? (totalPool * 0.35) / winners.match4.length
        : 0,
      match3: winners.match3.length
        ? (totalPool * 0.25) / winners.match3.length
        : 0,
    };

    res.json({
      drawNumbers,
      winners,
      prize,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};