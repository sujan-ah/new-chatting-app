import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: "sujan",
  },
  reducers: {
    activeChat: (state) => {
      console.log(state);
    },
  },
});

export const { activeChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
