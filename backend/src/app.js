const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const allowedOrigins = [
    "http://localhost:5173", // sesuaikan dengan frontend URL
    "https://stockify-production-1358.up.railway.app", //URL production
];


// Middleware
app.use(cors({
    origin: function (origin, callback) {
        callback(null, allowedOrigins.includes(origin) || !origin);
    },
    credentials: true,
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
