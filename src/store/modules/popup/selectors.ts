import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectPopup = createSelector(selectRoot, root => root.popupReducer);

export const selectPopupImage = createSelector(
  selectPopup,
  state => state.popupImage,
);
