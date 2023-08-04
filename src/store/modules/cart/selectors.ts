import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectShopCartState = createSelector(
  selectRoot,
  root => root.shopCartReducer,
);

export const isShopCartUse = createSelector(
  selectShopCartState,
  state => state.isShopCartUsing,
);
