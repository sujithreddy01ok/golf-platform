const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const subRoutes = require("./routes/subscription");
app.use("/api/subscription", subRoutes);

const scoreRoutes = require("./routes/scores");
app.use("/api/scores", scoreRoutes);

const charityRoutes = require("./routes/charity");
app.use("/api/charities", charityRoutes);

const drawRoutes = require("./routes/draw");
app.use("/api/draw", drawRoutes);