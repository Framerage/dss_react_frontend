import {createReducer} from "@reduxjs/toolkit";
import {isShoppingCartUse} from "./actions";

interface ShoppingCartInitioalState {
  isShopCartUsing: boolean;
}
const shopCartInitioalState: ShoppingCartInitioalState = {
  isShopCartUsing: false,
};

export const shopCartReducer = createReducer(shopCartInitioalState, {
  [isShoppingCartUse.type]: (state, action) => {
    state.isShopCartUsing = action.payload;
  },
});
