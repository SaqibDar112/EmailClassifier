import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportSetup.js";

dotenv.config();
const app = express();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  Warning: GEMINI_API_KEY is missing in your .env file");
} else {
  console.log("✅ Gemini API key loaded successfully");
}

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "emailai_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Email Classifier Backend is running successfully!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} 🚀`);
});
