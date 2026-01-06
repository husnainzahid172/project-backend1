require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// CORS for Vercel frontend
app.use(
  cors({
    origin: ["https://project-frontend-beige-six.vercel.app"], 
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MongoDB URI is missing. Please set MONGO_URI in your .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Routes
app.use("/api/expenses", expenseRoutes);

// Health check
app.get("/", (req, res) => {
  res.send({ status: "OK", message: "Backend is running" });
});

// Listen on all interfaces
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
