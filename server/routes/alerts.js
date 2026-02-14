import { Router } from "express";
import { Alert } from "../models/Alert.js";
import { timeAgo } from "../utils/timeAgo.js";

export const alertsRouter = Router();

alertsRouter.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(limit).lean();
    const list = alerts.map((a) => ({
      id: a._id.toString(),
      type: a.type,
      message: a.message,
      meter: a.meter,
      time: timeAgo(a.createdAt),
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
