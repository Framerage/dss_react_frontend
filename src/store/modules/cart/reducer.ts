import {createReducer} from "@reduxjs/toolkit";
import {isShoppingCartUse, updateCardsOfCart} from "./actions";
import {ShopCartCardsForOrder} from "typings/catalogCards";
import {Prettify} from "typings/generalTypes";

interface ShoppingCartInitioalState {
  isShopCartUsing: boolean;
  shopCartCards: Prettify<ShopCartCardsForOrder>[];
}
const shopCartInitioalState: ShoppingCartInitioalState = {
  isShopCartUsing: false,
  shopCartCards: [],
};

export const shopCartReducer = createReducer(shopCartInitioalState, {
  [updateCardsOfCart.type]: (state, action) => {
    state.shopCartCards = action.payload;
  },
  [isShoppingCartUse.type]: (state, action) => {
    state.isShopCartUsing = action.payload;
  },
});
