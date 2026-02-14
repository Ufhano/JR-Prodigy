import mongoose from "mongoose";

const meterSchema = new mongoose.Schema(
  {
    meterId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    zone: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "warning", "offline"],
      default: "active",
    },
    lastReadingAt: { type: Date, default: null },
    consumption: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Meter = mongoose.model("Meter", meterSchema);
