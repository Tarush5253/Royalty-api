import express from "express";
import cors from "cors";

import authorsRoutes from "./routes/authors.routes.js";
import withdrawalsRoutes from "./routes/withdrawals.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/authors", authorsRoutes);
app.use("/withdrawals", withdrawalsRoutes);

app.get("/", (req, res) => {
  res.send("Royalty API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});