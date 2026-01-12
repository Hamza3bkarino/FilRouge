import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================================
   Async Actions (API)
================================ */
const apiUrlProducts = process.env.NEXT_PUBLIC_API_PRODUCT;
// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(apiUrlProducts);
    return res.data;
  }
);

// Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await axios.post(
      apiUrlProducts,
      product
    );
    return res.data;
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const res = await axios.put(
      `${apiUrlProducts}${product.id}`,
      product
    );
    return res.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${apiUrlProducts}${id}`);
    return id;
  }
);

/* ================================
   Slice
================================ */

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
