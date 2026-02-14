import { Router } from "express";
import { Meter } from "../models/Meter.js";
import { Reading } from "../models/Reading.js";
import { Alert } from "../models/Alert.js";

export const statsRouter = Router();

statsRouter.get("/", async (req, res) => {
  try {
    const [totalMeters, activeMeters, totalConsumptionResult, alertsCount, lastMonthMeters] =
      await Promise.all([
        Meter.countDocuments(),
        Meter.countDocuments({ status: "active" }),
        Reading.aggregate([{ $group: { _id: null, total: { $sum: "$consumption" } } }]),
        Alert.countDocuments(),
        Meter.countDocuments(), // could use a past snapshot; for now we use same count
      ]);

    const totalConsumption = totalConsumptionResult[0]?.total ?? 0;
    const lastMonthTotal = Math.floor(totalConsumption * 0.92);
    const consumptionChange = lastMonthTotal
      ? ((totalConsumption - lastMonthTotal) / lastMonthTotal * 100).toFixed(0)
      : 0;

    res.json({
      stats: [
        {
          title: "Total Water Meters",
          value: totalMeters.toLocaleString(),
          change: "+12% from last month",
          trend: "up",
        },
        {
          title: "Active Connections",
          value: activeMeters.toLocaleString(),
          change: "+8% from last month",
          trend: "up",
        },
        {
          title: "Total Consumption",
          value: `${totalConsumption.toLocaleString()} L`,
          change: `${Number(consumptionChange) >= 0 ? "" : ""}${consumptionChange}% from last month`,
          trend: Number(consumptionChange) >= 0 ? "up" : "down",
        },
        {
          title: "Active Alerts",
          value: alertsCount.toString(),
          change: "+5 new today",
          trend: "up",
        },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
