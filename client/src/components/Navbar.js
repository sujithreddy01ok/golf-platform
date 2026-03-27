import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#111827",
        color: "white",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/charity">Charity</Link>
        <Link to="/draw">Draw</Link>
      </div>

      {/* RIGHT SIDE */}
      <div>
        {!token ? (
          <Link to="/">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}