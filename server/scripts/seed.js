import "dotenv/config";
import mongoose from "mongoose";
import { Meter } from "../models/Meter.js";
import { Reading } from "../models/Reading.js";
import { Alert } from "../models/Alert.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jr-prodigy";

const METERS = [
  { meterId: "WM-1001", location: "Building A - Floor 3", zone: "Zone A", status: "active" },
  { meterId: "WM-1002", location: "Building B - Floor 1", zone: "Zone B", status: "active" },
  { meterId: "WM-1003", location: "Building C - Floor 2", zone: "Zone C", status: "warning" },
  { meterId: "WM-1004", location: "Building A - Floor 1", zone: "Zone A", status: "active" },
  { meterId: "WM-1005", location: "Building D - Floor 4", zone: "Zone D", status: "offline" },
  { meterId: "WM-1006", location: "Building B - Floor 3", zone: "Zone B", status: "active" },
  { meterId: "WM-1007", location: "Building C - Floor 1", zone: "Zone C", status: "warning" },
  { meterId: "WM-1008", location: "Building E - Floor 2", zone: "Zone D", status: "active" },
  { meterId: "WM-1009", location: "Building A - Floor 2", zone: "Zone A", status: "active" },
  { meterId: "WM-1010", location: "Building B - Floor 2", zone: "Zone B", status: "active" },
  { meterId: "WM-1011", location: "Building C - Floor 3", zone: "Zone C", status: "active" },
  { meterId: "WM-1012", location: "Building D - Floor 1", zone: "Zone D", status: "warning" },
];

const ALERTS_DATA = [
  { type: "critical", message: "Abnormal flow rate detected", meter: "WM-1005" },
  { type: "warning", message: "High consumption threshold reached", meter: "WM-1007" },
  { type: "info", message: "Scheduled maintenance required", meter: "WM-1003" },
  { type: "critical", message: "Connection lost", meter: "WM-1005" },
  { type: "warning", message: "Battery low", meter: "WM-1012" },
  { type: "info", message: "Firmware update available", meter: "WM-1001" },
];

function addMinutes(d, minutes) {
  return new Date(d.getTime() + minutes * 60000);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    if (err.name === "MongooseServerSelectionError" || err.cause?.code === "ECONNREFUSED") {
      console.error("\n❌ Cannot connect to MongoDB at " + (MONGO_URI.replace(/\/\/.*@/, "//***@")) + "\n");
      console.error("MongoDB is not running or not reachable. Choose one:\n");
      console.error("  A) Use MongoDB Atlas (free cloud):");
      console.error("     1. Go to https://www.mongodb.com/cloud/atlas");
      console.error("     2. Create a free cluster and get a connection string");
      console.error("     3. Create server/.env with: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/jr-prodigy\n");
      console.error("  B) Run MongoDB locally:");
      console.error("     - Install from https://www.mongodb.com/try/download/community");
      console.error("     - Start the MongoDB service, then run: npm run seed\n");
      process.exit(1);
    }
    throw err;
  }
  console.log("Connected to MongoDB");

  await Reading.deleteMany({});
  await Alert.deleteMany({});
  await Meter.deleteMany({});

  const inserted = await Meter.insertMany(METERS);
  const meterById = Object.fromEntries(inserted.map((m) => [m.meterId, m]));

  const now = new Date();
  const readings = [];
  const consumptionByMeter = {
    "WM-1001": 1245, "WM-1002": 987, "WM-1003": 2134, "WM-1004": 765,
    "WM-1005": 0, "WM-1006": 1543, "WM-1007": 3241, "WM-1008": 892,
    "WM-1009": 1100, "WM-1010": 1300, "WM-1011": 980, "WM-1012": 2100,
  };

  for (const m of inserted) {
    const baseConsumption = consumptionByMeter[m.meterId] ?? 1000;
    const lastReadingAt = m.status === "offline"
      ? addMinutes(now, -60 * 24 * 2)
      : addMinutes(now, -Math.floor(Math.random() * 60));
    const lastReading = {
      meter: m._id,
      meterId: m.meterId,
      location: m.location,
      timestamp: lastReadingAt,
      consumption: baseConsumption,
      flowRate: Math.round((Math.random() * 10 + 5) * 10) / 10,
    };
    readings.push(lastReading);

    for (let day = 1; day <= 7; day++) {
      const dayStart = new Date(now);
      dayStart.setDate(dayStart.getDate() - day);
      dayStart.setHours(0, 0, 0, 0);
      const dailyConsumption = Math.floor(baseConsumption * 0.3 + Math.random() * 5000);
      readings.push({
        meter: m._id,
        meterId: m.meterId,
        location: m.location,
        timestamp: addMinutes(dayStart, 9 * 60 + 30),
        consumption: dailyConsumption,
        flowRate: Math.round((Math.random() * 8 + 6) * 10) / 10,
      });
    }
  }

  await Reading.insertMany(readings);

  for (const meter of inserted) {
    const latest = await Reading.findOne({ meter: meter._id }).sort({ timestamp: -1 });
    if (latest) {
      await Meter.updateOne(
        { _id: meter._id },
        { $set: { lastReadingAt: latest.timestamp, consumption: latest.consumption } }
      );
    }
  }

  const alertDocs = ALERTS_DATA.map((a, i) => ({
    ...a,
    createdAt: addMinutes(now, -[5, 15, 60, 120, 180, 300][i] ?? -60),
  }));
  await Alert.insertMany(alertDocs);

  console.log("Seed done: meters", inserted.length, "readings", readings.length, "alerts", alertDocs.length);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
