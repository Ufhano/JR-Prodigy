import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false }, // optional for Google-only users
    name: { type: String, default: "" },
    googleId: { type: String, sparse: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
