import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthInitialState} from "./reducer";
import {getAuthToken} from "api/auths";

export const getAuthTokenFx = createAsyncThunk<
  AuthInitialState,
  {email: string; pass: string}
>("getToken", getAuthToken);
