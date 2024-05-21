import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentMusic: [],
};
export const recentSlice = createSlice({
  name: "recentSlice",
  initialState: initialState,
  reducers: {
    setRecentMusic(state, action) {
      state.recentMusic = action.payload;
    },
  },
});

export const { setRecentMusic } = recentSlice.actions;
