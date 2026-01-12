import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./programSlice";
import productReducer from "./productSlice";
import notificationReducer from "./NotificationSlice";

export const store = configureStore({
  reducer: {
    programs: programReducer,
    products: productReducer,
    notifications: notificationReducer,

  },
});

export default store;
