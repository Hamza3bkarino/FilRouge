import { createSlice, nanoid } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
  },
  reducers: {
    addNotification(state, action) {
      state.items.unshift({
        id: nanoid(),
        ...action.payload,
        read: false,
        createdAt: new Date().toISOString(),
      });
    },

    markAsRead(state, action) {
      const notification = state.items.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },

    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
