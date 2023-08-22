import {createAction} from "@reduxjs/toolkit";

export const setPopupImage = createAction<string>("setPopupImage");
export const resetPopupImage = createAction("resetPopupImage");
