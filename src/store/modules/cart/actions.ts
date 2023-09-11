import {createAction} from "@reduxjs/toolkit";
import {CatalogCardNesting} from "typings/catalogCards";

export const isShoppingCartUse = createAction<boolean>("UseShoppingCart");
export const updateCardsOfCart = createAction<any[]>("UpdateCardsShopCart");
