import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "darkmood",
  initialState: {
    value: "null",
  },
  initialState2: {
    value2: "null",
  },
  reducers: {
    activeChat: (state, action) => {
      state.value = action.payload;
    },
    darkmood: (state, action) => {
      state.value2 = action.payload;
    },
  },
});

export const { activeChat, darkmood } = activeChatSlice.actions;

export default activeChatSlice.reducer;
