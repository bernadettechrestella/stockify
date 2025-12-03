const { success, error } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");
const dbQuery = require("../utils/dbQuery");

// CREATE CATEGORY
// Fungsi untuk membuat kategori baru
// 1. Validasi input
// 2. Cek apakah nama kategori sudah ada
// 3. Simpan kategori ke database
// 4. Response sukses
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) return error(res, "Category name required", 400);
  const results = await dbQuery("SELECT name FROM categories WHERE name = ?", [name]);
  if (results.length > 0) return error(res, "Category already exists", 409);
  await dbQuery("INSERT INTO categories (name) VALUES (?)", [name]);
  return success(res, "Category created successfully", null, 201);
});

// GET ALL CATEGORIES
// Fungsi untuk mengambil semua kategori
// 1. Query semua kategori dari database
// 2. Response data kategori
exports.getCategories = asyncHandler(async (req, res) => {
  const results = await dbQuery("SELECT * FROM categories", []);
  return success(res, "Categories fetched successfully", results);
});

// UPDATE CATEGORY
// Fungsi untuk update kategori
// 1. Validasi input
// 2. Cek apakah kategori ada
// 3. Update nama kategori di database
// 4. Response sukses
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return error(res, "Category name required", 400);
  const category = await dbQuery("SELECT id FROM categories WHERE id = ?", [id]);
  if (category.length === 0) return error(res, "Category not found", 404);
  await dbQuery("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
  return success(res, "Category updated successfully");
});

// DELETE CATEGORY
// Fungsi untuk hapus kategori
// 1. Cek apakah kategori ada
// 2. Cek apakah kategori dipakai produk
// 3. Hapus kategori dari database
// 4. Response sukses
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await dbQuery("SELECT id FROM categories WHERE id = ?", [id]);
  if (category.length === 0) return error(res, "Category not found", 404);
  const result = await dbQuery("SELECT COUNT(*) AS total FROM products WHERE category_id = ?", [id]);
  if (result[0].total > 0) {
    return error(res, `Cannot delete category. It is being used by ${result[0].total} product(s).`, 400);
  }
  await dbQuery("DELETE FROM categories WHERE id = ?", [id]);
  return success(res, "Category deleted successfully");
});
