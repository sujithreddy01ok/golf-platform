import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");

  const getScores = async () => {
    const res = await API.get("/scores");
    setScores(res.data);
  };

  const addScore = async () => {
    try {
      await API.post("/scores", { score: Number(newScore) });
      setNewScore("");
      getScores();
    } catch (err) {
      alert("Error adding score");
    }
  };

  useEffect(() => {
    getScores();
  }, []);

 return (
  <div className="container">
    <div className="card">
      <h2>Dashboard</h2>

      <h3>Add Score</h3>
      <input
        type="number"
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />
      <button onClick={addScore}>Add</button>

      <h3>Your Scores</h3>
      {scores.map((s) => (
        <p key={s.id}>{s.score}</p>
      ))}
    </div>
  </div>
);
}