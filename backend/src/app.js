const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const allowedOrigins = [
    "http://localhost:5173", // sesuaikan dengan frontend URL
    "https://stockify-lac.vercel.app" //URL production frontend
];


// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // <--- penting agar cookie bisa dikirim
}));
app.use(express.json());
app.use(cookieParser());

// Routes Import
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
