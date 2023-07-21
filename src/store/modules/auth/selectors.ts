import { createSelector } from "@reduxjs/toolkit";
import { selectRoot } from "../rootSelectors";

const selectAuthState = createSelector(selectRoot, (root) => root.authReducer);

export const selectAuthData = createSelector(
  selectAuthState,
  (state) => state.authRequest.data
);
