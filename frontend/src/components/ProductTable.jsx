import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import useCategories from "../api/useCategories";
import { useAuth } from "../context/AuthContext";
import ProductTableTemplate from "./templates/ProductTableTemplate";
import { productAsyncActions } from "../store/asyncAction";

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
  const [categoryFormId, setCategoryFormId] = useState("");

  const {
    items: rows,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (!authLoading && token) {
      dispatch(
        productAsyncActions.fetchProducts({ search, category: categoryId })
      );
    }
  }, [dispatch, search, categoryId, authLoading, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAdd = async () => {
    if (!name || !stock || !price || !categoryFormId) {
      return toast.error("All fields are required!");
    }
    try {
      await dispatch(
        productAsyncActions.addProduct({
          name,
          stock: Number(stock),
          price: Number(price),
          category_id: Number(categoryFormId),
        })
      ).unwrap();
      toast.success("Product added successfully");
      setOpen(false);
      dispatch(
        productAsyncActions.fetchProducts({ search, category: categoryId })
      );
    } catch (err) {
      toast.error(err || "Failed to add product");
    }
  };

  const handleEditOpen = (row) => {
    setEditId(row.id);
    setName(row.name);
    setStock(row.stock);
    setPrice(row.price);
    setCategoryFormId(row.category_id);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!name || !stock || !price || !categoryFormId) {
      return toast.error("All fields are required!");
    }
    try {
      await dispatch(
        productAsyncActions.updateProduct({
          id: editId,
          product: {
            name,
            stock: Number(stock),
            price: Number(price),
            category_id: Number(categoryFormId),
          },
        })
      ).unwrap();
      toast.success("Product updated successfully");
      setEditOpen(false);
      dispatch(
        productAsyncActions.fetchProducts({ search, category: categoryId })
      );
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
      await dispatch(productAsyncActions.deleteProduct(deleteId)).unwrap();
      setDeleteOpen(false);
      dispatch(
        productAsyncActions.fetchProducts({ search, category: categoryId })
      );
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
      categoryFormId={categoryFormId}
      setCategoryFormId={setCategoryFormId}
      handleEditOpen={handleEditOpen}
      deleteOpen={deleteOpen}
      setDeleteOpen={setDeleteOpen}
      handleDelete={handleDelete}
      handleDeleteConfirmOpen={handleDeleteConfirmOpen}
      fetchProducts={productAsyncActions.fetchProducts}
    />
  );
}
