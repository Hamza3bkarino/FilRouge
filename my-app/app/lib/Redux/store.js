import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./programSlice";
import productReducer from "./productSlice";
import notificationReducer from "./NotificationSlice";
import CartProgramReducer from './cartProgramSlice';
import cartProductReducer from './cartProductSlice';

export const store = configureStore({
  reducer: {
    programs: programReducer,
    products: productReducer,
    notifications: notificationReducer,
    cartProgram: CartProgramReducer,
    cartProduct : cartProductReducer,
  },
});

export default store;
