import {createSelector} from "@reduxjs/toolkit";
import {selectRoot} from "../rootSelectors";

const selectAuthState = createSelector(selectRoot, root => root.catalogReducer);
export const choosedCatalogFilter = createSelector(
  selectAuthState,
  state => state.catalogFilter,
);

export const catalogCardsData = createSelector(
  selectAuthState,
  state => state.catalogCards.data,
);
export const catalogCardsIsLoading = createSelector(
  selectAuthState,
  state => state.catalogCards.isLoading,
);
export const catalogCardsError = createSelector(
  selectAuthState,
  state => state.catalogCards.error,
);
