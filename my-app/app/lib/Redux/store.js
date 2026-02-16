import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./programSlice";
import productReducer from "./productSlice";
import notificationReducer from "./NotificationSlice";
import CartProgramReducer from './cartProgramSlice';
import cartProductReducer from './cartProductSlice';
import wishListReducer from './wishListSlice';
import OrdersReducers from './orderSlice';

export const store = configureStore({
  reducer: {
    programs: programReducer,
    products: productReducer,
    notifications: notificationReducer,
    cartProgram: CartProgramReducer,
    cartProduct : cartProductReducer,
    wishList : wishListReducer,
    orders : OrdersReducers,
  },
});

export default store;
