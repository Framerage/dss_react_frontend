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

export const catalogCardDescrip = createSelector(
  selectAuthState,
  state => state.catalogCardDescrip.data,
);
export const catalogCardDescripIsLoading = createSelector(
  selectAuthState,
  state => state.catalogCardDescrip.isLoading,
);
export const catalogCardDescripError = createSelector(
  selectAuthState,
  state => state.catalogCardDescrip.error,
);

export const creatingCardData = createSelector(
  selectAuthState,
  state => state.cardCreating.data,
);
export const creatingCardsIsLoading = createSelector(
  selectAuthState,
  state => state.cardCreating.isLoading,
);
export const creatingCardError = createSelector(
  selectAuthState,
  state => state.cardCreating.error,
);
