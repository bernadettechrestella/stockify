import { createSlice } from '@reduxjs/toolkit';
import { productAsyncActions } from './asyncAction';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productAsyncActions.fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productAsyncActions.fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(productAsyncActions.fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
