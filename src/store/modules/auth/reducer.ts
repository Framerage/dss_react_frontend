import {PayloadAction, createReducer} from "@reduxjs/toolkit";
import {getAuthTokenFx} from "./async-actions";
import {getUserAuth} from "./actions";
export interface AuthInitialState {
  authRequest: {
    data: any;
    isLoading: boolean;
    error: null | string;
  };
  isUserAuth: boolean;
}
const authInitialState = {
  isUserAuth: false,
  authRequest: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const authReducer = createReducer<AuthInitialState>(authInitialState, {
  [getUserAuth.type]: (state, action) => {
    state.isUserAuth = action.payload;
  },
  [getAuthTokenFx.fulfilled.type]: (state, action: PayloadAction<any>) => {
    if (action.payload.error) {
      state.authRequest.error = action.payload.error;
      state.authRequest.isLoading = false;
      return;
    }
    state.authRequest.data = action.payload;
    state.authRequest.isLoading = false;
  },
  [getAuthTokenFx.pending.type]: state => {
    state.authRequest.isLoading = true;
    state.authRequest.error = null;
  },
  [getAuthTokenFx.rejected.type]: (state, action: PayloadAction<any>) => {
    state.authRequest.error = "error with auth";
    state.authRequest.isLoading = false;
  },
});
