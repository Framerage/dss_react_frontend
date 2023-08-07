import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectShopCartState = createSelector(
  selectRoot,
  root => root.shopCartReducer,
);

export const getUpdatedShopCartCards = createSelector(
  selectShopCartState,
  state => state.shopCartCards,
);
export const isShopCartUse = createSelector(
  selectShopCartState,
  state => state.isShopCartUsing,
);
