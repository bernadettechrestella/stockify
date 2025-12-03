/**
 * Fungsi pembungkus untuk menangani error pada async/await di Express
 * - Menerima fungsi async (controller/middleware)
 * - Jika terjadi error, langsung diteruskan ke error middleware
 *
 * @param {Function} fn - Fungsi async yang akan dibungkus
 * @returns {Function} Middleware Express yang sudah aman dari error async
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        // Jalankan fungsi async dan tangkap error
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Ekspor asyncHandler agar bisa digunakan di controller
module.exports = asyncHandler;