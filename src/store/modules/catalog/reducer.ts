import {createReducer} from "@reduxjs/toolkit";
import {createNewCatalogCardFx, getCatalogCardsFx} from "./async-actions";
import {CatalogCardNesting, CreatingCatalogCard} from "typings/catalogCards";
import {carrentCatalogFilter, resetCreatingCardResult} from "./actions";

export interface CatalogInitialState {
  catalogCards: {
    data: CatalogCardNesting[] | null;
    isLoading: boolean;
    error: null | string;
  };
  cardCreating: {
    data: CreatingCatalogCard | null;
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
  cardCreating: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const catalogReducer = createReducer(catalogInitialState, {
  [carrentCatalogFilter.type]: (state, action) => {
    state.catalogFilter = action.payload;
  },
  [resetCreatingCardResult.type]: state => {
    state.cardCreating.data = null;
  },
  [createNewCatalogCardFx.fulfilled.type]: (state, action) => {
    if (action.payload.error) {
      state.cardCreating.error = action.payload.error;
      state.cardCreating.isLoading = false;
      return;
    }
    state.cardCreating.data = action.payload;
    state.cardCreating.isLoading = false;
  },
  [createNewCatalogCardFx.pending.type]: state => {
    state.cardCreating.isLoading = true;
    state.cardCreating.error = null;
  },
  [createNewCatalogCardFx.rejected.type]: state => {
    state.cardCreating.error = "Error with creating";
    state.cardCreating.isLoading = false;
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
    state.catalogCards.error = "Error with data";
    state.catalogCards.isLoading = false;
  },
});
