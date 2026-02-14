import { Router } from "express";
import { Reading } from "../models/Reading.js";
import { Meter } from "../models/Meter.js";

export const chartsRouter = Router();

const TARGET_DAILY = 45000;

chartsRouter.get("/daily", async (req, res) => {
  try {
    const days = parseInt(req.query.days, 10) || 7;
    const start = new Date();
    start.setDate(start.getDate() - days);
    start.setHours(0, 0, 0, 0);

    const aggregated = await Reading.aggregate([
      { $match: { timestamp: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          consumption: { $sum: "$consumption" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    const dailyData = aggregated.map((row) => {
      const [y, m, d] = row._id.split("-").map(Number);
      const dateLabel = `${months[m - 1]} ${d}`;
      return { date: dateLabel, consumption: row.consumption, target: TARGET_DAILY };
    });
    res.json(dailyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

chartsRouter.get("/zones", async (req, res) => {
  try {
    const byZone = await Meter.aggregate([
      { $group: { _id: "$zone", consumption: { $sum: "$consumption" }, meters: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const zoneData = byZone.map((row) => ({
      zone: row._id,
      consumption: row.consumption,
      meters: row.meters,
    }));
    res.json(zoneData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
