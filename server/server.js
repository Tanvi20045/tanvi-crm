require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* ======================
   DB CONNECTION + SERVER START
====================== */
const startServer = async () => {
  try {
    await connectDB();

    console.log("✅ MongoDB Connected");

    /* ======================
       TEST ROUTE
    ====================== */
    app.get("/test-db", (req, res) => {
      const state = mongoose.connection.readyState;

      res.json({
        success: state === 1,
        message: state === 1
          ? "MongoDB Connected ✅"
          : "MongoDB NOT Connected ❌",
        state
      });
    });

    /* ======================
       ROUTES
    ====================== */
    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/leads", require("./routes/leadRoutes"));
    app.use("/properties", require("./routes/propertyRoutes"));

    /* ======================
       START SERVER (IMPORTANT FIX)
    ====================== */
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();