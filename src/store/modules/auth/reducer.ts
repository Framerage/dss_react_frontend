import {createReducer} from "@reduxjs/toolkit";
import {
  UserRegistrationFx,
  editUserExtraInfoFx,
  fetchUserInfo,
  getAuthTokenFx,
} from "./async-actions";
import {getUserAuth, resetUserRequest, resetRegRequest} from "./actions";
import {
  EditingUserExtraInfoResult,
  UserAuthorisation,
  UserRegistrationValidation,
  userRegistration,
} from "typings/auths";
export interface AuthInitialState {
  userInfo: {
    data: UserAuthorisation | null;
    isLoading: boolean;
    error: null | string;
  };
  authorization: {
    isLoading: boolean;
    error: null | string;
  };
  registrationReq: {
    data: userRegistration | UserRegistrationValidation[] | null;
    isLoading: boolean;
    error: null | string;
  };
  isUserAuth: boolean;
  editingUserExtraInfo: {
    data: EditingUserExtraInfoResult | null;
    isLoading: boolean;
    error: null | string;
  };
}
const authInitialState = {
  isUserAuth: false,
  authorization: {
    isLoading: false,
    error: null,
  },
  userInfo: {
    data: null,
    isLoading: false,
    error: null,
  },
  registrationReq: {
    data: null,
    isLoading: false,
    error: null,
  },
  editingUserExtraInfo: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const authReducer = createReducer<AuthInitialState>(authInitialState, {
  [getAuthTokenFx.fulfilled.type]: (state, action) => {
    if (!action.payload?.success) {
      state.authorization.error = action.payload?.message;
      state.authorization.isLoading = false;
      return;
    }
    state.authorization.isLoading = false;
  },
  [getAuthTokenFx.pending.type]: state => {
    state.authorization.isLoading = true;
    state.authorization.error = null;
  },
  [getAuthTokenFx.rejected.type]: state => {
    state.authorization.error = "Error with auth";
    state.authorization.isLoading = false;
  },

  [resetUserRequest.type]: state => {
    state.userInfo.data = null;
  },
  [resetRegRequest.type]: state => {
    state.registrationReq.data = null;
  },
  [getUserAuth.type]: (state, action) => {
    state.isUserAuth = action.payload;
  },

  [editUserExtraInfoFx.fulfilled.type]: (state, action) => {
    if (!action.payload?.success) {
      state.editingUserExtraInfo.data = null;
      state.editingUserExtraInfo.error = action.payload?.message;
      state.editingUserExtraInfo.isLoading = false;
      return;
    }
    state.editingUserExtraInfo.data = action.payload;
    state.userInfo.data = {...state.userInfo.data, ...action.payload};
    state.editingUserExtraInfo.isLoading = false;
  },
  [editUserExtraInfoFx.pending.type]: state => {
    state.editingUserExtraInfo.isLoading = true;
    state.editingUserExtraInfo.error = null;
  },
  [editUserExtraInfoFx.rejected.type]: state => {
    state.editingUserExtraInfo.error = "Error with edit";
    state.editingUserExtraInfo.isLoading = false;
  },

  [fetchUserInfo.fulfilled.type]: (state, {payload}) => {
    state.userInfo.data = payload;
    state.userInfo.isLoading = false;
  },
  [fetchUserInfo.pending.type]: state => {
    state.userInfo.isLoading = true;
    state.userInfo.error = null;
  },
  [fetchUserInfo.rejected.type]: state => {
    state.userInfo.error = "Error with access";
    state.userInfo.isLoading = false;
  },

  [UserRegistrationFx.fulfilled.type]: (state, action) => {
    if (!action.payload?.success) {
      state.userInfo.data = null;
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
