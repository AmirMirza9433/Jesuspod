import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlayer: true,
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState: initialState,
  reducers: {
    setPlayer(state, action) {
      state.isPlayer = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;
