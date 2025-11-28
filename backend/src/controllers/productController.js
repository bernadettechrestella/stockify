const db = require("../config/db");

// CREATE PRODUCT
exports.createProduct = (req, res) => {
  const { name, stock, price, category_id } = req.body;

  if (!name || !stock || !price || !category_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check duplicate product name
  db.query("SELECT name FROM products WHERE name = ?", [name], (err, result) => {
    if (err) return res.status(500).json({ message: err });

    if (result.length > 0) {
      return res.status(409).json({ message: "Product name already exists" });
    }

    // Insert product if no duplicate
    db.query(
      "INSERT INTO products (name, stock, price, category_id) VALUES (?, ?, ?, ?)",
      [name, stock, price, category_id],
      (err) => {
        if (err) return res.status(500).json({ message: err });
        return res.status(201).json({ message: "Product created successfully" });
      }
    );
  });
};


// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
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

  // Filtering by category
  if (category) {
    query += " WHERE p.category_id = ?";
    params.push(category);
  }

  // Searching by name
  if (search) {
    if (params.length > 0) query += " AND p.name LIKE ?";
    else query += " WHERE p.name LIKE ?";
    params.push(`%${search}%`);
  }

  // Pagination
  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: err });
    // pastikan price selalu number
    const formatted = results.map(row => ({
      ...row,
      price: row.price !== undefined ? Number(row.price) : row.price
    }));
    return res.status(200).json(formatted);
  });
};

// UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, stock, price, category_id } = req.body;

  if (!name || !stock || !price || !category_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (stock < 0 || price < 0) {
    return res.status(400).json({ message: "Stock and price must be >= 0" });
  }

  // Check if category exists
  db.query("SELECT id FROM categories WHERE id = ?", [category_id], (err, category) => {
    if (err) return res.status(500).json({ message: err });
    if (category.length === 0) return res.status(404).json({ message: "Category not found" });

    // Check if product exists
    db.query("SELECT id FROM products WHERE id = ?", [id], (err, product) => {
      if (err) return res.status(500).json({ message: err });
      if (product.length === 0) return res.status(404).json({ message: "Product not found" });

      // Update product
      db.query(
        "UPDATE products SET name = ?, stock = ?, price = ?, category_id = ? WHERE id = ?",
        [name, stock, price, category_id, id],
        (err) => {
          if (err) return res.status(500).json({ message: err });
          return res.status(200).json({ message: "Product updated successfully" });
        }
      );
    });
  });
};

// DELETE PRODUCT (Only when stock = 0)
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  // Check if product exists
  db.query("SELECT stock FROM products WHERE id = ?", [id], (err, product) => {
    if (err) return res.status(500).json({ message: err });
    if (product.length === 0) return res.status(404).json({ message: "Product not found" });

    // Check stock condition
    if (product[0].stock > 0) {
      return res.status(400).json({
        message: "Cannot delete product with stock greater than 0. Reduce stock first."
      });
    }

    // OK to delete
    db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json({ message: "Product deleted successfully" });
    });
  });
};

exports.getStats = (req, res) => {
  const queries = {
    totalProducts: "SELECT COUNT(*) AS total FROM products",
    totalCategories: "SELECT COUNT(*) AS total FROM categories",
    lowStock: "SELECT COUNT(*) AS total FROM products WHERE stock < 10"
  };

  let results = {};
  let completed = 0;
  const keys = Object.keys(queries);

  keys.forEach((key) => {
    db.query(queries[key], (err, data) => {
      if (err) return res.status(500).json({ message: err });

      results[key] = data[0].total;
      completed++;

      if (completed === keys.length) {
        res.status(200).json(results);
      }
    });
  });
};


