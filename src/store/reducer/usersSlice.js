import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: {},
};
export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.users = action.payload;
    },
  },
});

export const {setUser} = usersSlice.actions;
