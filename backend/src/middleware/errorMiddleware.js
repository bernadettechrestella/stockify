// Import helper untuk response error
const { error } = require("../utils/response");

/**
 * Middleware untuk menangani error secara terpusat
 * - Menangkap error dari middleware/fungsi lain
 * - Log error ke console
 * - Kirim response error ke client dengan status dan pesan
 *
 * @param {Error} err - Error object yang dilempar dari asyncHandler/controller
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {Function} next - Next middleware
 */
const errorMiddleware = (err, req, res, next) => {
    // Log error ke console untuk debugging
    console.error("ERROR:", err);

    // Ambil status dan pesan error, default 500 jika tidak ada
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Kirim response error ke client
    return error(res, message, status, err.errors || null);
};

// Ekspor middleware agar bisa digunakan di app.js
module.exports = errorMiddleware;