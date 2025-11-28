import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/productSlice";
import { useTheme, useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import useCategories from "../api/useCategories";
import { useAuth } from "../context/AuthContext";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ProductTableTemplate from "./templates/ProductTableTemplate";

export default function ProductTable() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const categories = useCategories();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { token, loading: authLoading } = useAuth();
  const [editCategoryId, setEditCategoryId] = useState("");

  const {
    items: rows,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (!authLoading && token) {
      dispatch(fetchProducts({ search, category: categoryId }));
    }
  }, [dispatch, search, categoryId, authLoading, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAdd = async () => {
    if (!name || !stock || !price || !categoryId) {
      return toast.error("All fields are required!");
    }
    try {
      await dispatch(
        addProduct({
          name,
          stock: Number(stock),
          price: Number(price),
          category_id: Number(categoryId),
        })
      ).unwrap();
      toast.success("Product added successfully");
      setOpen(false);
      dispatch(fetchProducts({ search, category: categoryId }));
    } catch (err) {
      toast.error(err || "Failed to add product");
    }
  };

  const handleEditOpen = (row) => {
    setEditId(row.id);
    setName(row.name);
    setStock(row.stock);
    setPrice(row.price);
    setEditCategoryId(row.category_id);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!name || !stock || !price || !editCategoryId) {
      return toast.error("All fields are required!");
    }
    try {
      await dispatch(
        updateProduct({
          id: editId,
          product: {
            name,
            stock: Number(stock),
            price: Number(price),
            category_id: Number(editCategoryId),
          },
        })
      ).unwrap();
      toast.success("Product updated successfully");
      setEditOpen(false);
      dispatch(fetchProducts({ search, category: categoryId }));
    } catch (err) {
      setEditOpen(true);
      toast.error(err || "Failed to update product");
    }
  };

  const handleDeleteConfirmOpen = (row) => {
    setDeleteId(row.id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      setDeleteOpen(false);
      dispatch(fetchProducts({ search, category: categoryId }));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete product");
    }
  };

  return (
    <ProductTableTemplate
      theme={theme}
      isMobile={isMobile}
      loading={loading}
      authLoading={authLoading}
      rows={rows}
      categories={categories}
      search={search}
      setSearch={setSearch}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      open={open}
      setOpen={setOpen}
      name={name}
      setName={setName}
      stock={stock}
      setStock={setStock}
      price={price}
      setPrice={setPrice}
      handleAdd={handleAdd}
      editOpen={editOpen}
      setEditOpen={setEditOpen}
      handleUpdate={handleUpdate}
      editId={editId}
      editCategoryId={editCategoryId}
      setEditCategoryId={setEditCategoryId}
      handleEditOpen={handleEditOpen}
      deleteOpen={deleteOpen}
      setDeleteOpen={setDeleteOpen}
      handleDelete={handleDelete}
      handleDeleteConfirmOpen={handleDeleteConfirmOpen}
      fetchProducts={fetchProducts}
    />
  );
}
