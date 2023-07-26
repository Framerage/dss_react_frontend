import {createReducer} from "@reduxjs/toolkit";
import {getCatalogCardsFx} from "./async-actions";
import {CatalogCardNesting} from "typings/catalogCards";
import {carrentCatalogFilter} from "./actions";

export interface CatalogInitialState {
  catalogCards: {
    data: CatalogCardNesting[] | null;
    isLoading: boolean;
    error: null | string;
  };
  catalogFilter: string;
}
const catalogInitialState: CatalogInitialState = {
  catalogCards: {
    data: null,
    isLoading: false,
    error: null,
  },
  catalogFilter: "",
};
export const catalogReducer = createReducer(catalogInitialState, {
  [carrentCatalogFilter.type]: (state, action) => {
    state.catalogFilter = action.payload;
  },

  [getCatalogCardsFx.fulfilled.type]: (state, action) => {
    if (action.payload.error) {
      state.catalogCards.error = action.payload.error;
      state.catalogCards.isLoading = false;
      return;
    }
    state.catalogCards.data = action.payload;
    state.catalogCards.isLoading = false;
  },
  [getCatalogCardsFx.pending.type]: state => {
    state.catalogCards.isLoading = true;
    state.catalogCards.error = null;
  },
  [getCatalogCardsFx.rejected.type]: state => {
    state.catalogCards.error = "error with auth";
    state.catalogCards.isLoading = false;
  },
});
