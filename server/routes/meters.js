import { Router } from "express";
import { Meter } from "../models/Meter.js";
import { timeAgo } from "../utils/timeAgo.js";

export const metersRouter = Router();

metersRouter.get("/", async (req, res) => {
  try {
    const meters = await Meter.find().sort({ meterId: 1 }).lean();
    const list = meters.map((m) => ({
      id: m.meterId,
      location: m.location,
      status: m.status,
      lastReading: m.lastReadingAt ? timeAgo(m.lastReadingAt) : "—",
      consumption: m.consumption ?? 0,
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
