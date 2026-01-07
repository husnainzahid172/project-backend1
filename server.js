require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Enable JSON parsing
app.use(express.json());

// CORS settings: allow your frontend
app.use(
  cors({
    origin: [
      "https://project-frontend-beige-six.vercel.app", 
      "http://localhost:9002",
      "http://localhost:3000"
    ], // add your Vercel frontend URL and local dev
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/expenses", expenseRoutes);

// Default health check
app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Backend is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
