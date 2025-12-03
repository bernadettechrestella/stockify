
const { success, error } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");
const dbQuery = require("../utils/dbQuery");

// CREATE PRODUCT
// Fungsi untuk membuat produk baru
// 1. Validasi input
// 2. Cek apakah nama produk sudah ada
// 3. Simpan produk ke database
// 4. Response sukses
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, stock, price, category_id } = req.body;
  if (!name || !stock || !price || !category_id) {
    return error(res, "All fields are required", 400);
  }
  const result = await dbQuery("SELECT name FROM products WHERE name = ?", [name]);
  if (result.length > 0) {
    return error(res, "Product name already exists", 409);
  }
  await dbQuery("INSERT INTO products (name, stock, price, category_id) VALUES (?, ?, ?, ?)", [name, stock, price, category_id]);
  return success(res, "Product created successfully", null, 201);
});


// Fungsi untuk mengambil semua produk (dengan filter, search, dan pagination)
// 1. Build query sesuai filter/search
// 2. Query produk dari database
// 3. Format data (price jadi number)
// 4. Response data produk
exports.getProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  let query = `
    SELECT 
      (@row_number:=@row_number + 1) AS no,
      p.*, 
      c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id,
    (SELECT @row_number:=0) AS t
  `;
  const params = [];
  if (category) {
    query += " WHERE p.category_id = ?";
    params.push(category);
  }
  if (search) {
    if (params.length > 0) query += " AND p.name LIKE ?";
    else query += " WHERE p.name LIKE ?";
    params.push(`%${search}%`);
  }
  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));
  const results = await dbQuery(query, params);
  const formatted = results.map(row => ({
    ...row,
    price: row.price !== undefined ? Number(row.price) : row.price
  }));
  return success(res, "Products fetched successfully", formatted);
});

// Fungsi untuk update produk
// 1. Validasi input
// 2. Cek kategori dan produk ada
// 3. Update produk di database
// 4. Response sukses
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, stock, price, category_id } = req.body;
  if (!name || !stock || !price || !category_id) {
    return error(res, "All fields are required", 400);
  }
  if (stock < 0 || price < 0) {
    return error(res, "Stock and price must be >= 0", 400);
  }
  const category = await dbQuery("SELECT id FROM categories WHERE id = ?", [category_id]);
  if (category.length === 0) return error(res, "Category not found", 404);
  const product = await dbQuery("SELECT id FROM products WHERE id = ?", [id]);
  if (product.length === 0) return error(res, "Product not found", 404);
  await dbQuery(
    "UPDATE products SET name = ?, stock = ?, price = ?, category_id = ? WHERE id = ?",
    [name, stock, price, category_id, id]
  );
  return success(res, "Product updated successfully");
});

// Fungsi untuk hapus produk
// 1. Cek produk ada
// 2. Cek stok harus 0
// 3. Hapus produk dari database
// 4. Response sukses
exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await dbQuery("SELECT stock FROM products WHERE id = ?", [id]);
  if (product.length === 0) return error(res, "Product not found", 404);
  if (product[0].stock > 0) {
    return error(res, "Cannot delete product with stock greater than 0. Reduce stock first.", 400);
  }
  await dbQuery("DELETE FROM products WHERE id = ?", [id]);
  return success(res, "Product deleted successfully");
});
// Fungsi untuk mengambil statistik produk/kategori
// 1. Query total produk, kategori, dan produk stok rendah
// 2. Response data statistik
exports.getStats = asyncHandler(async (req, res) => {
  const queries = {
    totalProducts: "SELECT COUNT(*) AS total FROM products",
    totalCategories: "SELECT COUNT(*) AS total FROM categories",
    lowStock: "SELECT COUNT(*) AS total FROM products WHERE stock < 10"
  };
  let results = {};
  for (const key of Object.keys(queries)) {
    const data = await dbQuery(queries[key], []);
    results[key] = data[0].total;
  }
  return success(res, "Stats fetched successfully", results);
});


