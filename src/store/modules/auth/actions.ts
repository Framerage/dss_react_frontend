import {createAction} from "@reduxjs/toolkit";

export const saveToken = createAction<string>("SaveToken");
export const getUserAuth = createAction<boolean>("IsUserAuth");
export const resetAuthRequest = createAction("ResetAuthRequest");
