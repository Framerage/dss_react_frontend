import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectPopup = createSelector(selectRoot, root => root.popupReducer);

export const selectImageCoord = createSelector(
  selectPopup,
  state => state.imgCoord,
);
export const selectPopupImage = createSelector(
  selectPopup,
  state => state.popupImage,
);
