import { Router } from "express";
import { Reading } from "../models/Reading.js";
import { formatTimestamp } from "../utils/timeAgo.js";

export const readingsRouter = Router();

readingsRouter.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const readings = await Reading.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();
    const list = readings.map((r) => ({
      meterId: r.meterId,
      location: r.location,
      timestamp: formatTimestamp(r.timestamp),
      consumption: r.consumption,
      flowRate: r.flowRate,
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
