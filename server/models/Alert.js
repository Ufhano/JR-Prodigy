import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["critical", "warning", "info"],
      required: true,
    },
    message: { type: String, required: true },
    meter: { type: String, required: true },
  },
  { timestamps: true }
);

alertSchema.index({ createdAt: -1 });

export const Alert = mongoose.model("Alert", alertSchema);
