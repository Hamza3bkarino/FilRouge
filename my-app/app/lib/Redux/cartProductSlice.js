import { createSlice } from "@reduxjs/toolkit";



const cartProduct = createSlice({
  name: "cart-product",
  initialState: {
    items: [],
  },
  reducers: {
    addToCartProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (p) => p.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeFromCartProduct: (state, action) => {
      state.items = state.items.filter(
        (p) => p.id !== action.payload
      );
    },

    increaseProductQuantity: (state, action) => {
      const item = state.items.find(
        (p) => p.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseProductQuantity: (state, action) => {
      const item = state.items.find(
        (p) => p.id === action.payload
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (p) => p.id !== action.payload
          );
        }
      }
    },

    clearCartProducts: (state) => {
      state.items = [];
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
