import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {catalogReducer} from "./catalog";
import {shopCartReducer} from "./cart";

export const rootReducer = combineReducers({
  authReducer,
  catalogReducer,
  shopCartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
