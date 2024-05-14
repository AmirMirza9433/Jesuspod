import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: {},
  channels: [],
  mainLoading: false,
};
export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.users = action.payload;
    },
    setChannels(state, action) {
      state.channels = action.payload;
    },
    setMainLoading(state, action) {
      state.mainLoading = action.payload;
    },
  },
});

export const { setUser, setChannels, setMainLoading } = usersSlice.actions;
