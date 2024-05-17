import { combineReducers } from "redux";

import { usersSlice } from "./usersSlice";
import { authConfigsSlice } from "./AuthConfig";
import { recentSlice } from "./recentSlice";

export const rootReducer = combineReducers({
  user: usersSlice.reducer,
  authConfig: authConfigsSlice.reducer,
  recent: recentSlice.reducer,
});
