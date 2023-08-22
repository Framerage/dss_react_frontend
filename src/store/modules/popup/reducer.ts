import {createReducer} from "@reduxjs/toolkit";
import {setPopupImage, resetPopupImage} from "./actions";
interface PopupState {
  popupImage: string;
}
const popupInitialState = {
  popupImage: "",
};
export const popupReducer = createReducer<PopupState>(popupInitialState, {
  [setPopupImage.type]: (state, {payload}) => {
    state.popupImage = payload;
  },
  [resetPopupImage.type]: state => {
    state.popupImage = "";
  },
});
