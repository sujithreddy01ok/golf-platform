import { useEffect, useState } from "react";
import API from "../services/api";

export default function Charity() {
  const [charities, setCharities] = useState([]);

  const getCharities = async () => {
    const res = await API.get("/charities");
    setCharities(res.data);
  };

  const selectCharity = async (id) => {
    await API.post("/charities/select", {
      charity_id: id,
      percentage: 15,
    });
    alert("Charity selected");
  };

  useEffect(() => {
    getCharities();
  }, []);

  return (
    <div>
      <h2>Select Charity</h2>
      {charities.map((c) => (
        <div key={c.id}>
          <p>{c.name}</p>
          <button onClick={() => selectCharity(c.id)}>Select</button>
        </div>
      ))}
    </div>
  );
}