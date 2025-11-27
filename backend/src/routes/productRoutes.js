const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createProduct, getProducts, updateProduct, deleteProduct, getStats } = require("../controllers/productController");

router.post("/", auth, createProduct);
router.get("/", auth, getProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.get("/stats", auth, getStats);

module.exports = router;
