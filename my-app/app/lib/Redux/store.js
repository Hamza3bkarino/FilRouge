import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./programSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    programs: programReducer,
    products: productReducer,

  },
});

export default store;
