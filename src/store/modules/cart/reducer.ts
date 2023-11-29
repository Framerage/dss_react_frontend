import {createReducer} from "@reduxjs/toolkit";
import {
  isShoppingCartUse,
  updateCardCountOfCart,
  updateCardsOfCart,
} from "./actions";
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
  [updateCardCountOfCart.type]: (state, {payload}) => {
    state.shopCartCards = state.shopCartCards.map(el => {
      if (el._id === payload.cardId) {
        return {...el, itemCount: payload.count};
      }
      return el;
    });
  },
  [updateCardsOfCart.type]: (state, action) => {
    state.shopCartCards = action.payload;
  },
  [isShoppingCartUse.type]: (state, action) => {
    state.isShopCartUsing = action.payload;
  },
});
