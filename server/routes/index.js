import { Router } from "express";
import { authMiddleware } from "../config/auth.js";
import { statsRouter } from "./stats.js";
import { metersRouter } from "./meters.js";
import { readingsRouter } from "./readings.js";
import { alertsRouter } from "./alerts.js";
import { chartsRouter } from "./charts.js";

export const apiRouter = Router();

apiRouter.get("/", (_, res) => {
  res.json({
    message: "JR Prodigy API",
    version: "1.0",
    endpoints: {
      health: "GET /health",
      "auth/register": "POST /api/auth/register",
      "auth/login": "POST /api/auth/login",
      "auth/google": "GET /api/auth/google",
      stats: "GET /api/stats",
      meters: "GET /api/meters",
      readings: "GET /api/readings",
      alerts: "GET /api/alerts",
      "charts/daily": "GET /api/charts/daily?days=7",
      "charts/zones": "GET /api/charts/zones",
    },
  });
});

// All dashboard data requires auth
apiRouter.use(authMiddleware);
apiRouter.use("/stats", statsRouter);
apiRouter.use("/meters", metersRouter);
apiRouter.use("/readings", readingsRouter);
apiRouter.use("/alerts", alertsRouter);
apiRouter.use("/charts", chartsRouter);
