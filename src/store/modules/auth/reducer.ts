import {createReducer} from "@reduxjs/toolkit";
import {UserRegistrationFx, getAuthTokenFx} from "./async-actions";
import {getUserAuth, resetAuthRequest, resetRegRequest} from "./actions";
import {
  UserAuthorisation,
  UserRegistrationValidation,
  userRegistration,
} from "typings/auths";
export interface AuthInitialState {
  authRequest: {
    data: UserAuthorisation | null;
    isLoading: boolean;
    error: null | string;
  };
  registrationReq: {
    data: userRegistration | UserRegistrationValidation[] | null;
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
  registrationReq: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const authReducer = createReducer<AuthInitialState>(authInitialState, {
  [resetAuthRequest.type]: state => {
    state.authRequest.data = null;
  },
  [resetRegRequest.type]: state => {
    state.registrationReq.data = null;
  },
  [getUserAuth.type]: (state, action) => {
    state.isUserAuth = action.payload;
  },
  [getAuthTokenFx.fulfilled.type]: (state, action) => {
    if (!action.payload?.success) {
      state.authRequest.data = null;
      state.authRequest.error = action.payload.message;
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
  [getAuthTokenFx.rejected.type]: (state, action) => {
    state.authRequest.error = action;
    state.authRequest.isLoading = false;
  },

  [UserRegistrationFx.fulfilled.type]: (state, action) => {
    if (action.payload?.success) {
      state.authRequest.data = null;
      state.registrationReq.error = action.payload.message;
      state.registrationReq.isLoading = false;
      return;
    }
    state.registrationReq.data = action.payload;
    state.registrationReq.isLoading = false;
  },
  [UserRegistrationFx.pending.type]: state => {
    state.registrationReq.isLoading = true;
    state.registrationReq.error = null;
  },
  [UserRegistrationFx.rejected.type]: state => {
    state.registrationReq.error = "Error with registration";
    state.registrationReq.isLoading = false;
  },
});
