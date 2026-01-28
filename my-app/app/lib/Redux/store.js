import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./programSlice";
import productReducer from "./productSlice";
import notificationReducer from "./NotificationSlice";
import CartProgramReducer from './cartProgramSlice';

export const store = configureStore({
  reducer: {
    programs: programReducer,
    products: productReducer,
    notifications: notificationReducer,
    cartProgram: CartProgramReducer
  },
});

export default store;
