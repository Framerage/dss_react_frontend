import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectAuthState = createSelector(selectRoot, root => root.authReducer);
export const isUserAuth = createSelector(
  selectAuthState,
  state => state.isUserAuth,
);
export const selectAuthData = createSelector(
  selectAuthState,
  state => state.authRequest.data,
);
