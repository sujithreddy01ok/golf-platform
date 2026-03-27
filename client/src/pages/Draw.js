import { useState } from "react";
import API from "../services/api";

export default function Draw() {
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    try {
      const res = await API.get("/draw/run");
      setResult(res.data);
    } catch (err) {
      alert("Error running draw");
    }
  };

  const userId = localStorage.getItem("userId");

  return (
  <div className="container">
    <div className="card">
      <h2>Draw</h2>

      <button onClick={runDraw}>Run Draw</button>

      {result && (
        <>
          <h3>Numbers</h3>
          <p>{result.drawNumbers.join(", ")}</p>

          <h3>Winners</h3>
          <p>Match 5: {result.winners.match5.length}</p>
          <p>Match 4: {result.winners.match4.length}</p>
          <p>Match 3: {result.winners.match3.length}</p>

          <h3>Prize</h3>
          <p>₹ {result.prize.match5}</p>
        </>
      )}
    </div>
  </div>
);
}