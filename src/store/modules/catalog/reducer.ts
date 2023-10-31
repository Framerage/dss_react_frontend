import {createReducer} from "@reduxjs/toolkit";
import {
  createNewCatalogCardFx,
  editCatalogCardFx,
  getCardFullDescripFx,
  getCatalogCardsFx,
  removeCardFromCatalog,
} from "./async-actions";
import {CatalogCardNesting, CreatingCatalogCard} from "typings/catalogCards";
import {
  currentCatalogFilter,
  resetCardRemovingResult,
  resetCreatingCardResult,
  saveCatalogStatus,
} from "./actions";
import {Prettify} from "typings/generalTypes";

export interface CatalogInitialState {
  isCatalogOpen: boolean;
  catalogCards: {
    data: Prettify<CatalogCardNesting>[] | null;
    isLoading: boolean;
    error: null | string;
  };
  catalogCardDescrip: {
    data: Prettify<CatalogCardNesting> | null;
    isLoading: boolean;
    error: null | string;
  };
  cardCreating: {
    data: Prettify<CreatingCatalogCard> | null;
    isLoading: boolean;
    error: null | string;
  };
  catalogFilter: string;
  cardRemoveRequest: {
    data: {success: boolean; message: string; error: string} | null;
    isLoading: boolean;
    error: null | string;
  };
}
const catalogInitialState: CatalogInitialState = {
  isCatalogOpen: false,
  catalogCards: {
    data: null,
    isLoading: false,
    error: null,
  },
  catalogCardDescrip: {
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
  cardRemoveRequest: {
    data: null,
    isLoading: false,
    error: null,
  },
};
export const catalogReducer = createReducer(catalogInitialState, {
  [saveCatalogStatus.type]: (state, {payload}) => {
    state.isCatalogOpen = payload;
  },
  [currentCatalogFilter.type]: (state, action) => {
    state.catalogFilter = action.payload;
  },
  [resetCreatingCardResult.type]: state => {
    state.cardCreating.data = null;
  },
  [resetCardRemovingResult.type]: state => {
    state.cardRemoveRequest.data = null;
  },

  [editCatalogCardFx.fulfilled.type]: (state, action) => {
    if (action.payload?.error) {
      state.catalogCardDescrip.data = null;
      state.catalogCardDescrip.error = action.payload.message;
      state.catalogCardDescrip.isLoading = false;
      return;
    }
    state.catalogCardDescrip.data = action.payload;
    state.catalogCardDescrip.isLoading = false;
  },
  [editCatalogCardFx.pending.type]: state => {
    state.catalogCardDescrip.isLoading = true;
    state.catalogCardDescrip.error = null;
  },
  [editCatalogCardFx.rejected.type]: state => {
    state.catalogCardDescrip.data = null;
    state.catalogCardDescrip.error = "Error with getting card";
    state.catalogCardDescrip.isLoading = false;
  },
  [getCardFullDescripFx.fulfilled.type]: (state, action) => {
    if (action.payload?.error) {
      state.catalogCardDescrip.data = null;
      state.catalogCardDescrip.error = action.payload.message;
      state.catalogCardDescrip.isLoading = false;
      return;
    }
    state.catalogCardDescrip.data = action.payload;
    state.catalogCardDescrip.isLoading = false;
  },
  [getCardFullDescripFx.pending.type]: state => {
    state.catalogCardDescrip.isLoading = true;
    state.catalogCardDescrip.error = null;
  },
  [getCardFullDescripFx.rejected.type]: state => {
    state.catalogCardDescrip.data = null;
    state.catalogCardDescrip.error = "Error with getting card";
    state.catalogCardDescrip.isLoading = false;
  },

  [createNewCatalogCardFx.fulfilled.type]: (state, action) => {
    if (action.payload?.error) {
      state.cardCreating.error = action.payload.message;
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

  [removeCardFromCatalog.fulfilled.type]: (state, action) => {
    if (action.payload?.error) {
      state.cardRemoveRequest.error = action.payload.message;
      state.cardRemoveRequest.isLoading = false;
      return;
    }
    state.cardRemoveRequest.data = action.payload;
    state.cardRemoveRequest.isLoading = false;
  },

  [removeCardFromCatalog.pending.type]: state => {
    state.cardRemoveRequest.isLoading = true;
    state.cardRemoveRequest.error = null;
  },
  [removeCardFromCatalog.rejected.type]: state => {
    state.cardRemoveRequest.error = "Error with dekete card";
    state.cardRemoveRequest.isLoading = false;
  },
});
