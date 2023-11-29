import {createAction} from "@reduxjs/toolkit";

export const isShoppingCartUse = createAction<boolean>("UseShoppingCart");
export const updateCardsOfCart = createAction<unknown[]>("UpdateCardsShopCart");
export const updateCardCountOfCart = createAction<{
  cardId: string;
  count: number;
}>("UpdateCardCountOfCart");
