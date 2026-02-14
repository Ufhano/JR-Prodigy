import { Router } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";
import { signToken, verifyToken } from "../config/auth.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

export const authRouter = Router();

// ----- Passport Google config (only if credentials set) -----
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.API_URL || "http://localhost:5000"}/api/auth/google/callback`,
      },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || "";
        const googleId = profile.id;
        if (!email) return done(new Error("No email from Google"), null);
        let user = await User.findOne({ googleId });
        if (!user) user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ email, name, googleId });
        } else if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
  );
}

// ----- Register (email + password) -----
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash,
      name: name || "",
    });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- Login (email + password) -----
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- Google OAuth: start -----
authRouter.get("/google", (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(503).json({ error: "Google sign-in is not configured" });
  }
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

// ----- Google OAuth: callback -----
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = signToken(user);
    res.redirect(`${CLIENT_URL}?token=${token}`);
  }
);

// ----- Get current user -----
authRouter.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = await User.findById(payload.userId).lean();
  if (!user) return res.status(401).json({ error: "User not found" });
  res.json({ user: { id: user._id, email: user.email, name: user.name } });
});
