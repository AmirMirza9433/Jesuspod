import { combineReducers } from "redux";

import { usersSlice } from "./usersSlice";
import { authConfigsSlice } from "./AuthConfig";

export const rootReducer = combineReducers({
  user: usersSlice.reducer,
  authConfig: authConfigsSlice.reducer,
});
