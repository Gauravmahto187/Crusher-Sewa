import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { ensureAdminSeed } from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Core middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Crusher Material Sewa" });
});

// Routes
app.use("/api/auth", authRoutes);

// Start server after DB connects
const start = async () => {
  try {
    await connectDB();
    try {
      const result = await ensureAdminSeed();
      console.log(`Admin seed ${result}`);
    } catch (seedErr) {
      console.error("Admin seed failed:", seedErr);
    }
    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

// Only start if not under test
if (process.env.NODE_ENV !== "test") {
  start();
}

export { app };
