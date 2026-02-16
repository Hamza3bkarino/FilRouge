import { createSlice } from "@reduxjs/toolkit";

// Load orders from localStorage if available
const savedOrders = typeof window !== "undefined" 
  ? JSON.parse(localStorage.getItem("orders") || "[]") 
  : [];

const initialState = {
  items: savedOrders, // all orders
};

const Orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.items));
    },
    removeOrder: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
      localStorage.setItem("orders", JSON.stringify(state.items));
    },
    clearOrders: (state) => {
      state.items = [];
      localStorage.removeItem("orders");
    },
  },
});

export const { addOrder, removeOrder, clearOrders } = Orders.actions;
export default Orders.reducer;
