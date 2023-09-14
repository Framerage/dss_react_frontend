import {createAction} from "@reduxjs/toolkit";

export const isShoppingCartUse = createAction<boolean>("UseShoppingCart");
export const updateCardsOfCart = createAction<any[]>("UpdateCardsShopCart");
