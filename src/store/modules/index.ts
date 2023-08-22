import {combineReducers} from "@reduxjs/toolkit";
import {authReducer} from "./auth";
import {catalogReducer} from "./catalog";
import {shopCartReducer} from "./cart";
import {popupReducer} from "./popup";

export const rootReducer = combineReducers({
  authReducer,
  catalogReducer,
  shopCartReducer,
  popupReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
