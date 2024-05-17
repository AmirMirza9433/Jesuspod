import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recenctMusic: [],
};
export const recentSlice = createSlice({
  name: "recentSlice",
  initialState: initialState,
  reducers: {
    setRecenctMusic(state, action) {
      state.recenctMusic = action.payload;
    },
  },
});

export const { setRecenctMusic } = recentSlice.actions;
