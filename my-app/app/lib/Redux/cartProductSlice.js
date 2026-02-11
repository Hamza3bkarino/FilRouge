import { createSlice } from "@reduxjs/toolkit";

/* ---------- helpers (SSR safe) ---------- */
const loadCartProduct = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cartProduct");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Cart load error", err);
    return [];
  }
};

const saveCartProduct = (items) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cartProduct", JSON.stringify(items));
  } catch (err) {
    console.error("Cart save error", err);
  }
};

/* ---------- slice ---------- */
const cartProduct = createSlice({
  name: "cart-product",
  initialState: {
    items: loadCartProduct(),
  },
  reducers: {
    addToCartProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartProduct(state.items);
    },

    removeFromCartProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      saveCartProduct(state.items);
    },

    increaseProductQuantity: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) item.quantity += 1;
      saveCartProduct(state.items);
    },

    decreaseProductQuantity: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((p) => p.id !== action.payload);
        }
      }
      saveCartProduct(state.items);
    },

    clearCartProducts: (state) => {
      state.items = [];
      saveCartProduct(state.items);
    },
  },
});

export const {
  addToCartProduct,
  removeFromCartProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearCartProducts,
} = cartProduct.actions;

export default cartProduct.reducer;
