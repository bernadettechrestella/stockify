const db = require("../config/db");

// CREATE CATEGORY
exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Category name required" });

  db.query("SELECT name FROM categories WHERE name = ?", [name], (err, results) => {
    if (err) return res.status(500).json({ message: err });
    if (results.length > 0) return res.status(409).json({ message: "Category already exists" });

    db.query("INSERT INTO categories (name) VALUES (?)", [name], (err) => {
      if (err) return res.status(500).json({ message: err });
      return res.status(201).json({ message: "Category created successfully" });
    });
  });
};

// GET ALL CATEGORIES
exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: err });
    return res.status(200).json(results);
  });
};

// UPDATE CATEGORY
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Category name required" });

  db.query("SELECT id FROM categories WHERE id = ?", [id], (err, category) => {
    if (err) return res.status(500).json({ message: err });
    if (category.length === 0) return res.status(404).json({ message: "Category not found" });

    db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err) => {
      if (err) return res.status(500).json({ message: err });
      return res.status(200).json({ message: "Category updated successfully" });
    });
  });
};

// DELETE CATEGORY
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  // Check if category exists
  db.query("SELECT id FROM categories WHERE id = ?", [id], (err, category) => {
    if (err) return res.status(500).json({ message: err });
    if (category.length === 0) return res.status(404).json({ message: "Category not found" });

    // Check if category is being used by products
    db.query("SELECT COUNT(*) AS total FROM products WHERE category_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ message: err });

      if (result[0].total > 0) {
        return res.status(400).json({
          message: `Cannot delete category. It is being used by ${result[0].total} product(s).`
        });
      }

      // Delete category
      db.query("DELETE FROM categories WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: err });
        return res.status(200).json({ message: "Category deleted successfully" });
      });
    });
  });
};

