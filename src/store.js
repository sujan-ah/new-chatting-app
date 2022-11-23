import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "./slices/activeChat.js";

export default configureStore({
  reducer: {
    activeChat: activeChatSlice,
  },
});
