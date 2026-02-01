require("dotenv").config();

const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/lead.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recap Reels Backend is running 🚀");
});

app.use("/api/lead", leadRoutes);

const { server } = require("./config");
const PORT = server.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
