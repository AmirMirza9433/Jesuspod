import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlayer: true,
  isDrawer: false,
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState: initialState,
  reducers: {
    setPlayer(state, action) {
      state.isPlayer = action.payload;
    },
    setDrawer(state, action) {
      state.isDrawer = action.payload;
    },
  },
});

export const { setPlayer, setDrawer } = playerSlice.actions;
