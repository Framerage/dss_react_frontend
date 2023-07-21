import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../../api/api";
import { AuthInitialState } from "./reducer";

export const getAuthTokenFx = createAsyncThunk<
  AuthInitialState,
  { email: string; pass: string }
>("getToken", getAuthToken);
