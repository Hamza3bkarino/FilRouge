import { createSlice, nanoid } from "@reduxjs/toolkit";

// Get from localStorage or empty
const getLocal = () => JSON.parse(localStorage.getItem("notifications") || "[]");

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: getLocal(),
  },
  reducers: {
    addNotification(state, action) {
      const newItem = {
        id: nanoid(),
        ...action.payload,
        read: false,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newItem);
      localStorage.setItem("notifications", JSON.stringify(state.items));
    },
    markAsRead(state, action) {
      const notif = state.items.find(n => n.id === action.payload);
      if (notif) notif.read = true;
      localStorage.setItem("notifications", JSON.stringify(state.items));
    },
    clearNotifications(state) {
      state.items = [];
      localStorage.setItem("notifications", JSON.stringify([]));
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
