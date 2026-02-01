import { createSlice } from "@reduxjs/toolkit";

/* ---------- helpers (SSR safe) ---------- */
const loadWishlist = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Wishlist load error", err);
    return [];
  }
};

const saveWishlist = (items) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Wishlist save error", err);
  }
};

/* ---------- slice ---------- */
const wishList = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(), // 👈 load once
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.find(
        (item) => item.id === product.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.items.push(product);
      }

      saveWishlist(state.items); // 👈 persist
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveWishlist(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlist([]);
    },
  },
});

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishList.actions;

export default wishList.reducer;
