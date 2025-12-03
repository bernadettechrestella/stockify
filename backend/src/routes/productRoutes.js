// Inisialisasi router Express
const express = require("express");
const router = express.Router();

// Import middleware auth dan controller produk
const auth = require("../middleware/authMiddleware");
const { createProduct, getProducts, updateProduct, deleteProduct, getStats } = require("../controllers/productController");

/**
 * Route untuk membuat produk baru
 * POST /api/product
 * Hanya bisa diakses jika sudah login
 */
router.post("/", auth, createProduct);

/**
 * Route untuk mengambil semua produk
 * GET /api/product
 * Hanya bisa diakses jika sudah login
 */
router.get("/", auth, getProducts);

/**
 * Route untuk update produk
 * PUT /api/product/:id
 * Hanya bisa diakses jika sudah login
 */
router.put("/:id", auth, updateProduct);

/**
 * Route untuk hapus produk
 * DELETE /api/product/:id
 * Hanya bisa diakses jika sudah login
 */
router.delete("/:id", auth, deleteProduct);

/**
 * Route untuk statistik produk/kategori
 * GET /api/product/stats
 * Hanya bisa diakses jika sudah login
 */
router.get("/stats", auth, getStats);

// Ekspor router agar bisa digunakan di app.js
module.exports = router;
