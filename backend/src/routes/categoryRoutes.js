// Inisialisasi router Express
const express = require("express");
const router = express.Router();

// Import middleware auth dan controller kategori
const auth = require("../middleware/authMiddleware");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");

/**
 * Route untuk membuat kategori baru
 * POST /api/category
 * Hanya bisa diakses jika sudah login
 */
router.post("/", auth, createCategory);

/**
 * Route untuk mengambil semua kategori
 * GET /api/category
 * Hanya bisa diakses jika sudah login
 */
router.get("/", auth, getCategories);

/**
 * Route untuk update kategori
 * PUT /api/category/:id
 * Hanya bisa diakses jika sudah login
 */
router.put("/:id", auth, updateCategory);

/**
 * Route untuk hapus kategori
 * DELETE /api/category/:id
 * Hanya bisa diakses jika sudah login
 */
router.delete("/:id", auth, deleteCategory);

// Ekspor router agar bisa digunakan di app.js
module.exports = router;
