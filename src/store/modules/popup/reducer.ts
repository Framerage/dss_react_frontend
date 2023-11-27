import {createReducer} from "@reduxjs/toolkit";
import {setPopupImage, resetPopupImage, setImgCoord} from "./actions";
interface PopupState {
  popupImage: string;
  imgCoord: number;
}
const popupInitialState = {
  popupImage: "",
  imgCoord: 0,
};
export const popupReducer = createReducer<PopupState>(popupInitialState, {
  [setImgCoord.type]: (state, {payload}) => {
    state.imgCoord = payload;
  },
  [setPopupImage.type]: (state, {payload}) => {
    state.popupImage = payload;
  },
  [resetPopupImage.type]: state => {
    state.popupImage = "";
  },
});
