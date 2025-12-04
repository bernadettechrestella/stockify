const mysql = require("mysql2");
const path = require("path");

require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "../../.env.production")
      : path.resolve(__dirname, "../../.env.local"),
});

const isProduction = process.env.NODE_ENV === "production";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db.promise();
