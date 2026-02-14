import mongoose from "mongoose";

const readingSchema = new mongoose.Schema(
  {
    meter: { type: mongoose.Schema.Types.ObjectId, ref: "Meter", required: true },
    meterId: { type: String, required: true },
    location: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    consumption: { type: Number, required: true },
    flowRate: { type: Number, required: true },
  },
  { timestamps: true }
);

readingSchema.index({ timestamp: -1 });
readingSchema.index({ meter: 1, timestamp: -1 });

export const Reading = mongoose.model("Reading", readingSchema);
