import {createAsyncThunk} from "@reduxjs/toolkit";
import {editUserExtraInfo, getAuthToken, userRegistration} from "api/auths";

export const getAuthTokenFx = createAsyncThunk("getToken", getAuthToken);
export const UserRegistrationFx = createAsyncThunk("userReg", userRegistration);
export const editUserExtraInfoFx = createAsyncThunk(
  "editUser",
  editUserExtraInfo,
);
