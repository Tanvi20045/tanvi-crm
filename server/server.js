require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());


// 🚀 FIX: wait for DB before starting server
const startServer = async () => {
  try {
    await connectDB();

    app.get('/test-db', (req, res) => {
      const state = mongoose.connection.readyState;

      res.json({
        success: state === 1,
        message: state === 1 ? "MongoDB Connected ✅" : "MongoDB NOT Connected ❌",
        state: state
      });
    });

    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/leads', require('./routes/leadRoutes'));
    app.use('/properties', require('./routes/propertyRoutes'));

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
