// Inisialisasi router Express
const express = require("express");
const router = express.Router();

// Import controller untuk autentikasi
const authController = require("../controllers/authController");

/**
 * Route untuk register user baru
 * POST /api/auth/register
 */
router.post("/register", authController.register);

/**
 * Route untuk login user
 * POST /api/auth/login
 */
router.post("/login", authController.login);

/**
 * Route untuk logout user
 * POST /api/auth/logout
 */
router.post("/logout", authController.logout);

/**
 * Route untuk refresh token
 * POST /api/auth/refresh
 */
router.post("/refresh", authController.refresh);

// Ekspor router agar bisa digunakan di app.js
module.exports = router;
