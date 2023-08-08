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
export const selectAuthIsLoading = createSelector(
  selectAuthState,
  state => state.authRequest.isLoading,
);
export const selectAuthError = createSelector(
  selectAuthState,
  state => state.authRequest.error,
);

export const selectRegistrData = createSelector(
  selectAuthState,
  state => state.registrationReq.data,
);
export const selectRegistrIsLoading = createSelector(
  selectAuthState,
  state => state.registrationReq.isLoading,
);
export const selectRegistrError = createSelector(
  selectAuthState,
  state => state.registrationReq.error,
);

export const selectEditUserExtraInfoResult = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.data,
);
export const selectEditUserExtraInfoResultIsLoading = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.isLoading,
);
export const selectEditUserExtraInfoResultError = createSelector(
  selectAuthState,
  state => state.editingUserExtraInfo.error,
);
