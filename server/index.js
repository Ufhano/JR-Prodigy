import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(passport.initialize());

// Auth routes (no JWT required)
app.use("/api/auth", authRouter);

// API routes (protected in apiRouter)
app.use("/api", apiRouter);

// Health check
app.get("/health", (_, res) => {
  res.json({ ok: true, message: "JR Prodigy API is running" });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
