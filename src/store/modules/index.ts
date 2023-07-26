import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {catalogReducer} from "./catalog";

export const rootReducer = combineReducers({
  authReducer,
  catalogReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
