import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "../service/productService";

const productSVC = new ProductService();

export const productAsyncActions = {
  fetchProducts: createAsyncThunk('products/fetchProducts', async ({ search, category }) => {
    return await productSVC.fetchProducts(search, category);
  }),
  addProduct: createAsyncThunk('products/addProduct', async (product) => {
    return await productSVC.addProduct(product);
  }),
  updateProduct: createAsyncThunk('products/updateProduct', async ({ id, product }) => {
    return await productSVC.updateProduct(id, product);
  }),
  deleteProduct: createAsyncThunk('products/deleteProduct', async (id) => {
    return await productSVC.deleteProduct(id);
  }),
};
