import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthToken, userRegistration} from "api/auths";

export const getAuthTokenFx = createAsyncThunk("getToken", getAuthToken);
export const UserRegistrationFx = createAsyncThunk("userReg", userRegistration);
